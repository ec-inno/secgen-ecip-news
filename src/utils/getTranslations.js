import React from 'react';

import { LocaleContext } from '../layouts';

function useTranslations(component) {
  const { locale } = React.useContext(LocaleContext);

  const translations = require(`../../translations/${component}/${locale}.json`);

  return translations;
}

export default useTranslations;
