import React from 'react';
import renderer from 'react-test-renderer';

import { FileDownload } from './FileDownload';

describe('FileDownload', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FileDownload />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
