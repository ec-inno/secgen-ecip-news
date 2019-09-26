import React from 'react';
import renderer from 'react-test-renderer';
import SeeMore from './SeeMore';

describe('SeeMore', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SeeMore />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
