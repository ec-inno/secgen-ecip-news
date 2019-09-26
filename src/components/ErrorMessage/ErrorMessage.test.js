import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    const props = { title: 'title', error: { message: 'foo' } };
    const tree = renderer.create(<ErrorMessage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
