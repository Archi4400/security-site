import type { APIRoute } from 'astro';
import config from '../load-config';
import { dictionaryFiles } from './files';

export const prerender = true;

export function getStaticPaths() {
  return dictionaryFiles(config.i18n.dictionaries).map((file) => ({
    params: { file: file.name },
    props: { body: file.body },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props.body), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
