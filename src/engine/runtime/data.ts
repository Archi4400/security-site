export interface AppData {
  lang: string;
  languages: { code: string; short: string }[];
  files: Record<string, string>;
  theme: { default: 'light' | 'dark'; color: Record<'light' | 'dark', string> };
}

let cached: AppData | null = null;

export function appData(): AppData {
  if (cached) return cached;
  const raw = document.getElementById('app-config')?.textContent;
  if (raw) {
    cached = JSON.parse(raw) as AppData;
  } else {
    if (import.meta.env.DEV) console.error('No #app-config on this page: render <Runtime /> in the layout.');
    cached = {
      lang: document.documentElement.lang || 'en',
      languages: [],
      files: {},
      theme: { default: 'dark', color: { dark: '#000000', light: '#ffffff' } },
    };
  }
  return cached;
}
