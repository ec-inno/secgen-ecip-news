import React from 'react';
import renderer from 'react-test-renderer';
import Accordion2 from './Accordion2';

describe('Accordion2', () => {
  const props = {
    children: 'test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Accordion2 {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
