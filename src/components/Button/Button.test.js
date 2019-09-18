import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  const props = {
    label: 'test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Button {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
