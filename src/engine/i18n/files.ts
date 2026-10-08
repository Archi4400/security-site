import { createHash } from 'node:crypto';
import type { Dictionary } from '../config';
import { flatten, type Flat } from './flatten';

export interface DictionaryFile {
  lang: string;
  name: string;
  url: string;
  body: Flat;
}

const cache = new WeakMap<object, DictionaryFile[]>();

export function dictionaryFiles(dictionaries: Record<string, Dictionary>): DictionaryFile[] {
  let files = cache.get(dictionaries);
  if (!files) {
    files = Object.entries(dictionaries).map(([lang, dict]) => {
      const body = flatten(dict);
      const hash = createHash('sha256').update(JSON.stringify(body)).digest('hex').slice(0, 10);
      const name = `${lang}.${hash}`;
      return { lang, name, url: `/_astro/i18n/${name}.json`, body };
    });
    cache.set(dictionaries, files);
  }
  return files;
}

export function dictionaryUrls(dictionaries: Record<string, Dictionary>): Record<string, string> {
  return Object.fromEntries(dictionaryFiles(dictionaries).map((file) => [file.lang, file.url]));
}
