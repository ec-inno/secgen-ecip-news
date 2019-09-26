import React from 'react';
import renderer from 'react-test-renderer';
import Meta from './Meta';

describe('Meta', () => {
  it('returns an empty string on empty input', () => {
    const tree = renderer.create(<Meta />).toJSON();
    expect(tree).toBe('');
  });

  it('renders correctly given a non-empty input', () => {
    const props = {
      status: 'test',
      registrationNumber: 'test',
      deadline: 'test',
      dateRefusal: 'test',
      dateRegistration: 'test',
      supportLink: 'test',
    };

    const tree = renderer.create(<Meta {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
