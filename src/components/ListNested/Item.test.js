import React from 'react';
import renderer from 'react-test-renderer';
import Item from './Item';

describe('Item', () => {
  it('Returns an empty string on missing input', () => {
    const tree = renderer.create(<Item />).toJSON();
    expect(tree).toBe('');
  });

  it('Can handle single item case', () => {
    const props = {
      id: 'test',
      item: { href: '#', title: 'test', external: false },
    };
    const tree = renderer.create(<Item {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can handle nested item case', () => {
    const props = {
      id: 'test',
      item: {
        href: '#',
        title: 'first level',
        external: false,
        nested: { href: '#', title: 'second level', external: false },
      },
    };
    const tree = renderer.create(<Item {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can handle nested item case: 3 levels', () => {
    const props = {
      id: 'test',
      item: {
        href: '#',
        title: 'first level',
        external: false,
        nested: {
          href: '#',
          title: 'second level',
          external: false,
          another: { href: '#', title: 'third level', external: false },
        },
      },
    };
    const tree = renderer.create(<Item {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
