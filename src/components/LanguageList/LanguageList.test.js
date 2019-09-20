import React from 'react';
import renderer from 'react-test-renderer';
import LanguageList from './LanguageList';

describe('LanguageList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LanguageList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
