import { select as SELECT } from '../contract.json';

type Hook = Record<`data-${string}`, string>;

export interface SelectOption {
  value: string;
  key?: string;
}

export interface SelectOptions {
  name: string;
  labelKey: string;
  options: SelectOption[];
  value?: string;
}

const ID = /^[a-z][a-z0-9-]*$/;
const hook = (name: string, value: string) => ({ [name]: value }) as Hook;
const text = (key: string | undefined) => (key === undefined ? {} : { 'data-i18n': key });

export function select(id: string, { name, labelKey, options, value }: SelectOptions) {
  const refuse = (why: string) => new Error(`select("${id}"): ${why}`);
  if (!ID.test(id)) throw refuse('an id is lower-case letters, digits and "-", starting with a letter');
  if (!options.length) throw refuse('options is empty — give it at least one { value, key? }');
  const values = options.map((option) => option.value);
  if (values.includes('')) throw refuse('an option has an empty value — every option has a value');
  const twice = values.find((v, i) => values.indexOf(v) !== i);
  if (twice !== undefined) throw refuse(`the value "${twice}" is used by two options`);
  const initial = value ?? values[0];
  if (!values.includes(initial)) throw refuse(`the value "${initial}" is not among the options (${values.join(', ')})`);

  const at = (getter: string, v: string) => {
    const i = values.indexOf(v);
    if (i === -1) throw new Error(`pick.${getter}("${v}"): "${v}" is not among the options of select("${id}")`);
    return i;
  };
  const { root, parts } = SELECT;
  const label = `${id}-label`;
  const native = `${id}-native`;
  const list = `${id}-list`;
  return {
    root: () => hook(root.hook, id),
    label: () => ({ id: label, for: native, 'data-i18n': labelKey, ...hook(parts.label.hook, id) }),
    native: () => ({ id: native, name, ...hook(parts.native.hook, id) }),
    option: (v: string) => {
      const i = at('option', v);
      return { value: v, selected: v === initial, ...text(options[i].key), ...hook(parts.option.hook, id) };
    },
    ui: () => hook(parts.ui.hook, id),
    trigger: () => ({
      type: 'button' as const,
      id: `${id}-trigger`,
      role: 'combobox' as const,
      'aria-labelledby': label,
      'aria-controls': list,
      'aria-expanded': 'false' as const,
      ...hook(parts.trigger.hook, id),
    }),
    value: () => hook(parts.value.hook, id),
    list: () => ({ id: list, role: 'listbox' as const, 'aria-labelledby': label, tabindex: '-1', hidden: true, ...hook(parts.list.hook, id) }),
    item: (v: string) => {
      const i = at('item', v);
      return {
        id: `${id}-opt-${i}`,
        role: 'option' as const,
        'data-value': v,
        'aria-selected': v === initial ? ('true' as const) : ('false' as const),
        ...text(options[i].key),
        ...hook(parts.item.hook, id),
      };
    },
  };
}
