import React from 'react';

// ECL native component.
import Footer from './Footer';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const FooterLanguage = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const translation = require(`../../../translations/footer/${language}.json`);
  return <Footer className="ecl-footer--custom" {...translation} />;
};

export default FooterLanguage;
