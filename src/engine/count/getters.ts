import { countUp as COUNT } from '../contract.json';
import type { EngineConfig } from '../config';
import { read } from '../i18n/flatten';
import { formatCount } from './format';

type Hook = Record<`data-${string}`, string>;

const ID = /^[a-z][a-z0-9-]*$/;
const hook = (name: string, value: string) => ({ [name]: value }) as Hook;

export interface CountOptions {
  decimals?: number;
  /** A dictionary key whose text holds {n} where the number goes. */
  key?: string;
}

export function createCountUp(config: Pick<EngineConfig, 'i18n'>) {
  const { defaultLang, languages, dictionaries } = config.i18n;

  return function countUp(id: string, value: number, options: CountOptions = {}) {
    const { decimals = 0, key } = options;
    const name = `countUp("${id}")`;
    if (!ID.test(id)) throw new Error(`${name}: an id is lower-case letters, digits and "-", starting with a letter`);
    if (!Number.isFinite(value)) throw new Error(`${name}: the value must be a finite number, got ${String(value)}`);
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > 6) {
      throw new Error(`${name}: decimals is a whole number from 0 to 6, got ${String(decimals)}`);
    }
    if (key !== undefined) {
      for (const { code } of languages) {
        const pattern = read(dictionaries[code], key);
        if (typeof pattern !== 'string') throw new Error(`${name}: "${key}" is not in the "${code}" dictionary`);
        if (pattern.split('{n}').length !== 2) {
          throw new Error(`${name}: "${key}" in "${code}" must hold {n} exactly once, where the number goes`);
        }
      }
    }
    const pattern = key === undefined ? undefined : (read(dictionaries[defaultLang], key) as string);
    const { root, parts } = COUNT;
    return {
      text: formatCount(value, decimals, defaultLang, pattern),
      root: () => ({
        ...hook(root.hook, id),
        'data-count-to': String(value),
        'data-count-decimals': String(decimals),
        ...(key === undefined ? {} : { 'data-count-key': key }),
      }),
      value: () => hook(parts.value.hook, id),
      digits: () => ({ ...hook(parts.digits.hook, id), 'aria-hidden': 'true' as const }),
    };
  };
}
