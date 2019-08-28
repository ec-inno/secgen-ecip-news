import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultLangKey } from '../languages';
import resources from '../locale/resources';

// @see https://react.i18next.com/guides/quick-start#configure-i-18-next
i18.use(initReactI18next).init({ resources, fallbackLng: defaultLangKey });

export default i18;
