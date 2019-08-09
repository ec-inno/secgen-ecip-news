import React from 'react';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import Icon from '../Icon';

const Counter = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/counter/${language}.json`);

  return (
    <p className="ecl-u-type-paragraph ecl-u-mt-l ecl-u-d-flex ecl-u-justify-content-between">
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--file" />
        ... {translation.registration_requests}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--edit" />
        ... {translation.initiatives_registered}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="ui--check-filled" />
        ... {translation.successful_initiatives}
      </span>
    </p>
  );
};

export default Counter;
