import { BRAND, HOST, LEGAL_EMAIL } from '../../brand';

export const legalEn = {
  privacy: {
    title: 'Privacy policy',
    lede: `How the ${BRAND} website at ${HOST} handles personal data. The ${BRAND} product has its own data-processing terms, agreed with each client.`,
    sections: [
      {
        title: 'Who is responsible',
        body: [
          `This website is operated by ${BRAND}. For any question about your personal data, write to ${LEGAL_EMAIL}.`,
        ],
      },
      {
        title: 'What we collect',
        body: [
          'When you send the contact form: your name, work e-mail, company, the topic you chose and your message.',
          'When you browse: the technical data any web server receives — your IP address, browser type and the pages requested — kept in server logs.',
          'We do not use advertising trackers, and we do not buy or sell personal data.',
        ],
      },
      {
        title: 'Why we use it',
        body: [
          'To answer your request and, if you asked for access, to arrange it. The legal basis is your consent and our legitimate interest in answering the people who write to us.',
          'Server logs are used to keep the site running and secure.',
        ],
      },
      {
        title: 'How long we keep it',
        body: [
          'Messages from the contact form are kept for as long as the conversation lasts and up to 24 months after it ends. Server logs are kept for up to 30 days.',
        ],
      },
      {
        title: 'What stays in your browser',
        body: [
          'The site remembers your language and theme in your browser’s local storage. Nothing else is stored, and nothing is sent to us from there. The cookie policy has the details.',
        ],
      },
      {
        title: 'Who else sees it',
        body: [
          'Our hosting provider processes server logs on our behalf. Fonts are loaded from Google Fonts, which receives your IP address when the page loads. We do not share your data with anyone else, unless the law requires it.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          `You can ask to see, correct or delete your data, to restrict or object to its use, and to take it with you. Write to ${LEGAL_EMAIL}; we answer within 30 days. You can also complain to your data protection authority.`,
        ],
      },
      {
        title: 'Changes',
        body: [
          'When this policy changes, the date at the top changes with it.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    lede: `The terms for using the ${BRAND} website. Use of the ${BRAND} product is governed by a separate agreement with each client.`,
    sections: [
      {
        title: 'Acceptance',
        body: [
          'By using this website you accept these terms. If you do not accept them, please do not use the site.',
        ],
      },
      {
        title: 'What the site is',
        body: [
          `The site describes the ${BRAND} product and lets you contact the team. Figures on it come from our test stand and describe the product as it is today; they are not a guarantee of results in your environment.`,
        ],
      },
      {
        title: 'Intellectual property',
        body: [
          `The text, design, logo and code of this site belong to ${BRAND}. You may quote and link to it; the press kit may be used to write about ${BRAND}. Anything else needs our written permission.`,
        ],
      },
      {
        title: 'Acceptable use',
        body: [
          'Do not try to break, overload or scan the site, to reach parts of it not meant for the public, or to use it to send unsolicited messages.',
        ],
      },
      {
        title: 'Links to other sites',
        body: [
          'Links to other sites are given for convenience; we are not responsible for their content.',
        ],
      },
      {
        title: 'Liability',
        body: [
          'The site is provided as it is. To the extent the law allows, we are not liable for losses arising from its use or from a period when it is unavailable.',
        ],
      },
      {
        title: 'Changes and contact',
        body: [
          `We may change these terms; the date at the top shows the current version. Questions: ${LEGAL_EMAIL}.`,
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie policy',
    lede: `What the ${BRAND} website keeps in your browser, and why.`,
    sections: [
      {
        title: 'No tracking cookies',
        body: [
          'The site sets no advertising or analytics cookies, and shows no cookie banner because there is nothing to consent to.',
        ],
      },
      {
        title: 'What is stored',
        body: [
          'Two values in your browser’s local storage: the language you chose and the theme, light or dark. They stay in your browser and are not sent to us.',
        ],
      },
      {
        title: 'Third parties',
        body: [
          'Fonts are loaded from Google Fonts. Google receives your IP address when the page loads and may apply its own policies.',
        ],
      },
      {
        title: 'How to clear it',
        body: [
          'Clear the site data for this address in your browser’s settings. The site will then open in the default language and theme.',
        ],
      },
    ],
  },
};
