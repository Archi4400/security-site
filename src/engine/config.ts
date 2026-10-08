import { FLAGS } from './flags/catalog';
import { flatten } from './i18n/flatten';
import { COINS } from './market/catalog';

export interface Language {
  code: string;
  /** The language in its own words, for the menu. */
  label: string;
  /** The letters printed on the switcher. */
  short: string;
  /** Its flag in the engine's set, drawn with flagHref(). */
  flag: string;
}

export type Dictionary = Record<string, unknown>;
export type ThemeName = 'light' | 'dark';

export interface MarketConfig {
  /** Named coin lists; a widget asks for its list by name. */
  lists: Record<string, string[]>;
  /** The list whose coins carry a week of prices for a sparkline. */
  spark: string;
  /** What /api/series answers: these coins over these windows, in days. */
  series: { ids: string[]; days: number[] };
}

export interface EngineConfig {
  i18n: {
    defaultLang: string;
    languages: Language[];
    dictionaries: Record<string, Dictionary>;
  };
  theme: {
    default: ThemeName;
    color: Record<ThemeName, string>;
  };
  market: MarketConfig;
}

export const REQUIRED_KEYS: readonly string[] = [
  'ui.skip',
  'ui.error',
  'ui.retry',
  'ui.language',
  'ui.theme',
  'ui.themeLight',
  'ui.themeDark',
  'ui.menu',
  'ui.menuOpen',
  'ui.menuClose',
  'ui.pause',
];

/** Every leaf of a dictionary that is not a string, with its dotted key. */
function nonText(node: unknown, path: string, out: [string, string][] = []): [string, string][] {
  if (typeof node === 'string') return out;
  if (Array.isArray(node)) node.forEach((item, i) => nonText(item, `${path}.${i}`, out));
  else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) nonText(value, path ? `${path}.${key}` : key, out);
  } else out.push([path, node === null ? 'null' : typeof node]);
  return out;
}

function validateMarket(market: MarketConfig | undefined): string[] {
  if (!market) return ['market is missing'];
  const problems: string[] = [];
  const lists = market.lists ?? {};
  const names = Object.keys(lists);
  if (!names.length) problems.push('market.lists is empty');
  for (const name of names) {
    if (!lists[name].length) problems.push(`market.lists.${name} is empty`);
    for (const id of lists[name]) {
      if (!Object.hasOwn(COINS, id)) {
        problems.push(`market.lists.${name} has "${id}", which is not in the coin catalog (${Object.keys(COINS).join(', ')})`);
      }
    }
  }
  if (names.length && !Object.hasOwn(lists, market.spark)) problems.push(`market.spark "${market.spark}" is not in market.lists`);

  const listed = new Set(names.flatMap((name) => lists[name]));
  const { ids = [], days = [] } = market.series ?? {};
  if (!ids.length) problems.push('market.series.ids is empty');
  for (const id of ids) if (!listed.has(id)) problems.push(`market.series.ids has "${id}", which is in no list`);
  if (!days.length) problems.push('market.series.days is empty');
  for (const day of days) {
    if (!Number.isInteger(day) || day < 1 || day > 365) problems.push(`market.series.days has ${day}: use whole days from 1 to 365`);
  }
  return problems;
}

export function validateConfig(config: EngineConfig): string[] {
  const problems: string[] = [];
  const { i18n, theme } = config;
  const codes = i18n.languages.map((language) => language.code);

  if (!codes.length) problems.push('i18n.languages is empty');
  if (new Set(codes).size !== codes.length) problems.push('i18n.languages has a duplicate code');
  if (!codes.includes(i18n.defaultLang)) problems.push(`i18n.defaultLang "${i18n.defaultLang}" is not in i18n.languages`);
  for (const { code, flag } of i18n.languages) {
    if (!Object.hasOwn(FLAGS, flag)) {
      problems.push(`i18n.languages "${code}" has the flag "${flag}", which the engine does not draw (${Object.keys(FLAGS).join(', ')})`);
    }
  }

  for (const code of new Set(codes)) {
    const dict = i18n.dictionaries[code];
    if (!dict) {
      problems.push(`i18n.dictionaries has no "${code}"`);
      continue;
    }
    const flat = flatten(dict);
    for (const [key, type] of nonText(dict, '')) {
      problems.push(`"${code}" dictionary has a ${type} at "${key}": dictionary values are text, write it as a string`);
    }
    for (const key of REQUIRED_KEYS) {
      if (!(key in flat)) problems.push(`"${code}" dictionary has no "${key}"`);
    }
  }
  for (const code of Object.keys(i18n.dictionaries)) {
    if (!codes.includes(code)) problems.push(`i18n.dictionaries has "${code}", which is not in i18n.languages`);
  }

  if (theme.default !== 'light' && theme.default !== 'dark') problems.push('theme.default must be "light" or "dark"');
  for (const name of ['dark', 'light'] as const) {
    if (!/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(theme.color?.[name] ?? '')) {
      problems.push(`theme.color.${name} must be a hex colour`);
    }
  }
  problems.push(...validateMarket(config.market));
  return problems;
}

export function defineConfig(config: EngineConfig): EngineConfig {
  const problems = validateConfig(config);
  if (problems.length) throw new Error(`engine.config.ts:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  return config;
}
