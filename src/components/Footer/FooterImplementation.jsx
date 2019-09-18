import React, { useContext } from 'react';

import I18nContext from '../../context/I18n';

// ECL native component.
import Footer from './Footer';

const FooterLanguage = () => {
  const { locale } = useContext(I18nContext);
  const data = require(`./data/${locale}.json`);

  return <Footer className="ecl-footer--custom" {...data} />;
};

export default FooterLanguage;
