import React from 'react';

import data from './data';

const TopMessage = ({ currentLanguage }) => {
  const message = data[currentLanguage];

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">{message}</div>
    </div>
  );
};

export default TopMessage;
