import React from 'react';
import renderer from 'react-test-renderer';
import ArrowDD from './ArrowDD';

describe('ArrowDD', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ArrowDD />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
