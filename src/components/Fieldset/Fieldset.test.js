import React from 'react';
import renderer from 'react-test-renderer';
import Fieldset from './Fieldset';

describe('Fieldset', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Fieldset />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
