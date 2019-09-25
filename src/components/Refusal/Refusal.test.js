import React from 'react';
import renderer from 'react-test-renderer';
import Refusal from './Refusal';

describe('Refusal', () => {
  it('returns an emptry string on empty input', () => {
    const tree = renderer.create(<Refusal />).toJSON();
    expect(tree).toBe('');
  });

  it('returns an emptry string on empty list of reasons', () => {
    const tree = renderer.create(<Refusal reasons={[]} />).toJSON();
    expect(tree).toBe('');
  });

  it('shows a list of reasons when they are in the list of unsupported reasons', () => {
    const tree = renderer
      .create(<Refusal reasons={['reason.action.registration.reject.abuse']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
