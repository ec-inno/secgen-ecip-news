import React from 'react';
import renderer from 'react-test-renderer';

import Counter from './Counter';

describe('Counter', () => {
  it('renders placeholders on lack of statistics', () => {
    const tree = renderer.create(<Counter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders requests when provided', () => {
    const tree = renderer.create(<Counter requests="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders registered when provided', () => {
    const tree = renderer.create(<Counter registered="2" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders successful when provided', () => {
    const tree = renderer.create(<Counter successful="3" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
