import { useContext } from 'react';

import I18nContext from '../context/I18n';

const useTranslations = component => {
  const { locale } = useContext(I18nContext);

  /* eslint-disable-next-line */
  const translations = require(`../../translations/${component}/${locale}.json`);

  return translations;
};

export default useTranslations;
