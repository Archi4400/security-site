import process from 'node:process';
import type { MarketConfig } from '../config';
import { coinName } from './catalog';
import type { Market, MarketSnapshot, SeriesPoint } from './types';

const QUOTE = 'USDT';
const FRESH_MS = 60_000;
const RETRY_MS = 15_000;
/** Past this age a snapshot no longer stands for prices, even when upstream is down. */
const STALE_MS = 5 * 60_000;
const TIMEOUT_MS = 8_000;
const ROW_CAP = 1000;
const TARGET_POINTS = 150;

const INTERVALS: { interval: string; ms: number }[] = [
  { interval: '1m', ms: 60_000 },
  { interval: '3m', ms: 180_000 },
  { interval: '5m', ms: 300_000 },
  { interval: '15m', ms: 900_000 },
  { interval: '30m', ms: 1_800_000 },
  { interval: '1h', ms: 3_600_000 },
  { interval: '2h', ms: 7_200_000 },
  { interval: '4h', ms: 14_400_000 },
  { interval: '6h', ms: 21_600_000 },
  { interval: '12h', ms: 43_200_000 },
  { interval: '1d', ms: 86_400_000 },
];

interface Slot<T> {
  at: number;
  data: T;
}

/** Asked while upstream rests after a failure; the failure itself was already logged. */
export class Resting extends Error {}

/** Upstream answered with an error status. */
class Refused extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const slots = new Map<string, Slot<unknown>>();
const inflight = new Map<string, Promise<unknown>>();
const failedAt = new Map<string, number>();

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const stored = slots.get(key) as Slot<T> | undefined;
  if (stored && Date.now() - stored.at < FRESH_MS) return stored.data;
  const slot = stored && Date.now() - stored.at < STALE_MS ? stored : undefined;

  let pending = inflight.get(key) as Promise<T> | undefined;
  if (!pending) {
    const since = Date.now() - (failedAt.get(key) ?? -Infinity);
    if (since < RETRY_MS) {
      if (slot) return slot.data;
      throw new Resting(`${key}: upstream failed ${Math.round(since / 1000)}s ago, waiting before the next try`);
    }
    pending = load()
      .then((data) => {
        slots.set(key, { at: Date.now(), data });
        failedAt.delete(key);
        return data;
      })
      .catch((error: unknown) => {
        failedAt.set(key, Date.now());
        throw error;
      })
      .finally(() => {
        inflight.delete(key);
      });
    inflight.set(key, pending);
  }

  try {
    return await pending;
  } catch (error) {
    if (!slot) throw error;
    const age = Math.round((Date.now() - slot.at) / 1000);
    console.warn(`[market] ${key}: upstream failed, serving ${age}s-old data -`, error);
    return slot.data;
  }
}

const host = () => (process.env.MARKET_API_URL || 'https://api.binance.com').replace(/\/+$/, '');
const pairFor = (id: string) => `${id.toUpperCase()}${QUOTE}`;

async function fetchJson(path: string): Promise<unknown> {
  const response = await fetch(`${host()}${path}`, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Refused(`${path.split('?')[0]} -> ${response.status}`, response.status);
  return response.json();
}

/** A pair the exchange does not list refuses the whole batch with a 4xx; a rate limit (418, 429) is not that. */
const refusedPair = (error: unknown) =>
  error instanceof Refused && error.status >= 400 && error.status < 500 && error.status !== 418 && error.status !== 429;

async function fetchTickers(pairs: string[]): Promise<unknown[]> {
  let rows: unknown;
  try {
    rows = await fetchJson(`/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(pairs))}`);
  } catch (error) {
    if (!refusedPair(error) || pairs.length < 2) throw error;
    // ask pair by pair, so the pairs upstream knows are still priced
    const each = await Promise.all(pairs.map((pair) => fetchJson(`/api/v3/ticker/24hr?symbol=${pair}`).catch(() => null)));
    const dropped = pairs.filter((_, i) => each[i] === null);
    if (dropped.length) console.warn(`[market] ticker/24hr: upstream refused ${dropped.join(', ')}; the other pairs are served`);
    return each.filter((row) => row !== null);
  }
  if (!Array.isArray(rows)) throw new Error('ticker/24hr: not a list');
  return rows;
}

export function windowFor(days: number): { interval: string; limit: number } {
  const span = days * 86_400_000;
  const wanted = span / TARGET_POINTS;
  const chosen = INTERVALS.find((step) => step.ms >= wanted) ?? INTERVALS[INTERVALS.length - 1];
  return { interval: chosen.interval, limit: Math.min(ROW_CAP, Math.ceil(span / chosen.ms)) };
}

async function fetchCandles(id: string, days: number): Promise<unknown[][]> {
  const { interval, limit } = windowFor(days);
  const rows = await fetchJson(`/api/v3/klines?symbol=${pairFor(id)}&interval=${interval}&limit=${limit}`);
  if (!Array.isArray(rows)) throw new Error(`klines ${id}: not a list`);
  return rows.filter(Array.isArray) as unknown[][];
}

async function fetchWeek(id: string): Promise<number[]> {
  try {
    return (await fetchCandles(id, 7)).map((row) => Number(row[4])).filter(Number.isFinite);
  } catch (error) {
    console.warn(`[market] spark ${id}:`, error);
    return [];
  }
}

const figure = (raw: unknown): number | null => {
  if (raw === undefined || raw === null || raw === '') return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

interface TickerRow {
  symbol?: unknown;
  lastPrice?: unknown;
  priceChangePercent?: unknown;
  highPrice?: unknown;
  lowPrice?: unknown;
  quoteVolume?: unknown;
}

function shape(raw: TickerRow): Market | null {
  if (typeof raw.symbol !== 'string' || !raw.symbol.endsWith(QUOTE)) return null;
  const price = figure(raw.lastPrice);
  if (price === null) return null;
  const symbol = raw.symbol.slice(0, -QUOTE.length).toUpperCase();
  const id = symbol.toLowerCase();
  return {
    id,
    symbol,
    name: coinName(id),
    price,
    change24h: figure(raw.priceChangePercent) ?? 0,
    high24h: figure(raw.highPrice),
    low24h: figure(raw.lowPrice),
    volume24h: figure(raw.quoteVolume) ?? 0,
    spark: [],
  };
}

export function loadMarkets(market: MarketConfig): Promise<MarketSnapshot> {
  return cached('markets', async () => {
    const ids = [...new Set(Object.values(market.lists).flat())];
    const weekIds = market.lists[market.spark] ?? [];
    const [tickers, weeks] = await Promise.all([
      fetchTickers(ids.map(pairFor)),
      Promise.all(weekIds.map(async (id) => [id, await fetchWeek(id)] as const)),
    ]);

    const weekById = new Map(weeks);
    const byId = new Map<string, Market>();
    for (const raw of tickers as TickerRow[]) {
      const row = raw && typeof raw === 'object' ? shape(raw) : null;
      if (row) byId.set(row.id, { ...row, spark: weekById.get(row.id) ?? [] });
    }
    const rows = ids.map((id) => byId.get(id)).filter((row): row is Market => row !== undefined);
    if (!rows.length) throw new Error('ticker/24hr: no usable rows');
    const lists = Object.fromEntries(Object.entries(market.lists).map(([name, list]) => [name, [...list]]));
    return { lists, rows };
  });
}

export function loadSeries(id: string, days: number): Promise<SeriesPoint[]> {
  return cached(`series:${id}:${days}`, async () => {
    const points = (await fetchCandles(id, days))
      .map((row) => [Number(row[0]), Number(row[4])] as SeriesPoint)
      .filter(([at, price]) => Number.isFinite(at) && Number.isFinite(price));
    if (points.length < 2) throw new Error(`klines ${id}: too few points`);
    return points;
  });
}
