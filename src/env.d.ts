/// <reference types="astro/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    /** Market data host the server asks for prices; https://api.binance.com when unset. Read at run time. */
    readonly MARKET_API_URL?: string;
  }
}

/** Plain tsc cannot read .astro files; `astro check` and the editor type them. */
declare module '*.astro' {
  const component: import('astro/runtime/server/index.js').AstroComponentFactory;
  export default component;
}
