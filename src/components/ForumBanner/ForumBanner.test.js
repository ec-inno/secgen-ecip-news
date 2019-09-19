import React from 'react';
import renderer from 'react-test-renderer';
import ForumBanner from './ForumBanner';

describe('ForumBanner', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ForumBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
