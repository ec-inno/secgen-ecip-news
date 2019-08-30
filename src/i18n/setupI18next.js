import i18n from 'i18next';
import { defaultLangKey } from '../../languages';

export default () => {
  i18n.init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: defaultLangKey,
    load: 'languageOnly',
    initImmediate: false,
    react: {
      wait: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};
