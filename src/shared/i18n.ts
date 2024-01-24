import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      'order-type-title-1': '매장식사 또는',
      'order-type-title-2': '포장을 선택해 주세요.',
      'order-type-store': '먹고 갈게요',
      'order-type-togo': '포장 할게요',
    },
  },
  en: {
    translation: {
      'order-type-title-1': 'Please choose',
      'order-type-title-2': 'store meal or takeout',
      'order-type-store': 'Eat it at the store',
      'order-type-togo': 'Wrap it up',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
