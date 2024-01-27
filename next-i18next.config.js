/** @type {import('next-i18next').UserConfig} */
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    backend: {
      // i18next-http-backend options
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    locales: ['ko', 'ja', 'zh', 'en'],
    localePath: path.resolve('./public/locales'),
    localeStructure: '{{lng}}/{{ns}}',
  },
};
