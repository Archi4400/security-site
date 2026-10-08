import contract from '../contract.json';
import { appData } from './data';

interface PartRule {
  hook: string;
  count: 'one' | 'many' | 'each-language' | 'each-theme' | 'each-option';
  tag?: string;
  value?: 'language' | 'theme' | 'option';
  attr?: string;
  scope?: 'page';
  hint?: string;
  in?: string;
  outside?: string;
  without?: Record<string, string>;
  plain?: string;
}

interface ModuleRule {
  name: string;
  root: { hook: string; getter: string; tag?: string };
  claims?: { role: string; part: string };
  parts: Record<string, PartRule>;
  links: [string, string, string][];
}

const RULES = contract as unknown as Record<string, ModuleRule>;
const THEMES = ['light', 'dark'];

function call(module: ModuleRule, part: string): string {
  if (part === 'root') return `${module.name}.${module.root.getter}()`;
  const { value } = module.parts[part];
  return `${module.name}.${part}(${value === 'language' ? 'code' : value ? 'value' : ''})`;
}

function how(module: ModuleRule, part: string): string {
  const rule = module.parts[part];
  return `spread ${call(module, part)} on ${rule.tag ? `a <${rule.tag}>` : 'its element'}${rule.hint ? `; ${rule.hint}` : ''}`;
}

const quote = (values: string[]) => values.map((value) => `"${value}"`).join(', ');

/** The value an option part stands for: `value` on an <option>, `data-value` on an item. */
const valueOf = (el: Element, rule: PartRule) => el.getAttribute(rule.attr ?? 'value') ?? '';

/** Every option part of one root against its first one, the native options: one each, none left out, none empty. */
function optionProblems(module: ModuleRule, label: string, byPart: Record<string, Element[]>): string[] {
  const counted = Object.entries(module.parts).filter(([, rule]) => rule.value === 'option');
  if (!counted.length) return [];
  const [reference, referenceRule] = counted[0];
  const expected = byPart[reference].map((el) => valueOf(el, referenceRule));
  const problems: string[] = [];
  for (const [part, rule] of counted) {
    const got = byPart[part].map((el) => valueOf(el, rule));
    if (!got.length) continue;
    if (got.includes('')) problems.push(`${label}: ${part} with an empty value — every option has a value`);
    const missing = [...new Set(expected)].filter((value) => value !== '' && !got.includes(value));
    const extra = [...new Set(got.filter((value, i) => value !== '' && (!expected.includes(value) || got.indexOf(value) !== i)))];
    if (missing.length) problems.push(`${label}: no ${part} for ${quote(missing)} — ${how(module, part)}`);
    if (extra.length) problems.push(`${label}: ${part} for ${quote(extra)} is repeated or not among the options`);
  }
  return problems;
}

/** Every way the page's markup departs from the contract, read from the live DOM. */
export function checkPage(doc: Document = document): string[] {
  const problems: string[] = [];
  const owned = new Set<Element>();
  const values = { language: appData().languages.map((language) => language.code), theme: THEMES };

  for (const [key, module] of Object.entries(RULES)) {
    const rootSelector = `[${module.root.hook}]`;
    const roots = [...doc.querySelectorAll(rootSelector)];
    const ids = roots.map((root) => root.getAttribute(module.root.hook) ?? '');
    const uses = new Map<string, number>();
    for (const id of ids) uses.set(id, (uses.get(id) ?? 0) + 1);
    for (const [id, n] of uses) if (n > 1) problems.push(`${key} "${id}": the id is used by ${n} roots — give each its own id`);

    for (const root of roots) {
      owned.add(root);
      const id = root.getAttribute(module.root.hook)!;
      const label = `${key} "${id}"`;
      if (module.root.tag && root.localName !== module.root.tag) {
        problems.push(`${label}: the root is a <${root.localName}> — put ${call(module, 'root')} on a <${module.root.tag}>`);
      }
      const byPart: Record<string, Element[]> = { root: [root] };
      for (const [part, rule] of Object.entries(module.parts)) {
        const all =
          rule.scope === 'page'
            ? [...doc.querySelectorAll(`[${rule.hook}]`)].filter((el) => el.getAttribute(rule.hook) === id)
            : [...root.querySelectorAll(`[${rule.hook}]`)].filter((el) => el.closest(rootSelector) === root);
        byPart[part] = all;
        for (const el of all) owned.add(el);
        if (rule.value === 'language' || rule.value === 'theme') {
          const got = all.map((el) => el.getAttribute(rule.hook)!);
          const expected = values[rule.value];
          const missing = expected.filter((value) => !got.includes(value));
          const extra = got.filter((value, i) => !expected.includes(value) || got.indexOf(value) !== i);
          if (missing.length) problems.push(`${label}: no ${part} for ${quote(missing)} — ${how(module, part)}`);
          if (extra.length) problems.push(`${label}: ${part} for ${quote(extra)} is repeated or not in the config`);
        } else if (!all.length) {
          problems.push(`${label}: no ${part} — ${how(module, part)}`);
        } else if (rule.count === 'one' && all.length > 1) {
          problems.push(`${label}: ${all.length} ${part} parts, expected one`);
        }
        if (rule.tag) {
          for (const el of all) {
            if (el.localName !== rule.tag) problems.push(`${label}: ${part} is a <${el.localName}> — put ${call(module, part)} on a <${rule.tag}>`);
          }
        }
        for (const [attribute, reason] of Object.entries(rule.without ?? {})) {
          if (all.some((el) => el.hasAttribute(attribute))) problems.push(`${label}: remove ${attribute} from ${part} — ${reason}`);
        }
        // a translation replaces the whole content of an element with a key
        for (const el of rule.plain ? all : []) {
          if (el.hasAttribute('data-i18n') && el.children.length) {
            const which = rule.attr ? ` for "${valueOf(el, rule)}"` : '';
            problems.push(`${label}: ${part}${which} holds elements its translation would replace — ${rule.plain}`);
          }
        }
      }
      problems.push(...optionProblems(module, label, byPart));
      for (const [part, rule] of Object.entries(module.parts)) {
        const within = rule.in ? byPart[rule.in] ?? [] : [];
        const beyond = rule.outside ? byPart[rule.outside] ?? [] : [];
        for (const el of byPart[part]) {
          if (rule.in && within.length && !within.some((place) => place.contains(el))) {
            problems.push(`${label}: ${part} is not inside its ${rule.in} — put ${call(module, part)} inside the element with ${call(module, rule.in)}`);
          }
          if (rule.outside && beyond.some((place) => place.contains(el))) {
            problems.push(`${label}: ${part} is inside its ${rule.outside} — put ${call(module, part)} outside the element with ${call(module, rule.outside)}`);
          }
        }
      }
      for (const [from, attribute, to] of module.links) {
        const source = byPart[from]?.[0];
        const target = byPart[to]?.[0];
        if (!source || !target) continue;
        const ref = source.getAttribute(attribute);
        if (!target.id || ref !== target.id) problems.push(`${label}: ${from} ${attribute} points to "${ref ?? ''}", not to its ${to}`);
      }
    }

    for (const [part, rule] of Object.entries(module.parts)) {
      for (const el of doc.querySelectorAll(`[${rule.hook}]`)) {
        if (rule.scope === 'page') {
          const value = el.getAttribute(rule.hook)!;
          if (!ids.includes(value)) problems.push(`${key}: ${part} for "${value}" has no ${call(module, 'root')} with that id on the page`);
        } else if (!el.closest(rootSelector)) {
          problems.push(
            `${key}: the ${part} part sits outside any ${call(module, 'root')} — the root is missing, or the browser moved the part out of it (a list or a block inside a <p>)`,
          );
        }
      }
    }
    if (module.claims) {
      const { role, part } = module.claims;
      for (const el of doc.querySelectorAll(`[role="${role}"]`)) {
        if (!el.hasAttribute(module.parts[part].hook)) problems.push(`the run builds its own ${role} — use ${key}()`);
      }
    }
  }

  const seen = new Map<string, number>();
  for (const el of doc.querySelectorAll('[id]')) seen.set(el.id, (seen.get(el.id) ?? 0) + 1);
  for (const el of owned) {
    if (el.id && (seen.get(el.id) ?? 0) > 1) {
      problems.push(`duplicate id "${el.id}" on the page — give each instance its own id`);
    }
  }
  return [...new Set(problems)];
}

const FOCUSABLE = 'a[href], button, input, select, textarea, summary, [tabindex]';
const SCROLLS = ['auto', 'scroll'];

const tagOf = (el: Element) => `<${el.localName}${el.classList.length ? ` class="${[...el.classList].join(' ')}"` : ''}>`;

/** A pinned bar and the sticky bars without one, read from the computed styles once the page has its CSS. */
export function checkPinned(doc: Document = document): string[] {
  const view = doc.defaultView!;
  const offset = parseFloat(view.getComputedStyle(doc.documentElement).scrollPaddingTop) || 0;
  const problems: string[] = [];
  for (const el of doc.body.querySelectorAll('*')) {
    const style = view.getComputedStyle(el);
    const pinned = el.closest('[data-pinned]');
    if (pinned && SCROLLS.includes(style.overflowY) && el.scrollHeight > el.clientHeight && el.clientHeight < offset) {
      problems.push(
        `pinned(): ${tagOf(el)} scrolls inside the bar but is ${el.clientHeight}px tall, under --pinned-offset (${offset}px): focus inside it may stay out of view — make it at least as tall or move it out of the bar`,
      );
    }
    // a bar stuck below the offset, or not stuck at all, is not under it
    if (style.position !== 'sticky' || style.top === 'auto') continue;
    if (pinned) {
      if (!offset) problems.push('pinned(): the bar is sticky, but --pinned-offset on :root is 0 — anchors and focus land under it');
    } else if (offset && (parseFloat(style.top) || 0) < offset && el.querySelector(FOCUSABLE)) {
      problems.push(`${tagOf(el)} is sticky and holds controls: focus on them scrolls the page under the offset — spread pinned() on it`);
    }
  }
  return [...new Set(problems)];
}

export function reportPage(): void {
  for (const problem of checkPage()) console.error(problem);
  // computed styles are whole only once the page's stylesheets have loaded
  const pinned = () => {
    for (const problem of checkPinned()) console.error(problem);
  };
  if (document.readyState === 'complete') pinned();
  else window.addEventListener('load', pinned, { once: true });
}
