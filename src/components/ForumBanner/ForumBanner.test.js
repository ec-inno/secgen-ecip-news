import React from 'react';
import renderer from 'react-test-renderer';
import ForumBanner from './ForumBanner';

describe('ForumBanner', () => {
  const props = {
    label: 'test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<ForumBanner {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
