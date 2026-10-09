/**
 * A panel tilts a few degrees after a fine pointer anywhere in its section.
 * Writes --lean-x / --lean-y on every [data-lean]; global.css turns them into
 * the transform, scaled by the panel's --lean-amount.
 */

const TILT_Y_DEG = 3;
const TILT_X_DEG = 2;

export function wireLean(isReduced: () => boolean, root: ParentNode = document): () => void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};

  const hosts = Array.from(root.querySelectorAll<HTMLElement>('[data-lean]'));
  const controller = new AbortController();
  const rest = (host: HTMLElement): void => {
    host.style.removeProperty('--lean-x');
    host.style.removeProperty('--lean-y');
  };

  for (const host of hosts) {
    const stage = host.closest<HTMLElement>('section') ?? host;
    stage.addEventListener(
      'pointermove',
      (event) => {
        if (isReduced()) return;
        const box = stage.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width) * 2 - 1;
        const y = ((event.clientY - box.top) / box.height) * 2 - 1;
        host.style.setProperty('--lean-y', `${(x * TILT_Y_DEG).toFixed(2)}deg`);
        host.style.setProperty('--lean-x', `${(-y * TILT_X_DEG).toFixed(2)}deg`);
      },
      { signal: controller.signal, passive: true },
    );
    stage.addEventListener('pointerleave', () => rest(host), { signal: controller.signal });
  }

  return () => {
    controller.abort();
    hosts.forEach(rest);
  };
}
