import React from 'react';

import { I18nContext } from '../layouts';

function useTranslations(component) {
  const { locale } = React.useContext(I18nContext);

  const translations = require(`../../translations/${component}/${locale}.json`);

  return translations;
}

export default useTranslations;
