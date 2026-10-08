import { defineConfig } from './engine/config';
import { en } from './i18n/locales/en';
import { es } from './i18n/locales/es';
import { faqEn } from './i18n/locales/faq-en';
import { faqEs } from './i18n/locales/faq-es';
import { legalEn } from './i18n/locales/legal-en';
import { legalEs } from './i18n/locales/legal-es';

export default defineConfig({
  i18n: {
    defaultLang: 'en',
    languages: [
      { code: 'en', label: 'English', short: 'EN', flag: 'gb' },
      { code: 'es', label: 'Español', short: 'ES', flag: 'es' },
    ],
    dictionaries: {
      en: { ...en, faq: faqEn, legalText: legalEn },
      es: { ...es, faq: faqEs, legalText: legalEs },
    },
  },
  theme: {
    default: 'dark',
    color: { dark: '#050608', light: '#f6f4ef' },
  },
  market: {
    lists: { tape: ['btc'] },
    spark: 'tape',
    series: { ids: ['btc'], days: [1] },
  },
});
