export interface Solution {
  slug: string;
  key: 'ato' | 'priv' | 'leak' | 'attacks' | 'posture';
  icon: 'key' | 'stack' | 'export' | 'radar' | 'gauge';
}

export const solutions: Solution[] = [
  { slug: 'account-takeover', key: 'ato', icon: 'key' },
  { slug: 'privilege-escalation', key: 'priv', icon: 'stack' },
  { slug: 'data-exfiltration', key: 'leak', icon: 'export' },
  { slug: 'web-attacks', key: 'attacks', icon: 'radar' },
  { slug: 'security-posture', key: 'posture', icon: 'gauge' },
];
