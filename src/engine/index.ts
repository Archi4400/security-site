import config from './load-config';
import { i18n } from './i18n/server';
import { marketHelpers } from './market/server';
import { header } from './header/server';

export const { t, tList, text, html, label, alt, placeholder, languages, defaultLang } = i18n;
export const { marketList, seriesOptions } = marketHelpers(config.market);
export { coinName } from './market/catalog';
export { flagHref } from './flags/server';
export const { langMenu, menuDialog, themeGroup } = header;
export { reveal } from './reveal/server';
export { pinned } from './pinned/server';
export { countUp } from './count/server';
export { tape } from './tape/server';
export { select, type SelectOption, type SelectOptions } from './select/getters';

export function rootAttrs() {
  return { lang: config.i18n.defaultLang, 'data-theme': config.theme.default };
}

export { default as Head } from './Head.astro';
export { default as Runtime } from './Runtime.astro';
export type { Language } from './config';
export type { Market, MarketSnapshot, SeriesPoint } from './market/types';
