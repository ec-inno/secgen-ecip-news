import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18next-node-fs-backend is not used because this file is imported and transpiled through Webpack.
import resources from './resources';

import { defaultLangKey } from '../languages';

// @see https://www.i18next.com/overview/configuration-options#configuration-options
i18.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  resources,
  fallbackLng: defaultLangKey,
  load: 'languageOnly',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18;
