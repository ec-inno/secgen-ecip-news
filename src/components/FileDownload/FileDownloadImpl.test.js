import React from 'react';
import renderer from 'react-test-renderer';

import FileDownloadImpl from './FileDownloadImpl';

describe('FileDownloadImpl', () => {
  it('no input: returns an empty string', () => {
    const tree = renderer.create(<FileDownloadImpl />).toJSON();
    expect(tree).toBe('');
  });

  it('empty object input: returns an empty string', () => {
    const tree = renderer.create(<FileDownloadImpl file={{}} />).toJSON();
    expect(tree).toBe('');
  });

  it('missing id input: returns an empty string', () => {
    const tree = renderer
      .create(<FileDownloadImpl file={{ name: 'test' }} />)
      .toJSON();
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

    const tree = renderer.create(<FileDownloadImpl {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
