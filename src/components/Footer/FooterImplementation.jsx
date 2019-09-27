import React from 'react';

import { useI18nContext } from '@eci/context/I18n';

// ECL native component.
import Footer from './Footer';

const FooterLanguage = () => {
  const { locale } = useI18nContext();
  const data = require(`./data/${locale}.json`);

  return <Footer className="ecl-footer--custom" {...data} />;
};

export default FooterLanguage;
