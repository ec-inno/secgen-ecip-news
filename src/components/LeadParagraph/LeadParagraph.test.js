import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '@eci/context/I18n';
import LeadParagraph from './LeadParagraph';

describe('LeadParagraph', () => {
  it('renders correctly', () => {
    // `Counter` is part of the lead paragraph and needs this context to get `locale`
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: { pathname: '/en' },
    }));

    const props = { text: 'intro', label: 'Call to action', href: '#' };
    const tree = renderer.create(<LeadParagraph {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
