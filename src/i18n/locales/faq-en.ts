import { BRAND, SVC } from '../../brand';

export const faqEn = {
  items: [
    {
      q: `What is ${BRAND}?`,
      a: `${BRAND} is a threat detection system for self-built multi-tenant SaaS CRMs. It catches account takeover, insider actions, privilege escalation, bulk data export and attacks on the web perimeter, and shows the owner what happened and what to do. It is not a WAF: the WAF is one of seven services and one source of events among many.`,
    },
    {
      q: 'Who is it for?',
      a: 'Owners and CTOs of self-built or self-hosted SaaS CRMs with many client tenants and no security team of their own — especially where the application says little about itself: no journal of failed sign-ins, no session identifier, an incomplete audit. Hosts running several CRM companies behind one gateway too.',
    },
    {
      q: 'Does it work with Salesforce or HubSpot?',
      a: 'No. Large SaaS CRMs are covered by their vendors and by posture products built on top of them. We build for self-built CRMs, on purpose.',
    },
    {
      q: 'What leaves our infrastructure?',
      a: 'Only fields from an explicit allow-list, as metadata over HTTPS. Request bodies, free text, the raw User-Agent, session identifiers and tokens never leave — only fingerprints of the last three. The one deliberate exception is the evidence of a WAF hit, with credentials masked; you can turn it off.',
    },
    {
      q: 'How do we check that?',
      a: `${SVC}-connector has its own password-protected local page: a journal of what was sent after the allow-list, the status of the sources and a dry run — paste a record and see what would leave.`,
    },
    {
      q: 'What does installation involve?',
      a: 'Three containers, each configured by one YAML file — a ConfigMap in Kubernetes. No agents in your code, no changes to the database schema, no message broker.',
    },
    {
      q: 'Will it slow our application down?',
      a: `${SVC}-tap reads traffic beside the application and is never in the request path; if something is wrong with it, it waits and logs the reason instead of taking the pod down. WAF analysis costs about 1.9 ms per request on our test stand.`,
    },
    {
      q: 'Does it block attacks?',
      a: 'No. It alerts in Telegram and the portal; it does not block addresses, sign people out or disable users. Semi-automatic and automatic modes are planned.',
    },
    {
      q: 'When do behavioural rules start working?',
      a: 'They need history, so a new client gets hard alerts — WAF, privileges, posture — for the first two weeks. If you have a sign-in journal, history can be loaded from it to shorten that.',
    },
    {
      q: 'Where do alerts arrive?',
      a: 'In Telegram and in the client portal. Each recipient filters by severity and by rule. E-mail and Slack are not supported yet.',
    },
  ],
};
