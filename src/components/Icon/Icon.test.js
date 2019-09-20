import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './Icon';

describe('Icon', () => {
  it('renders correctly', () => {
    const props = { shape: 'ui-download' };
    const tree = renderer.create(<Icon {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
