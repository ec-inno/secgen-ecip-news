import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '../../context/I18n';
import * as OverlayContext from '../../context/Overlay';
import Header from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: { pathname: '/en/how-it-works' },
    }));

    jest.spyOn(OverlayContext, 'useOverlayContext').mockImplementation(() => ({
      overlayIsHidden: true,
      setOverlayIsHidden: () => true,
    }));

    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
