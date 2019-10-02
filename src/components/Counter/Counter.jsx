import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';

const Counter = ({ requests, registered, successful }) => {
  const { t } = useTranslation();

  return (
    <p className="ecl-u-type-paragraph ecl-u-mt-l ecl-u-d-flex ecl-u-justify-content-between">
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--file" />
        {requests ? requests : '...'} {t('registration requests')}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--edit" />
        {registered ? registered : '...'} {t('initiatives registered')}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="ui--check-filled" />
        {successful ? successful : '...'} {t('successful initiatives')}
      </span>
    </p>
  );
};

Counter.propTypes = {
  requests: PropTypes.string,
  registered: PropTypes.string,
  successful: PropTypes.string,
};

export default Counter;
