import React from 'react';
import renderer from 'react-test-renderer';
import TopMessage from './TopMessage';

describe('TopMessage', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TopMessage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
