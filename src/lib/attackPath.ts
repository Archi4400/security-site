/**
 * Scenario B, "the attack path": an online store on a PHP (Laravel) backend as the scan maps it,
 * the three findings on it, and how an attacker would chain them to the customer data. Shared by
 * the markup the server renders and the script that plays it.
 */
import type { IconName } from './icons';

export type NodeId = 'site' | 'admin' | 'accounts' | 'db' | 'data';

export interface MapNode {
  id: NodeId;
  icon: IconName;
  /** What the scan reports while it checks this part, as the system itself names it. */
  probe: string;
}

/** The parts of the site, in the order an attacker would reach them. */
export const nodes: MapNode[] = [
  { id: 'site', icon: 'site', probe: 'https://shop.example.com · nginx' },
  { id: 'admin', icon: 'key', probe: 'shop.example.com/admin · Laravel 11' },
  { id: 'accounts', icon: 'user', probe: 'users · role=admin' },
  { id: 'db', icon: 'database', probe: 'mysql://shop_prod · grants' },
  { id: 'data', icon: 'users', probe: 'shop_prod.customers' },
];

export type FindingId = 'admin' | 'accounts' | 'db';

/** The parts with a finding, each with the change the scan recommends for it: where it is made, and the diff. */
export const findings: { id: FindingId; file: string; diff: string[] }[] = [
  {
    id: 'admin',
    file: 'config/admin.php',
    diff: ["- 'allowed_ips' => ['*'],", "+ 'allowed_ips' => ['10.20.0.0/16'],"],
  },
  {
    id: 'accounts',
    file: 'config/auth.php',
    diff: ["- 'password_min' => 6,", "+ 'password_min' => 12,", "+ 'lockout_after' => 5,"],
  },
  {
    id: 'db',
    file: 'mysql · shop_prod',
    diff: ["- GRANT ALL ON shop_prod.* TO 'admin_app';", "+ GRANT SELECT ON shop_prod.orders TO 'admin_app';"],
  },
];

export const isFinding = (id: NodeId): id is FindingId => findings.some((f) => f.id === id);

/** What the attacker does on each link, from one part to the next. */
export const hops = ['GET /admin/login', 'brute-force', 'admin session', 'SELECT customers'];

/**
 * The attacker's console while the attack runs, one session per link: a command typed, then what comes back.
 * `cmd` and `sql` are typed out; `try` is the line where the guesses fly past; `hit` is the attacker getting
 * somewhere. Every session opens with a plain-language note, from the dictionary.
 */
export type ConsoleKind = 'cmd' | 'sql' | 'out' | 'try' | 'hit';

export const sessions: [ConsoleKind, string][][] = [
  [
    ['cmd', 'curl -sI https://shop.example.com/admin/login'],
    ['out', 'HTTP/2 200'],
    ['out', 'server: nginx · x-powered-by: PHP/8.3'],
    ['hit', '[+] login form answers from any address'],
  ],
  [
    ['cmd', 'brute-force https://shop.example.com/admin/login -U admins.txt -P top-10k.txt'],
    ['out', '[*] 4 admin accounts · min length 6 · no lockout'],
    ['try', ''],
    ['hit', '[+] 3,912 tries · 0 blocked · m.kovacs : qwe123'],
  ],
  [
    ['cmd', 'login https://shop.example.com/admin --user m.kovacs'],
    ['hit', '[+] admin session · role=superadmin'],
    ['cmd', 'open /admin/reports/sql'],
    ['out', '[*] queries run as admin_app · GRANT ALL ON shop_prod.*'],
  ],
  [
    ['sql', 'SELECT email, phone, address FROM customers;'],
    ['out', '148,210 rows in set (2.31 sec)'],
    ['hit', '[!] saved customers.csv · 38 MB'],
  ],
];

/** The account the guesses run against, the passwords that fly past, and how many there are by the time one works. */
export const guessing = {
  user: 'm.kovacs',
  words: ['123456', 'password', 'shop2024', 'qwerty12', 'letmein', 'welcome1', 'admin123', 'sunshine', 'iloveyou', 'summer24'],
  tries: 3911,
};

/** The checks the whole scan runs, for the counter that climbs while it maps the site. */
export const checks = 248;

/** Where the attacker's sparks fly when it runs into a cut link: [x, y] in pixels from the break. */
export const sparks: [number, number][] = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2 + 0.3;
  const reach = 16 + (i % 3) * 7;
  return [Math.round(Math.cos(angle) * reach), Math.round(Math.sin(angle) * reach)];
});
