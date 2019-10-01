import React from 'react';
import renderer from 'react-test-renderer';
import * as I18nContext from '@eci/context/I18n';
import Refusal from './Refusal';

describe('Requirements', () => {
  it('messages.json is present', () => {
    const messages = require('./messages.json');
    expect(messages).not.toBe(undefined);
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length > 0).toBe(true);
  });

  it('supported reasons are public', () => {
    const { reasonsSupported } = require('./utils');
    expect(reasonsSupported).not.toBe(undefined);
    expect(Array.isArray(reasonsSupported)).toBe(true);
    expect(reasonsSupported.length > 0).toBe(true);
    expect(reasonsSupported).toMatchSnapshot();
  });
});

describe('Refusal', () => {
  it('returns an emptry string on empty input', () => {
    const tree = renderer.create(<Refusal />).toJSON();
    expect(tree).toBe('');
  });

  it('returns an emptry string on empty list of reasons', () => {
    const tree = renderer.create(<Refusal reasons={[]} />).toJSON();
    expect(tree).toBe('');
  });

  it('shows a list of reasons when they are in the list of supported reasons', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
    }));

    const tree = renderer
      .create(<Refusal reasons={['reason.action.registration.reject.abuse']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('respects current language through the locale', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'hu',
    }));

    const tree = renderer
      .create(<Refusal reasons={['reason.action.registration.reject.abuse']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
