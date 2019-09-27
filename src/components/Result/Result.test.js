import React from 'react';
import renderer from 'react-test-renderer';
import Result from './Result';

describe('Result', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Result />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
