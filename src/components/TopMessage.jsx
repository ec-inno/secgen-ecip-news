import React from 'react';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

const TopMessage = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const data = require(`../data/topmessage/${language}.json`);
  const { message } = data;

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">{message}</div>
    </div>
  );
};

export default TopMessage;
