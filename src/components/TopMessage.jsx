import React from 'react';

import getTranslations from '../utils/getTranslations';

const TopMessage = () => {
  const translation = getTranslations('topmessage');
  const { message } = translation;

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">{message}</div>
    </div>
  );
};

export default TopMessage;
