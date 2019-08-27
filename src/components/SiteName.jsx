import React from 'react';

import getTranslations from '../utils/getTranslations';

const SiteName = () => {
  const translation = getTranslations('sitename');
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
