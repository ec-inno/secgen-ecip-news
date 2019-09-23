import React from 'react';
import renderer from 'react-test-renderer';

import * as OverlayContext from '../../context/Overlay';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  it('renders correctly', () => {
    jest.spyOn(OverlayContext, 'useOverlayContext').mockImplementation(() => ({
      overlayIsHidden: true,
      setOverlayIsHidden: () => true,
    }));

    const props = {
      href: '#',
      name: 'English',
      code: 'en',
    };

    const tree = renderer.create(<LanguageSelector {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
