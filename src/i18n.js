import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';

// @see https://react.i18next.com/guides/quick-start#configure-i-18-next
const resources = {
  en: {
    translation: {
      'An official website of the European union':
        'An official website of the European union',
    },
  },
  bg: {
    translation: {
      'An official website of the European union':
        'An official website of the European union (bg)',
    },
  },
  fr: {
    translation: {
      'An official website of the European union':
        'An official website of the European union (fr)',
    },
  },
};

i18.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

export default i18;
