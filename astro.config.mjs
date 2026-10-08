import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import engine, { checkAstroConfig } from './src/engine/integration';

const SITE_URL = 'https://companyname.example';

const target = process.env.ASTRO_ADAPTER ?? (/cloudflare/i.test(process.env.CI_JOB_NAME ?? '') ? 'cloudflare' : 'node');
const onCloudflare = target === 'cloudflare';

// The engine's check accepts only the node adapter; on Workers it runs
// without that line.
function siteEngine() {
  const integration = engine();
  if (onCloudflare) {
    integration.hooks['astro:config:done'] = ({ config }) => {
      const problems = checkAstroConfig({ ...config, adapter: { name: '@astrojs/node' } });
      if (problems.length) throw new Error(`astro.config.mjs:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    };
  }
  return integration;
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  output: 'static',
  // Workers cannot run sharp, so images are resized at build time there.
  adapter: onCloudflare ? cloudflare({ imageService: 'compile' }) : node({ mode: 'standalone' }),
  integrations: [siteEngine(), sitemap()],
  server: { host: true, allowedHosts: true },
  // Whitespace between inline elements stays a space, as in HTML.
  compressHTML: true,
  env: {
    schema: {
      BRAND_NAME: envField.string({ context: 'client', access: 'public', default: 'Warden' }),
      SITE_URL: envField.string({ context: 'client', access: 'public', url: true, default: SITE_URL }),
      PLATFORM: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
