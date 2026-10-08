import { BRAND, SVC } from '../../brand';

export const en = {
  meta: {
    home: {
      title: `${BRAND} — threat detection for self-built SaaS CRMs`,
      desc: `${BRAND} catches account takeover, insider actions, privilege escalation and bulk data export inside self-built multi-tenant CRMs — without taking your data.`,
    },
    solutions: {
      title: `Solutions | ${BRAND}`,
      desc: `What ${BRAND} catches inside a self-built CRM: account takeover, privilege escalation, data exfiltration, web attacks and security posture.`,
    },
    ato: {
      title: `Account takeover detection | ${BRAND}`,
      desc: 'Password guessing, 2FA brute force and fatigue, new subnets and devices, impossible travel and stolen sessions — caught from traffic, even when the CRM logs nothing.',
    },
    priv: {
      title: `Privilege escalation detection | ${BRAND}`,
      desc: 'Self-granted rights, new administrators, a disabled second factor, changed contacts and accounts that should not exist — read straight from the permissions in your database.',
    },
    leak: {
      title: `Data exfiltration detection | ${BRAND}`,
      desc: 'Exports over the usual limit and bulk reading of records one by one, with a second, long window for slow exfiltration just below the threshold.',
    },
    attacks: {
      title: `Web attack detection | ${BRAND}`,
      desc: 'Known web attacks by the OWASP Core Rule Set, scanners, attacks from signed-in accounts, path and object probing and distributed floods — with the evidence shown.',
    },
    posture: {
      title: `Security posture | ${BRAND}`,
      desc: 'Admins without a second factor, dormant accounts and admins, too many admins and no rate limit on sign-in — and a protection score with an open formula.',
    },
    portal: {
      title: `Client portal | ${BRAND}`,
      desc: `The ${BRAND} portal shows the owner what happened, what is protected, how they are attacked and what to improve — with weekly and monthly reports.`,
    },
    pricing: {
      title: `Pricing | ${BRAND}`,
      desc: `${BRAND} plans for a CRM on a test environment, a CRM in production and hosting providers running several CRM companies behind one gateway.`,
    },
    blog: {
      title: `Blog | ${BRAND}`,
      desc: `Notes from the ${BRAND} team on detection inside self-built CRMs, data that stays home and honest coverage.`,
    },
    contact: {
      title: `Contact | ${BRAND}`,
      desc: `Request access to ${BRAND}, ask about pricing or partnership, or write to the team.`,
    },
    about: {
      title: `About | ${BRAND}`,
      desc: `${BRAND} is built by engineers for owners of self-built SaaS CRMs who have no security team of their own.`,
    },
    careers: {
      title: `Join us | ${BRAND}`,
      desc: `Work on ${BRAND}: detection rules, collectors that never get in the way and a portal an owner can read.`,
    },
    press: {
      title: `From the media | ${BRAND}`,
      desc: `The ${BRAND} press kit: a short description, key facts, the logo files and a contact for journalists.`,
    },
    faq: {
      title: `FAQ | ${BRAND}`,
      desc: `Answers about ${BRAND}: what it catches, what leaves your infrastructure, installation and what it does not do.`,
    },
    resellers: {
      title: `Become a reseller | ${BRAND}`,
      desc: `Offer ${BRAND} to the CRM companies you host or integrate — one gateway, a connector per company.`,
    },
    privacy: {
      title: `Privacy policy | ${BRAND}`,
      desc: `How the ${BRAND} website handles personal data.`,
    },
    terms: {
      title: `Terms of use | ${BRAND}`,
      desc: `The terms of use of the ${BRAND} website.`,
    },
    cookies: {
      title: `Cookie policy | ${BRAND}`,
      desc: `What the ${BRAND} website stores in your browser, and why.`,
    },
    siteMap: {
      title: `Site map | ${BRAND}`,
      desc: `Every page of the ${BRAND} website.`,
    },
    signins: {
      title: `Why your CRM never sees a failed sign-in | ${BRAND}`,
      desc: 'Self-built CRMs often write nothing when a sign-in fails. How it can still be seen — from the traffic itself.',
    },
    allowlist: {
      title: `Allow-list, not deny-list | ${BRAND}`,
      desc: 'Why we refuse to filter data by listing what must not leave — and what does leave your infrastructure, exactly.',
    },
    score: {
      title: `A protection score that does not punish you for being attacked | ${BRAND}`,
      desc: 'How the protection score in the portal is built, and why attacks are deliberately left out of it.',
    },
    notFound: {
      title: `Page not found | ${BRAND}`,
      desc: `The page you asked for is not on the ${BRAND} site.`,
    },
  },

  nav: {
    label: 'Main',
    solutions: 'Solutions',
    solutionsAll: 'All solutions',
    pricing: 'Pricing',
    blog: 'Blog',
    about: 'About',
    aboutAll: 'About the company',
    contact: 'Contact',
    login: 'Log in',
    register: 'Register',
    cta: 'Request access',
  },

  menu: {
    ato: { title: 'Account takeover', text: 'Guessing, 2FA abuse, stolen sessions' },
    priv: { title: 'Privilege escalation', text: 'Self-granted rights, new admins' },
    leak: { title: 'Data exfiltration', text: 'Exports and bulk reading' },
    attacks: { title: 'Web attacks', text: 'OWASP CRS, scanners, floods' },
    posture: { title: 'Security posture', text: 'Weak spots and the protection score' },
    portal: { title: 'Client portal', text: 'What the owner sees' },
    company: { title: 'About the company', text: 'Who we are and how we build' },
    careers: { title: 'Join us', text: 'Open roles' },
    press: { title: 'From the media', text: 'Press kit and contacts' },
    faq: { title: 'FAQ', text: 'Short answers' },
    resellers: { title: 'Become a reseller', text: 'For hosts and integrators' },
  },

  footer: {
    blurb: `Threat detection for self-built multi-tenant SaaS CRMs. ${BRAND} sees what happens inside the CRM without taking the data.`,
    product: 'Product',
    company: 'Company',
    legal: 'Legal',
    social: 'Follow us',
    linkedin: 'LinkedIn',
    x: 'X',
    telegram: 'Telegram',
    github: 'GitHub',
    youtube: 'YouTube',
    rights: `© 2026 ${BRAND}. All rights reserved.`,
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    cookies: 'Cookie policy',
    siteMap: 'Site map',
  },

  common: {
    cta: 'Request access',
    contact: 'Contact us',
    read: 'Read the article',
    back: 'All articles',
    quote: 'Request a quote',
    synthetic: 'Portal view on synthetic data',
    rules: 'Rules',
    howCaught: 'How it is caught',
    alertShows: 'What the alert shows',
    limit: 'Worth knowing',
    related: 'Other solutions',
  },

  close: {
    title: 'See what your CRM has not been telling you',
    lede: `${BRAND} is working with its first clients on their test environments ahead of the commercial launch. Tell us about your CRM and we will show you what the rules would see.`,
  },

  panel: {
    status: 'Protection status',
    since: 'Since your last visit',
    score: 'Protection score',
    formula: 'open formula',
    rules: 'rules running',
    open: 'open incidents',
    waf: 'WAF cost per request',
    wafValue: '1.9 ms',
    i1: 'Admin sign-in without 2FA from a new subnet',
    i2: 'Token active for a removed employee',
    i3: 'Export over the usual limit',
    i4: 'New administrator approved by the owner',
    t1: '02:14',
    t2: 'yesterday',
    t3: 'Mon',
    t4: 'Sun',
    high: 'High',
    mid: 'Medium',
    low: 'Resolved',
  },

  home: {
    hero: {
      kicker: 'Threat detection for self-built SaaS CRMs',
      title: 'See what happens inside your CRM. Keep the data where it is.',
      lede: `${BRAND} catches account takeover, insider actions, privilege escalation and bulk data export — and shows the owner what happened and what to do.`,
      secondary: 'How it works',
    },
    problem: {
      title: 'A self-built CRM cannot see attacks on itself',
      lede: 'This is the norm for self-built CRMs, not the exception — and it is why log-based security stacks come up empty.',
      items: [
        {
          trace: 'POST /login → 401 · log: —',
          title: 'Failed sign-ins go unrecorded',
          text: 'Many CRMs never log a failed sign-in. Password guessing, 2FA code brute force and reading records one by one stay invisible — and a stack built on logs, like Wazuh or ELK, has nothing to collect.',
        },
        {
          trace: 'role_permissions → admin · 2FA: off',
          title: 'Nobody knows who is really an admin',
          text: 'Rights are rows in a permissions table, with no admin flag. An admin without a second factor, a dormant account with wide rights, a new admin created at night, a dismissed employee whose session still works — it is all in the database, and nobody looks.',
        },
        {
          trace: 'outbound: allow-list only',
          title: 'The data is not leaving',
          text: 'Handing customer data to an outside security service is not a negotiating position, it is a constant. Cloud products ask for exactly that.',
        },
        {
          trace: 'protection score: ?',
          title: 'No answer to “am I protected?”',
          text: 'Even when something is collected, nobody can say how well the company is protected and what to improve next.',
        },
      ],
    },
    how: {
      title: 'Light collectors on your side. The analysis on ours.',
      lede: 'Three small services run next to your application, each in its own repository you can review yourself. Only allow-listed metadata crosses to us, over HTTPS.',
      yours: 'Your infrastructure',
      ours: BRAND,
      line: 'HTTPS · metadata only',
      tap: { name: `${SVC}-tap`, text: 'A sidecar in the application pod. Reads network traffic and joins each request to its response.', key: 'Never in the request path. If something is wrong with its config or rights, it does not crash or take the pod down — it waits and logs the reason.' },
      waf: { name: `${SVC}-waf`, text: 'Runs traffic through Coraza and the OWASP Core Rule Set, cuts out what is sensitive and derives events: sign-in succeeded, sign-in failed, export, role change.', key: 'Sees request bodies, but has no access to the database.' },
      connector: { name: `${SVC}-connector`, text: 'Reads your database read-only, from an explicit list of tables; applies the allow-list, buffers and sends.', key: 'Has access to the database, but never sees request bodies.' },
      core: { name: 'core', text: 'Intake and deduplication' },
      brain: { name: 'brain', text: 'Rules and alert aggregation' },
      baseline: { name: 'baseline', text: 'Behaviour profiles' },
      notifier: { name: 'notifier', text: 'Telegram and reports' },
      portalNode: { name: 'portal', text: 'The client portal' },
      kept: 'Stays with you',
      sent: 'Crosses the line',
      keptItems: ['Request bodies', 'Free text: comments, notes', 'Raw User-Agent', 'Session IDs and tokens'],
      sentItems: ['Allow-listed fields', 'Fingerprints of tokens and User-Agents', 'Evidence of a WAF hit, masked'],
      install: 'Three containers, each configured by one YAML file — a ConfigMap in Kubernetes. No agents in your code, no schema changes, no message broker.',
    },
    catches: {
      title: '34 rules, all running',
      lede: 'Behavioural analysis without machine learning: static rules with personal thresholds computed from each person’s history. The working-rhythm model knows the weekday, the company’s time zone and shifts past midnight.',
      groups: [
        { title: 'Account takeover' },
        { title: 'Suspicious networks' },
        { title: 'Accounts that should not exist' },
        { title: 'Privilege escalation' },
        { title: 'Data exfiltration' },
        { title: 'Reconnaissance and attacks' },
        { title: 'Hygiene' },
      ],
      rotation: 'Against address rotation: IPv6 is counted per /64 network, addresses of one IPv4 /24 are added together, and targeted guessing of one account is counted per account, whatever addresses it comes from.',
    },
    diff: {
      title: 'Where it sees what others cannot',
      venn: { traffic: 'Traffic', database: 'Database', both: 'who acted, and who they are' },
      items: [
        { title: 'Traffic and the database at once', text: 'API-security products see behaviour but not who is an admin. Posture tools know rights but only what the app says about itself. Joining both makes rules like “an admin signs in without 2FA from a new subnet” possible.' },
        { title: 'Works without an audit log', text: 'A failed sign-in is visible from the response status in traffic, even if the CRM writes it nowhere.' },
        { title: 'Data stays with you', text: 'Only fields from an explicit allow-list leave. A deny-list is ruled out as an approach, so a new field can never leak by accident.' },
        { title: 'The alert shows the evidence', text: 'A WAF hit shows what in the request was the attack — up to 256 characters around the match. Credentials show only the match and up to 32 characters around it. The company can turn evidence off.' },
        { title: 'You see what leaves', text: 'The connector has its own password-protected local page: a journal of what was sent after the allow-list, source status, and a dry run — paste a record and see what would leave.' },
        { title: 'Separation of access by design', text: 'The part that sees request bodies has no database access; the part with database access never sees bodies. Compromising one gives no full picture.' },
        { title: 'Tenant isolation in the access layer', text: 'Every query for events must carry a tenant ID — isolation is in the access layer, not left to whoever writes a rule.' },
        { title: 'Honest coverage', text: 'Not “34 rules enabled”, but which protection scenarios actually work on this company’s data, and what they are missing — judged by the events that arrive, not by settings.' },
      ],
    },
    showcase: {
      title: 'A portal the owner can read',
      lede: 'A separate web application for the client company, in English and Russian, with light and dark themes. Not a dashboard an engineer has to decode.',
      label: 'Portal screens',
      tabs: {
        status: { name: 'Protection status', text: 'What happened since the last visit, traffic for the day, open incidents and the protection score.' },
        incident: { name: 'Incident card', text: 'What happened, who, from where, the attack path, whether it reached its target, the evidence and what to do — with related cards and stories.' },
        coverage: { name: 'What is protected', text: 'Which protection scenarios work on your data and which data they are missing.' },
        score: { name: 'Protection score', text: 'A score from 0 to 100 with an open formula. Only what the company can improve itself counts; attacks do not, so the score never punishes you for being attacked.' },
      },
      incident: {
        title: 'Token active for a removed employee',
        who: 'Account',
        whoValue: 'm.ortega · Sales',
        from: 'From',
        fromValue: 'Known office subnet',
        reached: 'Reached the target',
        reachedValue: 'Read 14 records',
        action: 'What to do',
        actionValue: 'Revoke the session and rotate the token',
      },
      coverage: {
        c1: 'Account takeover',
        c2: 'Privilege escalation',
        c3: 'Data exfiltration',
        c4: 'Behavioural rules',
        works: 'Working',
        partial: 'Needs data',
        missing: 'Sign-in journal not connected',
      },
      score: {
        f1: 'Admins with 2FA',
        f2: 'No dormant admins',
        f3: 'Rate limit on sign-in',
        f4: 'Dormant accounts closed',
      },
    },
    numbers: {
      title: 'Measured, not promised',
      lede: 'Every figure comes from our test stand against a real application, not from a client’s production.',
      waf: { value: '~{n} ms', text: 'WAF analysis per request on a real CRM traffic profile' },
      core: { value: '~{n}', text: 'requests per second on a single core' },
      joined: { value: '{n}', text: 'of 1,500 requests joined to their responses, zero packets lost' },
      latency: { value: '{n} ms', text: 'p95 from capture to intake on our side' },
    },
    limits: {
      title: 'What it does not do — said up front',
      lede: 'The audience is a technical owner who will check. So here is what not to expect.',
      items: [
        { title: 'It alerts, it does not act', text: 'No IP blocking, no sign-outs, no disabled users. Semi-automatic and automatic modes are planned, not available.' },
        { title: 'WebSocket is not parsed', text: 'Chats, quotes and notifications over WebSocket are not analysed at all.' },
        { title: 'The first two weeks are hard alerts only', text: 'WAF, privileges and posture work at once; behavioural rules need history. Loading your sign-in journal shortens this, if you have one.' },
        { title: 'Telegram and the portal, nothing else', text: 'Each recipient filters by severity and rule. No e-mail, no Slack, no escalation by time yet.' },
        { title: 'No cross-client analytics — ever', text: 'It is the price of “your data stays with you”, and we would rather name it ourselves.' },
      ],
    },
    compare: {
      title: 'Compared with the honest alternative',
      lede: 'Not with Salt or posture tools — with hiring an engineer to build it on Wazuh and ModSecurity.',
      caption: `${BRAND} compared with a self-assembled stack`,
      col: 'Question',
      us: BRAND,
      diy: 'Wazuh + ModSecurity, built in-house',
      rows: [
        { q: 'Sees failed sign-ins the CRM never logs', us: 'Yes, from the response status in traffic', diy: 'Only what the application writes to its logs' },
        { q: 'Knows who is an administrator', us: 'Reads permissions from the database', diy: 'Only with custom work' },
        { q: 'Rules for CRM threats', us: '34 ready rules with personal thresholds', diy: 'Written and tuned by your engineer' },
        { q: 'Where the data lives', us: 'In your infrastructure; allow-listed metadata leaves', diy: 'In your infrastructure' },
        { q: 'What the owner gets', us: 'A portal, reports and a protection score', diy: 'A dashboard an engineer has to read' },
      ],
    },
  },

  solutions: {
    head: {
      title: 'What it catches inside your CRM',
      lede: 'Five groups of protection, one portal. Each group is a set of rules working on traffic and the database together.',
    },
    ato: {
      title: 'Account takeover',
      lede: 'Stolen passwords and sessions, caught from traffic — even in a CRM that never logs a failed sign-in.',
      rules: [
        { id: 'id.bruteforce', text: 'Password guessing' },
        { id: 'id.bruteforce_success', text: 'Guessing followed by a successful sign-in' },
        { id: 'id.2fa_bruteforce', text: '2FA code brute force' },
        { id: 'id.2fa_fatigue', text: '2FA fatigue — a stream of prompts' },
        { id: 'id.new_ip', text: 'Sign-in from a new subnet' },
        { id: 'id.new_country', text: 'Sign-in from a new country' },
        { id: 'id.new_ua', text: 'Sign-in from a new device' },
        { id: 'id.impossible_travel', text: 'Impossible travel' },
        { id: 'id.session_moved', text: 'A session moved to another device or country — a sign of a stolen token' },
        { id: 'id.off_hours', text: 'Sign-in outside a person’s own working rhythm' },
        { id: 'id.non_browser_client', text: 'A non-browser client on an interface route' },
        { id: 'id.tor_session', text: 'Work through Tor' },
        { id: 'id.hosting_session', text: 'Work from cloud or VPS hosting staff do not normally use' },
      ],
      how: 'A failed sign-in shows up in the response status, so guessing is visible even when the CRM writes nothing. Personal thresholds come from each person’s history; the working-rhythm model knows the weekday, the company’s time zone and night shifts.',
      shows: 'One card per sign-in: a new IP, a new device, a new country and travel within half an hour become one card whose severity grows with the number of signals — not five alerts.',
      limit: 'A session stolen while its owner is not working is not visible if the attacker replays the token from the same browser through a proxy in the owner’s country. A session used by the owner and an attacker at the same time is.',
    },
    priv: {
      title: 'Privilege escalation',
      lede: 'Who is an admin is read from your permissions tables — no admin flag needed.',
      rules: [
        { id: 'priv.self_grant', text: 'Rights granted to oneself' },
        { id: 'priv.new_admin', text: 'A new administrator' },
        { id: 'priv.2fa_disabled', text: 'A second factor turned off' },
        { id: 'priv.contact_changed', text: 'A changed contact e-mail or messenger' },
        { id: 'id.vanished_account', text: 'A token working for a deleted employee' },
        { id: 'id.unknown_account', text: 'An account that is not in your database' },
        { id: 'id.unknown_tokens', text: 'A stream of unknown tokens from one address' },
      ],
      how: `The connector reads the permissions you list, read-only. Traffic shows who acts; the database shows who they are. Together they make rules like “a token works for an employee who no longer exists”.`,
      shows: 'Who changed what, for whom, when and from where — with the related cards of the same account gathered into one story.',
      limit: 'Privilege rules are hard alerts: they work from the first day, without waiting for history.',
    },
    leak: {
      title: 'Data exfiltration',
      lede: 'Exports over the norm, and the quieter way around “we only watch exports”.',
      rules: [
        { id: 'dlp.export_over_limit', text: 'An export over the usual limit' },
        { id: 'dlp.read_volume', text: 'Reading far more records than usual' },
        { id: 'dlp.enumeration', text: 'Reading records one by one, in sequence' },
      ],
      how: 'Limits are personal, learned from each person’s history. Every rule has a second, long window, so a slow export kept just below the threshold is caught too.',
      shows: 'How much was read or exported, against the person’s usual volume, over which window, and what to do next.',
      limit: 'Behavioural rules need history: for the first two weeks they wait, unless your sign-in journal can be loaded to fill it in.',
    },
    attacks: {
      title: 'Web attacks',
      lede: 'The OWASP Core Rule Set on your real traffic — plus what happens after a sign-in.',
      rules: [
        { id: 'waf.hit', text: 'Known web attacks by the OWASP CRS' },
        { id: 'waf.scanner', text: 'Scanners' },
        { id: 'waf.authenticated_attack', text: 'An attack from a signed-in account, including a series of weak attempts of different types' },
        { id: 'recon.path_scan', text: 'Path scanning' },
        { id: 'authz.probing', text: 'Object probing with authorisation denials' },
        { id: 'net.distributed_flood', text: 'A distributed flood or guessing from a botnet, a request or two per address' },
      ],
      how: `${SVC}-waf runs Coraza with the OWASP Core Rule Set at about 1.9 ms per request on a real CRM traffic profile. Requests are fed to the engine correctly, which cut false positives on the GoTestWAF reference run from 55 to 13.`,
      shows: 'The evidence: up to 256 characters of the value around the match. Credentials — Authorization, Cookie, sensitive headers — show only the match and up to 32 characters around it. The company can turn evidence off and see only where it fired.',
      limit: 'Base64 in query parameters is not decoded by the CRS, so such payloads are not caught.',
    },
    posture: {
      title: 'Security posture',
      lede: 'What is lying in the database and making an attack easier — and a score that says what to fix.',
      rules: [
        { id: 'posture.admin_without_2fa', text: 'An administrator without a second factor' },
        { id: 'posture.dormant_account', text: 'Dormant accounts' },
        { id: 'posture.dormant_admin', text: 'Dormant administrators' },
        { id: 'posture.too_many_admins', text: 'Too many administrators' },
        { id: 'posture.no_rate_limit', text: 'No rate limit on sign-in' },
      ],
      how: 'Posture rules read the state of accounts and rights from your database, and the rate limit from traffic. They work from the first day.',
      shows: 'A protection score from 0 to 100 with an open formula. It counts only what the company can improve itself; attacks are left out, so being attacked never lowers it.',
      limit: 'The score measures what you control. It is not a promise that nothing can happen.',
    },
  },

  portal: {
    head: {
      title: 'The client portal',
      lede: 'A web application for the client company in English and Russian, light and dark. It answers the owner’s question — how protected are we, and what should we improve.',
    },
    screensTitle: 'Every screen of the portal',
    screens: [
      { title: 'Protection status', text: 'The main screen: what happened since the last visit, traffic for the day, open incidents, the protection score.' },
      { title: 'Incidents', text: 'A feed and a threat card: what happened, who, from where, the attack path, whether it reached its target, the evidence, what to do; related cards and stories.' },
      { title: 'Traffic', text: '“How am I attacked”: the share of attacked traffic and attack sources by country, provider network and address.' },
      { title: 'Sign-ins', text: 'Sign-in security: 2FA, suspicious sign-ins, activity.' },
      { title: 'Access', text: 'Staff accounts, administrators, who has no second factor, who has not signed in for long, changes of rights.' },
      { title: 'What is protected', text: 'Which protection scenarios work on the company’s data, and which data they lack.' },
      { title: 'Protection score', text: 'A score from 0 to 100 with an open formula — only what the company can improve itself.' },
      { title: 'Journal', text: 'What we did on the company’s incidents: detected, reported, taken on, closed.' },
      { title: 'Reports', text: 'Weekly and monthly, built automatically, archived in the portal, as PDF in English and Russian. A finished report goes to the company’s Telegram chats subscribed to that period.' },
      { title: 'Settings', text: 'Users and roles with one owner per company, Telegram recipients filtered by severity and rule, delivery history, the state of the tap, waf and connector, sign-in security.' },
    ],
    noise: {
      title: 'Built against noise',
      lede: 'False alarms are the main reason systems like this get switched off in the second week.',
      repeat: 'The same 4 more times · folded into one message',
      story: 'Story · 3 cards of one account',
      items: [
        'Turn a rule off for the company, add route exceptions, suppress a specific alert for a while.',
        'Repeats are folded into one message: “the same N more times”.',
        'One card per sign-in, its severity growing with the number of signals.',
        'Incidents as stories: cards of one account or one address gathered together.',
      ],
    },
  },

  pricing: {
    head: {
      title: 'Pricing',
      lede: `${BRAND} is priced per installation, after we see your traffic profile and the number of tenants. Every plan carries all 34 rules and the full portal.`,
    },
    onRequest: 'Price on request',
    plans: [
      {
        name: 'Pilot',
        for: 'For a CRM on a test environment, while we tune the rules on your data together.',
        points: ['Three collectors on your test environment', 'All rules, hard alerts from day one', 'Weekly review call with the team', 'Dry-run page to check what leaves'],
      },
      {
        name: 'Company',
        for: 'For one CRM in production, with its own tenants and domains.',
        points: ['Collectors in production', 'Behavioural rules with personal thresholds', 'Weekly and monthly reports', 'Telegram recipients filtered by severity'],
      },
      {
        name: 'Hosting',
        for: 'For hosts running several CRM companies behind one shared gateway.',
        points: ['One WAF for the whole entrance', 'A connector and keys per company', 'A separate portal for each company', 'Traffic split by domain before analysis'],
      },
    ],
    featured: 'Most asked',
    includedTitle: 'In every plan',
    included: [
      '34 detection rules across seven groups',
      'Client portal in English and Russian, light and dark',
      'Protection score with an open formula',
      'Weekly and monthly PDF reports',
      'Alerts in Telegram and the portal',
      'The connector’s local page with a dry run',
    ],
  },

  blog: {
    head: {
      title: 'Blog',
      lede: 'Notes from the team on detection inside self-built CRMs.',
    },
    minutes: '{n} min read',
    posts: {
      signins: {
        tag: 'Detection',
        date: 'September 22, 2026',
        title: 'Why your CRM never sees a failed sign-in',
        lede: 'Self-built CRMs often write nothing when a sign-in fails. Here is how a failed sign-in can still be seen — from the traffic itself.',
        body: [
          'Ask the owner of a self-built CRM how many failed sign-ins they had last week, and the honest answer is usually “we do not know”. The application never wrote them down. There is no journal of failed attempts, no session identifier in the logs, and the audit trail covers only what someone remembered to add.',
          'That gap is not a bug in one product — it is the norm. And it is why the classic route of collecting logs into Wazuh or ELK comes up short: there is nothing to collect. Password guessing, brute force on 2FA codes and reading customer records one at a time leave no trace in a log that was never written.',
          'The traffic, however, is there. Every sign-in attempt is a request, and every answer has a status. A sidecar that reads the traffic next to the application — without sitting in the request path — can join each request to its response and derive the event the application never recorded: sign-in failed.',
          'From there the rules work as they would with a perfect audit log: guessing, guessing followed by a success, a stream of 2FA prompts, a new subnet or country. The CRM did not have to change a line of code for it.',
        ],
      },
      allowlist: {
        tag: 'Privacy',
        date: 'September 15, 2026',
        title: 'Allow-list, not deny-list: what leaves your infrastructure',
        lede: 'Why we refuse to filter data by listing what must not leave — and what does leave, exactly.',
        body: [
          'A deny-list says: send everything except these fields. It works until someone adds a column called notes_internal and nobody updates the list. Then the new field leaves, quietly, on the next sync.',
          'An allow-list says the opposite: send only these fields. A new column stays home until someone decides it should not. That is why the connector applies an explicit allow-list and why a deny-list is ruled out as an approach.',
          'What never leaves: request bodies, free text such as comments and notes, the raw User-Agent (only its fingerprint), session identifiers and the tokens themselves (only their fingerprints). Query parameter values do not leave either — with one deliberate exception.',
          'The exception is the evidence of a WAF hit: up to 256 characters of the value around the match, so the alert can show what the attack was. Where the value is a credential, only the match and up to 32 characters around it are shown, never the whole value. A company can switch evidence off entirely and see only where a rule fired.',
          'And you do not have to take our word for it. The connector has its own password-protected local page with a journal of what was sent and a dry run: paste a record and see exactly what would leave.',
        ],
      },
      score: {
        tag: 'Portal',
        date: 'September 8, 2026',
        title: 'A protection score that does not punish you for being attacked',
        lede: 'How the score in the portal is built, and why attacks are deliberately left out of it.',
        body: [
          'Most security scores mix two things: how well you are set up, and how much bad luck you had this week. A spike of attacks drags the number down, the owner panics, and nothing they can do will fix it — because the attacks were never in their control.',
          'The protection score in the portal is a number from 0 to 100 with an open formula. Everything in it is something the company can improve on its own: administrators with a second factor, dormant accounts closed, dormant admins removed, a rate limit on sign-in.',
          'Attacks are counted elsewhere — on the Traffic and Incidents screens — and never in the score. Being attacked is not a failing; leaving an admin without 2FA is.',
          'Next to the score sits the coverage screen, which answers a different question: which protection scenarios actually work on your data, and which data they still lack. Not “34 rules enabled”, but what really runs.',
        ],
      },
    },
  },

  contact: {
    head: {
      title: 'Talk to the team',
      lede: 'Request access, ask about pricing or partnership, or tell us about your CRM. We answer within one working day.',
    },
    name: 'Your name',
    email: 'Work e-mail',
    company: 'Company',
    topic: 'Topic',
    topics: {
      access: 'Request access',
      pricing: 'Pricing',
      reseller: 'Partnership',
      press: 'Press',
      careers: 'Careers',
      other: 'Something else',
    },
    message: 'Message',
    messageHint: 'Your CRM, the number of tenants and where it runs, if you can share it.',
    consent: 'I agree that my details are used to answer this request, as the privacy policy describes.',
    send: 'Send',
    required: 'Required',
    errName: 'Enter your name.',
    errEmail: 'Enter an e-mail address like name@company.com.',
    errMessage: 'Write a few words about your request.',
    errConsent: 'Agree to the use of your details so we can answer.',
    summary: '{n} fields need attention.',
    summaryOne: 'One field needs attention.',
    doneTitle: 'Thank you — the message is with us',
    doneText: 'We will reply to the address you gave within one working day.',
    again: 'Send another message',
    direct: 'Write directly',
    support: 'Support and access',
    legal: 'Legal questions',
    pressMail: 'Press',
  },

  about: {
    head: {
      title: 'Built for owners without a security team',
      lede: `${BRAND} is made by engineers for the owners and CTOs of self-built SaaS CRMs — products with many client tenants and nobody whose job is security.`,
    },
    story: {
      title: 'Why we build it',
      text: [
        'Self-built CRMs carry real customer data and real attacks, yet they rarely tell anyone about either. The usual advice — collect the logs — fails where the logs were never written. The usual product — a cloud service — asks for the data the owner will not hand over.',
        `${BRAND} takes a third way: light collectors that run beside the application and can be reviewed line by line, and the analysis on our side, fed only with allow-listed metadata.`,
      ],
    },
    principles: {
      title: 'How we work',
      items: [
        { title: 'Show why, do not just claim', text: 'Separation of access, the allow-list and the dry run show why data does not leak. The portal shows which protection really works, not “everything is enabled”.' },
        { title: 'Engineering tone', text: 'Calm, specific, no scare stories and no “AI-powered”. Our reader is a technical owner who will check.' },
        { title: 'Name the limits ourselves', text: 'What the product does not do is written on the home page, not in small print.' },
      ],
    },
    status: {
      title: 'Where we are',
      text: 'Before the first commercial launch. We work with our first clients — SaaS CRMs, including a trading platform — on their test environments, and the system will be released whole, when all of it is ready.',
    },
    facts: {
      rules: 'detection rules',
      services: 'services in the system',
      collectors: 'collectors on your side',
    },
    next: 'More about us',
  },

  careers: {
    head: {
      title: 'Join us',
      lede: 'A small team building detection that owners can read. We hire engineers who like to show their work.',
    },
    how: {
      title: 'How we work',
      items: [
        'Every collector is a repository a client can review — we write code we are not ashamed to show.',
        'Rules are judged by what they catch on real traffic profiles, not by how many there are.',
        'Remote, with overlapping hours for the people who work together.',
      ],
    },
    rolesTitle: 'Open roles',
    roles: [
      { title: 'Detection engineer', text: 'Design and tune rules for account takeover, privilege escalation and exfiltration; own their thresholds and noise.', where: 'Remote' },
      { title: 'Backend engineer', text: 'Intake, deduplication and the rules engine on our side; performance and tenant isolation in the access layer.', where: 'Remote' },
      { title: 'Front-end engineer', text: 'The client portal: incident cards, coverage and reports that a non-engineer understands.', where: 'Remote' },
    ],
    apply: 'Apply',
    none: 'No role that fits? Write to us anyway and say what you would build.',
  },

  press: {
    head: {
      title: 'From the media',
      lede: `Everything a journalist needs to write about ${BRAND}. For interviews and comments, write to the press address below.`,
    },
    about: {
      title: `About ${BRAND}`,
      text: `${BRAND} is a threat detection system for self-built multi-tenant SaaS CRMs. It sees what happens inside the CRM — account takeover, insider actions, privilege escalation, bulk data export and attacks on the web perimeter — without taking client data out of the client’s infrastructure. Light collectors run on the client’s side; the analysis runs on ours and receives only allow-listed metadata.`,
    },
    factsTitle: 'Key facts',
    facts: [
      '34 detection rules in seven groups, without machine learning',
      'Three collectors on the client side, each a reviewable repository',
      'About 1.9 ms of WAF analysis per request, measured on a test stand',
      'Alerts in Telegram and the client portal; weekly and monthly reports',
      'Status: before the first commercial launch',
    ],
    logoTitle: 'Logo',
    logoText: 'Use the logo as it is, on a dark or light ground, with clear space around it.',
    logoDark: 'Logo for dark grounds (SVG)',
    logoLight: 'Logo for light grounds (SVG)',
    contactTitle: 'Press contact',
    contactText: 'We answer journalists within one working day.',
  },

  faqPage: {
    head: {
      title: 'Frequently asked questions',
      lede: 'Short answers. Anything missing — ask us directly.',
    },
    more: 'Still have a question?',
  },

  resellers: {
    head: {
      title: 'Become a reseller',
      lede: `For hosts running several CRM companies behind one entrance, and for integrators who build and maintain CRMs for others.`,
    },
    who: {
      title: 'Who it is for',
      items: [
        { title: 'Hosting providers', text: 'One gateway, many CRM companies, each with its own database and domains. One WAF serves the whole entrance; each company gets its own connector and keys.' },
        { title: 'Integrators and studios', text: 'You build or maintain CRMs for clients who have no security team. Add detection without touching their code or schema.' },
      ],
    },
    gets: {
      title: 'What you get',
      items: [
        'Partner terms agreed individually, by the size of your base',
        'A pilot on one of your companies, set up with our team',
        'A separate portal and reports for each company you serve',
        'Traffic split by domain before analysis — one company’s events go only to its connector',
      ],
    },
    steps: {
      title: 'How to start',
      items: [
        { title: 'Tell us about your setup', text: 'How many companies, one gateway or several, where it runs.' },
        { title: 'Run a pilot', text: 'We install on one company together and tune the rules on its data.' },
        { title: 'Roll out', text: 'Add companies one connector at a time.' },
      ],
    },
    apply: 'Apply to partner',
  },

  legal: {
    updated: 'Last updated: October 1, 2026',
    contents: 'On this page',
  },

  siteMap: {
    head: {
      title: 'Site map',
      lede: 'Every page of the site.',
    },
    main: 'Main',
    legalGroup: 'Legal',
    home: 'Home',
  },

  notFound: {
    title: 'This page is not here',
    lede: 'The address may be mistyped, or the page has moved.',
    home: 'Back to the home page',
  },

  ui: {
    skip: 'Skip to content',
    error: 'Data is unavailable right now.',
    retry: 'Try again',
    language: 'Language',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    menu: 'Menu',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    pause: 'Pause',
  },
};
