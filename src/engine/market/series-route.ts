import type { APIRoute } from 'astro';
import config from '../load-config';
import { seriesResponse } from './api';

export const prerender = false;

export const GET: APIRoute = ({ url }) => seriesResponse(config.market, url);
