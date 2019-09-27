import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '@eci/context/I18n';
import * as query from './query';
import Menu from './MenuWithData';

describe('Menu', () => {
  it('renders correctly', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: { pathname: '/en' },
    }));

    jest.spyOn(query, 'useQuery').mockImplementation(() => ({
      allMenu: {
        edges: [
          {
            node: {
              menu_name: 'main',
              id: 'api/en/20a954b4-fbcf-5522-bc32-7182b255122d',
              title: 'Home',
              external: false,
              href: '#',
              enabled: true,
              menu_has_parent: false,
            },
          },
        ],
      },
    }));

    const tree = renderer.create(<Menu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
