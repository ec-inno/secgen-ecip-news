import React from 'react';
import renderer from 'react-test-renderer';
import Accordion2Item from './Accordion2Item';

describe('Accordion2Item', () => {
  const props = {
    id: 'accordion-item-test',
    children: 'test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Accordion2Item {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
