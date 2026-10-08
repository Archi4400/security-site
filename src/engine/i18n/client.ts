import { appData } from '../runtime/data';
import { notify } from '../runtime/notify';

type Flat = Record<string, string>;
export type Format = (el: HTMLElement, text: string) => void;
type Listener = (lang: string) => void;

declare global {
  interface Window {
    CN_T?: (key: string) => string;
    CN_LANG?: string;
    setLang?: (code: string) => void;
  }
}

const STORE_KEY = 'lang';
const dicts = new Map<string, Flat>();
const pending = new Map<string, Promise<Flat>>();
/** Each onLang subscriber and the language it was last told. */
const listeners = new Map<Listener, string | null>();
const followers = new Set<Listener>();
let formats: Record<string, Format> = {};
let shown: string | null = null;
let wanted: string | null = null;

const idle = (run: () => void) =>
  typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(() => run()) : window.setTimeout(run, 1);

const known = (code: string | null | undefined): code is string => !!code && Object.hasOwn(appData().files, code);

function stored(): string | null {
  try {
    return localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

function asked(): string | null {
  return new URLSearchParams(window.location.search).get('lang');
}

/** Where the page is going: ?lang=, then storage, then the default. Fixed on first use. */
function goal(): string {
  if (wanted === null) {
    const fromAddress = asked();
    const saved = stored();
    wanted = known(fromAddress) ? fromAddress : known(saved) ? saved : appData().lang;
  }
  return wanted;
}

export function lang(): string {
  return shown ?? appData().lang;
}

function load(code: string): Promise<Flat> {
  const ready = dicts.get(code);
  if (ready) return Promise.resolve(ready);
  let request = pending.get(code);
  if (!request) {
    request = fetch(appData().files[code], { headers: { accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json() as Promise<Flat>;
      })
      .then((flat) => {
        dicts.set(code, flat);
        return flat;
      })
      .finally(() => pending.delete(code));
    pending.set(code, request);
  }
  return request;
}

function each<T extends Element>(selector: string, run: (el: T) => void): void {
  for (const el of document.querySelectorAll<T>(selector)) run(el);
}

function apply(code: string, dict: Flat): void {
  each<HTMLElement>('[data-i18n]', (el) => {
    const text = dict[el.dataset.i18n!];
    if (text === undefined) return;
    const format = el.dataset.i18nFormat ? formats[el.dataset.i18nFormat] : undefined;
    if (format) format(el, text);
    else el.textContent = text;
  });
  each<HTMLElement>('[data-i18n-html]', (el) => {
    const text = dict[el.dataset.i18nHtml!];
    if (text !== undefined) el.innerHTML = text;
  });
  const attributes: [string, string, string][] = [
    ['[data-i18n-aria]', 'data-i18n-aria', 'aria-label'],
    ['[data-i18n-alt]', 'data-i18n-alt', 'alt'],
    ['[data-i18n-ph]', 'data-i18n-ph', 'placeholder'],
  ];
  for (const [selector, hook, target] of attributes) {
    each<HTMLElement>(selector, (el) => {
      const text = dict[el.getAttribute(hook)!];
      if (text !== undefined) el.setAttribute(target, text);
    });
  }
  const title = document.querySelector<HTMLElement>('title[data-meta]');
  const titleText = title && dict[`${title.dataset.meta}.title`];
  if (title && titleText !== undefined) title.textContent = titleText;
  const description = document.querySelector<HTMLMetaElement>('meta[data-meta-desc]');
  if (description) {
    const descriptionText = dict[`${description.dataset.metaDesc}.desc`];
    if (descriptionText !== undefined) description.content = descriptionText;
  }
  document.documentElement.lang = code;
}

/** Tells one subscriber the current language once its dictionary is in, unless a switch is on its way. */
function deliver(listener: Listener): void {
  const code = lang();
  if (code !== goal() || listeners.get(listener) === code) return;
  const tell = () => {
    if (!listeners.has(listener) || lang() !== code || code !== goal() || listeners.get(listener) === code) return;
    listeners.set(listener, code);
    notify(listener, code);
  };
  if (dicts.has(code)) {
    tell();
  } else {
    idle(() => {
      load(code).then(tell, () => {});
    });
  }
}

function publish(): void {
  const code = lang();
  window.CN_LANG = code;
  for (const listener of [...listeners.keys()]) deliver(listener);
  for (const follower of [...followers]) notify(follower, code);
  document.dispatchEvent(new CustomEvent('cn:langchange', { detail: { lang: code } }));
}

export async function setLang(code: string): Promise<void> {
  const next = known(code) ? code : appData().lang;
  wanted = next;
  let dict: Flat;
  try {
    dict = await load(next);
  } catch {
    if (wanted === next) {
      // the page stays where it is; whoever waited for the switch hears so
      wanted = lang();
      for (const listener of [...listeners.keys()]) deliver(listener);
    }
    return;
  }
  if (wanted !== next) return;
  apply(next, dict);
  shown = next;
  try {
    localStorage.setItem(STORE_KEY, next);
  } catch {
    /* storage refused: the choice lasts for this page only */
  }
  publish();
}

export function onLang(listener: Listener): () => void {
  listeners.set(listener, null);
  deliver(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Every language change at once, with no dictionary: for markup that shows only the code. */
export function followLang(follower: Listener): () => void {
  followers.add(follower);
  notify(follower, lang());
  return () => {
    followers.delete(follower);
  };
}

/** Loads every dictionary ahead of a choice, so picking a language does not wait. */
export function preloadDictionaries(): void {
  for (const code of Object.keys(appData().files)) load(code).catch(() => {});
}

export function t(key: string): string {
  const code = lang();
  const own = dicts.get(code)?.[key];
  if (own !== undefined) return own;
  const base = dicts.get(appData().lang)?.[key];
  if (base !== undefined) return base;
  if (!dicts.has(code)) {
    if (import.meta.env.DEV) {
      console.error(`t("${key}") ran before the "${code}" dictionary loaded: read text inside onLang(cb).`);
    }
    idle(() => {
      load(code).catch(() => {});
    });
  }
  return key;
}

export function initI18n(options: { formats?: Record<string, Format> } = {}): void {
  formats = { ...options.formats };
  window.CN_T = t;
  window.setLang = (code: string) => {
    void setLang(code);
  };
  window.CN_LANG = lang();

  const first = goal();
  if (first !== lang()) void setLang(first);
}
