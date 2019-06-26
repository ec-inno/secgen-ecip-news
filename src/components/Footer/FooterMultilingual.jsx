import React from 'react';

// ECL native component.
import Footer from './Footer';

import data from './data';
import getCurrentLanguage from '../../utils/getCurrentLanguage';

const FooterMultilingual = ({ location }) => {
  const lang = getCurrentLanguage(location);
  const footerData = data[lang];
  return <Footer {...footerData} />;
};

export default FooterMultilingual;
