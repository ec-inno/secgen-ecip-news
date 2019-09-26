import React from 'react';
import renderer from 'react-test-renderer';
import Select from './Select';

describe('Select', () => {
  it('renders correctly', () => {
    const props = { id: 'foo' };
    const tree = renderer.create(<Select {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
