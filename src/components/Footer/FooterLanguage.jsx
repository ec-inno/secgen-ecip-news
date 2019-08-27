import React from 'react';

import useTranslations from '../../utils/useTranslations';

// ECL native component.
import Footer from './Footer';

const FooterLanguage = () => {
  const translation = useTranslations('footer');

  return <Footer className="ecl-footer--custom" {...translation} />;
};

export default FooterLanguage;
