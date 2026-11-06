/** What a visitor allowed beyond the cookies the site cannot work without. */
export interface Consent {
  analytics: boolean;
  marketing: boolean;
  /** When the choice was made. */
  at: string;
}

const KEY = 'cookie-consent';
/** Raise this when the cookie policy changes, and everyone is asked again. */
const VERSION = 1;

export function readConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (saved?.v === VERSION && typeof saved.analytics === 'boolean' && typeof saved.marketing === 'boolean') {
      return { analytics: saved.analytics, marketing: saved.marketing, at: String(saved.at) };
    }
  } catch {
    /* unreadable or blocked storage: no choice yet */
  }
  return null;
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = { ...choice, at: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, ...consent }));
  } catch {
    /* storage refused: the choice lasts for this page only */
  }
  document.dispatchEvent(new CustomEvent('cn:consent', { detail: consent }));
  return consent;
}

/**
 * Runs now with the choice so far (null before one is made) and again each time it changes:
 * anything that sets analytics or marketing cookies starts from here, and only once allowed.
 */
export function onConsent(run: (consent: Consent | null) => void): void {
  run(readConsent());
  document.addEventListener('cn:consent', (event) => run((event as CustomEvent<Consent>).detail));
}
