import React from 'react';
import renderer from 'react-test-renderer';
import Video from './Video';

describe('Video', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Video />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
