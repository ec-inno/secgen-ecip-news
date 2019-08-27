import React from 'react';

import useTranslations from '../utils/useTranslations';

const SiteName = () => {
  const translation = useTranslations('sitename');
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
