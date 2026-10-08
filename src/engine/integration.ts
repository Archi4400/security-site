import type { AstroConfig, AstroIntegration } from 'astro';

type Checked = {
  site?: AstroConfig['site'];
  trailingSlash: AstroConfig['trailingSlash'];
  adapter?: { name: string };
};

export function checkAstroConfig(config: Checked): string[] {
  const problems: string[] = [];
  if (!config.site) problems.push('`site` is not set (SITE_URL): canonical links, Open Graph and the sitemap need it');
  if (config.trailingSlash !== 'never') problems.push(`trailingSlash must be 'never' (found '${config.trailingSlash}')`);
  if (config.adapter?.name !== '@astrojs/node') {
    problems.push('the adapter must be @astrojs/node: the market routes run on the server, which answers an unknown address with the 404 page');
  }
  return problems;
}

export default function engine(): AstroIntegration {
  return {
    name: 'engine',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/_astro/i18n/[file].json', entrypoint: './src/engine/i18n/route.ts', prerender: true });
        injectRoute({ pattern: '/_astro/flags/[file].svg', entrypoint: './src/engine/flags/route.ts', prerender: true });
        injectRoute({ pattern: '/api/markets', entrypoint: './src/engine/market/markets-route.ts', prerender: false });
        injectRoute({ pattern: '/api/series', entrypoint: './src/engine/market/series-route.ts', prerender: false });
      },
      'astro:config:done': ({ config }) => {
        const problems = checkAstroConfig(config);
        if (problems.length) throw new Error(`astro.config.mjs:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
      },
    },
  };
}
