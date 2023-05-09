import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    React: {
      useSuspense: false,
    },
    ns: [],
  });

export default i18n;

/*
namespaces:
  https://github.com/chejen/keys-translations-manager/blob/master/public/locale/en-US/translation.json
*/
