import { notify } from '../runtime/notify';
import type { Market, MarketSnapshot, SeriesPoint } from './types';

export type { Market, MarketSnapshot, SeriesPoint } from './types';

const CYCLE_MS = 60_000;
const COOLDOWN_MS = 15_000;
const SHARE_MS = 2_000;
/** Rows this old, with every refresh since failed, no longer pass for prices. */
const STALE_MS = 5 * 60_000;

export interface Watch<T> {
  onData: (data: T) => void;
  onError: (retry: () => void, state: { hasData: boolean }) => void;
}

interface Held<T> {
  at: number;
  data: T;
}

interface Source<T> {
  key: string;
  path: string;
  check: (raw: unknown) => T;
  held: Held<T> | null;
  inflight: Promise<Held<T>> | null;
  failedAt: number;
}

const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const finiteOrNull = (value: unknown) => value === null || finite(value);

function isRow(raw: unknown): raw is Market {
  const row = raw as Partial<Market> | null;
  return (
    !!row &&
    typeof row.id === 'string' &&
    typeof row.symbol === 'string' &&
    typeof row.name === 'string' &&
    finite(row.price) &&
    finite(row.change24h) &&
    finiteOrNull(row.high24h) &&
    finiteOrNull(row.low24h) &&
    finite(row.volume24h) &&
    Array.isArray(row.spark)
  );
}

const isIdList = (value: unknown) => Array.isArray(value) && value.every((id) => typeof id === 'string');

function checkSnapshot(raw: unknown): MarketSnapshot {
  const body = raw as { lists?: unknown; rows?: unknown } | null;
  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body) ||
    typeof body.lists !== 'object' ||
    body.lists === null ||
    !Object.values(body.lists).every(isIdList) ||
    !Array.isArray(body.rows)
  ) {
    throw new Error('market feed: unexpected body');
  }
  const rows = body.rows.filter(isRow);
  if (!rows.length) throw new Error('market feed: no rows');
  return { lists: body.lists as Record<string, string[]>, rows };
}

function checkSeries(raw: unknown): SeriesPoint[] {
  if (!Array.isArray(raw)) throw new Error('series: unexpected body');
  const points = raw.filter((point): point is SeriesPoint => Array.isArray(point) && finite(point[0]) && finite(point[1]));
  if (points.length < 2) throw new Error('series: too few points');
  return points;
}

function readStore<T>(key: string, check: (raw: unknown) => T): Held<T> | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { at?: unknown; data?: unknown } | null;
    const now = Date.now();
    if (!saved || !finite(saved.at) || saved.at > now || now - saved.at >= CYCLE_MS) return null;
    return { at: saved.at, data: check(saved.data) };
  } catch {
    return null;
  }
}

function writeStore(key: string, held: Held<unknown>): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(held));
  } catch {
    /* storage refused: the next page asks the server again */
  }
}

function source<T>(key: string, path: string, check: (raw: unknown) => T): Source<T> {
  return { key, path, check, held: null, inflight: null, failedAt: 0 };
}

function read<T>(from: Source<T>, force: boolean): Promise<Held<T>> {
  const now = Date.now();
  if (from.held && now - from.held.at < (force ? SHARE_MS : CYCLE_MS)) return Promise.resolve(from.held);
  if (from.inflight) return from.inflight;
  if (!force) {
    const stored = readStore(from.key, from.check);
    if (stored) {
      from.held = stored;
      return Promise.resolve(stored);
    }
    if (now - from.failedAt < COOLDOWN_MS) return Promise.reject(new Error('market feed: cooling down'));
  }
  const init: RequestInit = { headers: { accept: 'application/json' } };
  // a forced read must not take the previous answer from the HTTP cache
  if (force) init.cache = 'no-cache';
  from.inflight = fetch(from.path, init)
    .then((response) => {
      if (!response.ok) throw new Error(`${from.path} -> ${response.status}`);
      return response.json() as Promise<unknown>;
    })
    .then((raw) => {
      const held = { at: Date.now(), data: from.check(raw) };
      from.held = held;
      from.failedAt = 0;
      writeStore(from.key, held);
      return held;
    })
    .catch((error: unknown) => {
      from.failedAt = Date.now();
      throw error;
    })
    .finally(() => {
      from.inflight = null;
    });
  return from.inflight;
}

const markets = /* @__PURE__ */ source('market.1', '/api/markets', checkSnapshot);
const seriesSources = new Map<string, Source<SeriesPoint[]>>();

function seriesSource(id: string, days: number): Source<SeriesPoint[]> {
  const key = `${id}:${days}`;
  let found = seriesSources.get(key);
  if (!found) {
    found = source(`series.1.${key}`, `/api/series?id=${encodeURIComponent(id)}&days=${days}`, checkSeries);
    seriesSources.set(key, found);
  }
  return found;
}

export function loadMarkets(force = false): Promise<MarketSnapshot> {
  return read(markets, force).then((held) => held.data);
}

export function loadSeries(id: string, days: number, force = false): Promise<SeriesPoint[]> {
  return read(seriesSource(id, days), force).then((held) => held.data);
}

export function pick(rows: readonly Market[], ids: readonly string[]): Market[] {
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id)).filter((row): row is Market => row !== undefined);
}

interface Listener<T> {
  onData: (data: T, retry: () => void) => void;
  onError: (retry: () => void, state: { hasData: boolean }) => void;
}

type Clock<T> = (listener: Listener<T>) => () => void;

/** One timer for everyone watching the same data, so they all change at once. */
function createClock<T>(pull: (force: boolean) => Promise<Held<T>>, onIdle: () => void): Clock<T> {
  const listeners = new Set<Listener<T>>();
  let last: Held<T> | null = null;
  let failed = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  let round = 0;

  const each = (run: (listener: Listener<T>) => void) => {
    for (const listener of [...listeners]) if (listeners.has(listener)) run(listener);
  };

  let asking = false;
  let askedNow = false;

  function ask(force: boolean, asked = false): void {
    askedNow ||= asked;
    // one request per clock: a second ask while it runs only marks the answer as awaited
    if (asking) return;
    asking = true;
    const mine = round;
    pull(force).then(
      (held) => {
        if (mine !== round) return;
        asking = false;
        askedNow = false;
        last = held;
        failed = false;
        each((listener) => notify(listener.onData, held.data, retry));
      },
      () => {
        if (mine !== round) return;
        const awaited = askedNow;
        asking = false;
        askedNow = false;
        const fresh = last !== null && Date.now() - last.at < STALE_MS;
        failed = !fresh;
        if (fresh && !awaited) return;
        const state = { hasData: fresh };
        each((listener) => notify(listener.onError, retry, state));
      },
    );
  }

  function retry(): void {
    ask(true, true);
  }

  const tick = () => {
    if (!document.hidden) ask(true);
  };
  const wake = () => {
    if (!document.hidden && (!last || Date.now() - last.at >= CYCLE_MS)) ask(true);
  };

  return (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      ask(false);
      timer = setInterval(tick, CYCLE_MS);
      document.addEventListener('visibilitychange', wake);
    } else if (last && !failed) {
      notify(listener.onData, last.data, retry);
    } else if (failed) {
      notify(listener.onError, retry, { hasData: false });
    }
    return () => {
      if (!listeners.delete(listener) || listeners.size) return;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', wake);
      round++;
      asking = false;
      askedNow = false;
      last = null;
      failed = false;
      onIdle();
    };
  };
}

let marketClock: Clock<MarketSnapshot> | null = null;
const seriesClocks = new Map<string, Clock<SeriesPoint[]>>();

export function watchMarkets(list: string, watch: Watch<Market[]>): () => void {
  marketClock ??= createClock((force) => read(markets, force), () => {});
  let got = false;
  let named = false;
  const fail = (retry: () => void, fresh = true) => watch.onError(retry, { hasData: got && fresh });
  return marketClock({
    onData: (snapshot, retry) => {
      const ids = Object.hasOwn(snapshot.lists, list) ? snapshot.lists[list] : undefined;
      if (!ids) {
        if (import.meta.env.DEV && !named) {
          named = true;
          console.error(`watchMarkets("${list}"): no such list in market.lists (${Object.keys(snapshot.lists).join(', ')}).`);
        }
        fail(retry);
        return;
      }
      const rows = pick(snapshot.rows, ids);
      if (rows.length) {
        got = true;
        watch.onData(rows);
      } else fail(retry);
    },
    onError: (retry, state) => fail(retry, state.hasData),
  });
}

export function watchSeries(id: string, days: number, watch: Watch<SeriesPoint[]>): () => void {
  const key = `${id}:${days}`;
  let clock = seriesClocks.get(key);
  if (!clock) {
    clock = createClock((force) => read(seriesSource(id, days), force), () => seriesClocks.delete(key));
    seriesClocks.set(key, clock);
  }
  let got = false;
  return clock({
    onData: (points) => {
      got = true;
      watch.onData(points);
    },
    onError: (retry, state) => watch.onError(retry, { hasData: got && state.hasData }),
  });
}
