import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useTranslations from '../../utils/useTranslations';

import Icon from '../Icon';

const Counter = () => {
  const translation = useTranslations('counter');

  const { GATSBY_SITE_BASE_URL: api } = process.env;

  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(`${api}/${language}/api/counters`)
      .then(data => {
        setStats(data);
      })
      .catch(e => {
        console.error(`Failed to fetch initiatives statistics`, e);
      });
  }, [language]);

  return (
    <p className="ecl-u-type-paragraph ecl-u-mt-l ecl-u-d-flex ecl-u-justify-content-between">
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--file" />
        {stats.requests ? stats.requests : '...'}{' '}
        {translation.registration_requests}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="general--edit" />
        {stats.registered ? stats.registered : '...'}{' '}
        {translation.initiatives_registered}
      </span>
      <span className="ecl-u-d-flex ecl-u-align-items-center">
        <Icon className="ecl-u-mr-xs" shape="ui--check-filled" />
        {stats.successful ? stats.successful : '...'}{' '}
        {translation.successful_initiatives}
      </span>
    </p>
  );
};

export default Counter;
