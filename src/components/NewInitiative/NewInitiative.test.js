import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '@eci/context/I18n';
import NewInitiative from './NewInitiative';

describe('NewInitiative', () => {
  it('renders correctly', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
    }));

    const tree = renderer.create(<NewInitiative />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
