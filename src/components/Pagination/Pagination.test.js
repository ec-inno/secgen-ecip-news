import React from 'react';
import renderer from 'react-test-renderer';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('Returns null on empty input', () => {
    const tree = renderer.create(<Pagination />).toJSON();
    expect(tree).toBe(null);
  });

  it('Renders list items', () => {
    const props = {
      label: 'test',
      items: [{ label: '1', href: '#1', label: 'Page 1' }],
    };
    const tree = renderer.create(<Pagination {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
