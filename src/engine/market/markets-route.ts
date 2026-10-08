import type { APIRoute } from 'astro';
import config from '../load-config';
import { marketsResponse } from './api';

export const prerender = false;

export const GET: APIRoute = () => marketsResponse(config.market);
