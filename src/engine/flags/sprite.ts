import { createHash } from 'node:crypto';
import type { Language } from '../config';
import { FLAG_BOX, FLAGS } from './catalog';

export interface SpriteFile {
  name: string;
  url: string;
  body: string;
}

const cache = new WeakMap<object, SpriteFile>();

/** One SVG file with a symbol for each flag the languages name, served beside the dictionaries. */
export function flagSprite(languages: readonly Language[]): SpriteFile {
  let file = cache.get(languages);
  if (!file) {
    const ids = [...new Set(languages.map((language) => language.flag))].filter((id) => Object.hasOwn(FLAGS, id));
    const symbols = ids
      .map((id) => `<symbol id="${id}" viewBox="${FLAG_BOX}" preserveAspectRatio="xMidYMid slice">${FLAGS[id]}</symbol>`)
      .join('');
    const body = `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`;
    const name = `flags.${createHash('sha256').update(body).digest('hex').slice(0, 10)}`;
    file = { name, url: `/_astro/flags/${name}.svg`, body };
    cache.set(languages, file);
  }
  return file;
}

export function createFlags(languages: readonly Language[]) {
  const named = languages.map((language) => language.flag);
  return {
    flagHref(id: string): string {
      if (!named.includes(id)) {
        throw new Error(`flagHref("${id}"): no language in i18n.languages has the flag "${id}" (${named.join(', ')})`);
      }
      return `${flagSprite(languages).url}#${id}`;
    },
  };
}
