import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import I18nContext from '../../context/I18n';

import Icon from '../Icon';

const Counter = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { GATSBY_SITE_BASE_URL: api } = process.env;

  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(`${api}/${locale}/api/counters`)
      .then(data => setStats(data))
      .catch(e => {
        console.error(t('Failed to fetch initiatives statistics'), e);
      });
  }, [locale]);

  return (
    <p className="ecl-u-type-paragraph ecl-u-mt-l ecl-u-d-flex ecl-u-justify-content-between">
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--file" />
        {stats.requests ? stats.requests : '...'} {t('registration requests')}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--edit" />
        {stats.registered ? stats.registered : '...'}{' '}
        {t('initiatives registered')}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="ui--check-filled" />
        {stats.successful ? stats.successful : '...'}{' '}
        {t('successful initiatives')}
      </span>
    </p>
  );
};

export default Counter;
