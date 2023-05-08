import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const resources = {
  en: {
    products: await import('./locale/en/products.json'),
    product: await import('./locale/en/product.json'),
  },
  ar: {
    products: await import('./locale/ar/products.json'),
    product: await import('./locale/ar/product.json'),
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    // resources,
    interpolation: {
      escapeValue: false,
    },
    React: {
      useSuspense: false,
    },
  });

export default i18n;
