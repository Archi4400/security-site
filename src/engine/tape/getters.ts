import { tape as TAPE } from '../contract.json';

type Hook = Record<`data-${string}`, string>;
type AriaLabel = (key: string) => Record<string, string>;

const ID = /^[a-z][a-z0-9-]*$/;
const hook = (name: string, value: string) => ({ [name]: value }) as Hook;

export function createTape(ariaLabel: AriaLabel) {
  return function tape(id: string, options: { reverse?: boolean } = {}) {
    if (!ID.test(id)) throw new Error(`tape("${id}"): an id is lower-case letters, digits and "-", starting with a letter`);
    const { root, parts } = TAPE;
    const label = `${id}-label`;
    return {
      root: () => ({ ...hook(root.hook, id), ...(options.reverse ? hook('data-tape-reverse', '') : {}) }),
      label: () => ({ id: label, ...hook(parts.label.hook, id) }),
      view: () => ({ role: 'marquee' as const, 'aria-labelledby': label, ...hook(parts.view.hook, id) }),
      track: () => hook(parts.track.hook, id),
      run: () => hook(parts.run.hook, id),
      hold: () => ({ type: 'button' as const, 'aria-pressed': 'false' as const, ...hook(parts.hold.hook, id), ...ariaLabel('ui.pause') }),
    };
  };
}
