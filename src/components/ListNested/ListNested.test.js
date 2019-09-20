import React from 'react';
import renderer from 'react-test-renderer';
import ListNested from './ListNested';

describe('ListNested', () => {
  it('Returns an empty string on missing input', () => {
    const tree = renderer.create(<ListNested />).toJSON();
    expect(tree).toBe('');
  });
});
