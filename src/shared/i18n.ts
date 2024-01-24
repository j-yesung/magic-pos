import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// load translation using http -> see /public/locales
import Backend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: 'ko',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
