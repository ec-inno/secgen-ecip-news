import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '@eci/context/I18n';
import * as useCountersApi from '@eci/utils/useCountersApi';
import CounterImpl from './CounterImpl';

describe('CounterImpl', () => {
  it('does not show on lack of data', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
    }));

    jest.spyOn(useCountersApi, 'useCountersApi').mockImplementation(() => ({
      response: {},
    }));

    const tree = renderer.create(<CounterImpl />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can render statistics', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
    }));

    jest.spyOn(useCountersApi, 'useCountersApi').mockImplementation(() => ({
      response: {
        data: {
          requests: '1',
          registered: '2',
          successful: '3',
        },
      },
    }));

    const tree = renderer.create(<CounterImpl />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
