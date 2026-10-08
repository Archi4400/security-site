export interface RuleGroup {
  href: string;
  ids: string[];
}

/** The 34 detection rules, in the order of the dictionary's groups. */
export const ruleGroups: RuleGroup[] = [
  {
    href: '/solutions/account-takeover',
    ids: [
      'id.bruteforce',
      'id.bruteforce_success',
      'id.2fa_bruteforce',
      'id.2fa_fatigue',
      'id.new_ip',
      'id.new_country',
      'id.new_ua',
      'id.impossible_travel',
      'id.session_moved',
      'id.off_hours',
      'id.non_browser_client',
    ],
  },
  { href: '/solutions/account-takeover', ids: ['id.tor_session', 'id.hosting_session'] },
  { href: '/solutions/privilege-escalation', ids: ['id.vanished_account', 'id.unknown_account', 'id.unknown_tokens'] },
  { href: '/solutions/privilege-escalation', ids: ['priv.self_grant', 'priv.new_admin', 'priv.2fa_disabled', 'priv.contact_changed'] },
  { href: '/solutions/data-exfiltration', ids: ['dlp.export_over_limit', 'dlp.read_volume', 'dlp.enumeration'] },
  {
    href: '/solutions/web-attacks',
    ids: ['waf.hit', 'waf.scanner', 'waf.authenticated_attack', 'recon.path_scan', 'authz.probing', 'net.distributed_flood'],
  },
  {
    href: '/solutions/security-posture',
    ids: [
      'posture.admin_without_2fa',
      'posture.dormant_account',
      'posture.dormant_admin',
      'posture.too_many_admins',
      'posture.no_rate_limit',
    ],
  },
];
