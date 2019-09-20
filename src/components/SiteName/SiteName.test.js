import React from 'react';
import renderer from 'react-test-renderer';
import SiteName from './SiteName';

describe('SiteName', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SiteName />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
