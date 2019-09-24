import React from 'react';
import renderer from 'react-test-renderer';

import Funding from './Funding';

describe('Funding', () => {
  it('no input: returns an empty string', () => {
    const tree = renderer.create(<Funding />).toJSON();
    expect(tree).toBe('');
  });

  it('can render only lastUpdate', () => {
    const props = {
      funding: {
        lastUpdate: 'last update string',
      },
    };

    const tree = renderer.create(<Funding {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can render only totalAmount', () => {
    const props = {
      funding: {
        totalAmount: 100,
      },
    };

    const tree = renderer.create(<Funding {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not render totalAmount when zero', () => {
    const props = {
      funding: {
        totalAmount: 0,
      },
    };

    const tree = renderer.create(<Funding {...props} />).toJSON();
    expect(tree).toBe('');
  });

  it('Renders a file section when document property is present', () => {
    const props = {
      funding: {
        document: {
          id: 16806,
          name: 'DummyMemberDoc1.txt',
          mimeType: 'text/plain',
          size: 10,
        },
      },
    };

    const tree = renderer.create(<Funding {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders a table when sponsors', () => {
    const props = {
      funding: {
        sponsors: [
          {
            name: 'foo',
            date: 'now',
            amount: 1,
          },
          {
            name: 'bar',
            date: 'then',
            amount: 2,
          },
          {
            name: 'baz',
            date: 'never',
            amount: 3,
          },
        ],
      },
    };

    const tree = renderer.create(<Funding {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
