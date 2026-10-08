# Warden — marketing site

Astro 7 site in English and Spanish, with a light and a dark theme. Pages are
prerendered; a small Node (or Cloudflare Workers) server serves them and the
404 page.

Requires Node 22.12 or newer.

## Environment

| Variable   | When        | What                                                                 |
| ---------- | ----------- | -------------------------------------------------------------------- |
| `PLATFORM` | build time  | Where "Log in", "Request access" and the other account buttons lead. |

Copy `.env.example` to `.env` and set it. Without it the buttons point to the
placeholder `https://companyname.example`.

The brand name (`Warden`) and the site's own address
(`https://companyname.example`) are defaults in `astro.config.mjs`; change
them there, or set `BRAND_NAME` and `SITE_URL` in `.env`.

## Run

```sh
npm ci
npm run dev                       # http://localhost:4321
npm run build                     # Node build into dist/
node ./dist/server/entry.mjs      # serves dist/ on $PORT (default 4321)
```

### Docker

```sh
docker build -t security-site .
docker run -p 3000:3000 security-site
```

### Cloudflare Workers

```sh
npm run build:cf                  # ASTRO_ADAPTER=cloudflare astro build
npx wrangler deploy
```

`wrangler.jsonc` holds the Worker's name and settings. On Windows set
`ASTRO_ADAPTER=cloudflare` in the shell before `astro build` rather than
through the npm script.

## Structure

- `src/pages/` — the routes: home, solutions, portal, pricing, blog, about,
  careers, press, FAQ, resellers, contact, the legal pages, site map, 404.
- `src/components/` — header, footer and page sections.
- `src/i18n/locales/` — the copy, one dictionary per language (`en`, `es`,
  plus FAQ and legal texts).
- `src/styles/global.css` — the colour and type tokens for both themes.
- `src/engine/` — the shared runtime: language and theme switching, menus,
  reveal and count-up animations.
- `public/logo/` — `logo.svg` (dark theme), `logo_dark.svg` (light theme),
  `icon.svg`.
