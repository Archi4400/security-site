import type { EngineConfig } from '../config';
import { read } from './flatten';

export function createI18n(config: EngineConfig) {
  const { defaultLang, languages, dictionaries } = config.i18n;

  function t(key: string, lang: string = defaultLang): string {
    const own = read(dictionaries[lang], key);
    if (typeof own === 'string') return own;
    const fallback = read(dictionaries[defaultLang], key);
    return typeof fallback === 'string' ? fallback : key;
  }

  function tList(key: string, lang: string = defaultLang): string[] {
    const own = read(dictionaries[lang], key);
    if (Array.isArray(own)) return own as string[];
    const fallback = read(dictionaries[defaultLang], key);
    return Array.isArray(fallback) ? (fallback as string[]) : [];
  }

  return {
    defaultLang,
    languages,
    t,
    tList,
    text: (key: string) => ({ 'data-i18n': key }),
    html: (key: string) => ({ 'data-i18n-html': key }),
    label: (key: string) => ({ 'aria-label': t(key), 'data-i18n-aria': key }),
    alt: (key: string) => ({ alt: t(key), 'data-i18n-alt': key }),
    placeholder: (key: string) => ({ placeholder: t(key), 'data-i18n-ph': key }),
  };
}
