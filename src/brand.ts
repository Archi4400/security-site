import { BRAND_NAME, PLATFORM as PLATFORM_ENV, SITE_URL } from 'astro:env/client';

export const BRAND = BRAND_NAME;

export const SITE = SITE_URL;
export const HOST = new URL(SITE).host;

/** Where every account button goes, taken as given and never parsed: the
 *  value comes from the CI and a malformed one must not stop the build. */
export const PLATFORM = PLATFORM_ENV?.trim() || 'https://companyname.example';
export const LOGIN = PLATFORM;
export const REGISTER = PLATFORM;

/** The product's service names are the brand in lower case: warden-tap, warden-waf. */
export const SVC = BRAND.toLowerCase().replace(/\s+/g, '-');

export const SUPPORT_EMAIL = `support@${HOST}`;
export const LEGAL_EMAIL = `legal@${HOST}`;
export const PRESS_EMAIL = `press@${HOST}`;
