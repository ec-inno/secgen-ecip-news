import React from 'react';
import renderer from 'react-test-renderer';

import { defaultLangKey } from '../../../languages';
import Footer from './Footer';

describe('Footer', () => {
  let data = {};

  beforeAll(() => {
    data = require(`./data/${defaultLangKey}.json`);
  });

  it('renders correctly given default language data', () => {
    const tree = renderer.create(<Footer {...data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
