import React from 'react';

import { useI18nContext } from '@eci/context/I18n';
import { useCountersApi } from '@eci/utils/useCountersApi';

import Counter from './Counter';

const CounterImpl = () => {
  const { locale } = useI18nContext();
  const { response } = useCountersApi(locale);

  if (!response || !response.data) return '';

  return <Counter {...response.data} />;
};

export default CounterImpl;
