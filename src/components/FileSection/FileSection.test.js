import React from 'react';
import renderer from 'react-test-renderer';

import FileSection from './FileSection';

describe('FileSection', () => {
  it('returns an empty if no input', () => {
    const tree = renderer.create(<FileSection />).toJSON();
    expect(tree).toBe('');
  });

  it('renders only the file part when no title', () => {
    const props = {
      file: {
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const tree = renderer.create(<FileSection {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders title when provided', () => {
    const props = {
      title: 'Section title',
      file: {
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const tree = renderer.create(<FileSection {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
