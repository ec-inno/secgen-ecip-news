import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders correctly', () => {
    const props = { id: 'foo' };
    const tree = renderer.create(<TextInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
