import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';

describe('Card', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays support link when target is provided', () => {
    const tree = renderer.create(<Card supportLink="#" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
