import React from 'react';
import renderer from 'react-test-renderer';
import Item from './Item';

describe('Item', () => {
  it('Returns an empty string on missing input', () => {
    const tree = renderer.create(<Item />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
