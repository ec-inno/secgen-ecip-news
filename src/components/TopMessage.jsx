import React from 'react';

import useTranslations from '../utils/useTranslations';

const TopMessage = () => {
  const translation = useTranslations('topmessage');
  const { message } = translation;

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">{message}</div>
    </div>
  );
};

export default TopMessage;
