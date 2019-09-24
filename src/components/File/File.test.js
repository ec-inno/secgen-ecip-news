import React from 'react';
import renderer from 'react-test-renderer';

import File from './File';

describe('File', () => {
  it('no input: returns an empty string', () => {
    const tree = renderer.create(<File />).toJSON();
    expect(tree).toBe('');
  });

  it('renders correctly provided an input', () => {
    const props = {
      file: {
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const tree = renderer.create(<File {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
