import React from 'react';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

const SiteName = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const translation = require(`../../translations/sitename/${language}.json`);
  const { european, citizens, initiative } = translation;

  return (
    <div className="ecl-container ecl-u-pb-m ecl-u-type-xl ecl-u-type-bold">
      <span>{european}</span>
      <span className="ecl-u-ml-2xs">{citizens}</span>
      <span className="ecl-u-ml-2xs">{initiative}</span>
    </div>
  );
};

export default SiteName;
