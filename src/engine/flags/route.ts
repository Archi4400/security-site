import type { APIRoute } from 'astro';
import config from '../load-config';
import { flagSprite } from './sprite';

export const prerender = true;

export function getStaticPaths() {
  const file = flagSprite(config.i18n.languages);
  return [{ params: { file: file.name }, props: { body: file.body } }];
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.body, {
    headers: { 'content-type': 'image/svg+xml; charset=utf-8' },
  });
