export interface NavLink {
  href: string;
  key: string;
  textKey?: string;
}

export interface NavGroup extends NavLink {
  allKey: string;
  items: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const solutionLinks: NavLink[] = [
  { href: '/solutions/account-takeover', key: 'menu.ato.title', textKey: 'menu.ato.text' },
  { href: '/solutions/privilege-escalation', key: 'menu.priv.title', textKey: 'menu.priv.text' },
  { href: '/solutions/data-exfiltration', key: 'menu.leak.title', textKey: 'menu.leak.text' },
  { href: '/solutions/web-attacks', key: 'menu.attacks.title', textKey: 'menu.attacks.text' },
  { href: '/solutions/security-posture', key: 'menu.posture.title', textKey: 'menu.posture.text' },
  { href: '/portal', key: 'menu.portal.title', textKey: 'menu.portal.text' },
];

export const aboutLinks: NavLink[] = [
  { href: '/about', key: 'menu.company.title', textKey: 'menu.company.text' },
  { href: '/careers', key: 'menu.careers.title', textKey: 'menu.careers.text' },
  { href: '/press', key: 'menu.press.title', textKey: 'menu.press.text' },
  { href: '/faq', key: 'menu.faq.title', textKey: 'menu.faq.text' },
  { href: '/resellers', key: 'menu.resellers.title', textKey: 'menu.resellers.text' },
];

export const navRoutes: NavEntry[] = [
  { href: '/solutions', key: 'nav.solutions', allKey: 'nav.solutionsAll', items: solutionLinks },
  { href: '/pricing', key: 'nav.pricing' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/about', key: 'nav.about', allKey: 'nav.aboutAll', items: aboutLinks },
  { href: '/contact', key: 'nav.contact' },
];

export const isGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

export const isCurrent = (href: string, path: string): boolean =>
  href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
