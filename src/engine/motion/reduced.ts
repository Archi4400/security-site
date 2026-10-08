import { notify } from '../runtime/notify';

const QUERY = '(prefers-reduced-motion: reduce)';
const listeners = new Set<(reduced: boolean) => void>();
let media: MediaQueryList | null = null;

function query(): MediaQueryList {
  if (!media) {
    media = window.matchMedia(QUERY);
    media.addEventListener('change', (event) => {
      for (const listener of [...listeners]) notify(listener, event.matches);
    });
  }
  return media;
}

export function reducedMotion(): boolean {
  return query().matches;
}

export function onReducedMotion(listener: (reduced: boolean) => void): () => void {
  listeners.add(listener);
  notify(listener, query().matches);
  return () => {
    listeners.delete(listener);
  };
}
