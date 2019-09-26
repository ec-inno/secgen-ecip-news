import React from 'react';
import renderer from 'react-test-renderer';
import Members from './Members';

describe('Members', () => {
  it('renders an empty string on missing input', () => {
    const tree = renderer.create(<Members />).toJSON();
    expect(tree).toBe('');
  });

  it('respects privacyApplied flag', () => {
    const props = {
      members: [
        {
          type: 'MEMBER',
          fullName: 'John DOE',
          privacyApplied: false,
        },
        {
          type: 'MEMBER',
          fullName: 'Jane DOE',
          privacyApplied: true,
        },
      ],
    };

    const tree = renderer.create(<Members {...props} />).toJSON();
    const list = tree[1].children.filter(m => m);

    expect(tree[1].type).toBe('ul');
    expect(list.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  it('Handles members of the following types: REPRESENTATIVE, SUBSTITUTE, MEMBER, LEGAL_ENTITY, OTHER, DPO', () => {
    const props = {
      members: [
        {
          type: 'REPRESENTATIVE',
          fullName: 'John REPRESENTATIVE',
          privacyApplied: false,
        },
        {
          type: 'SUBSTITUTE',
          fullName: 'John SUBSTITUDE',
          privacyApplied: false,
        },
        {
          type: 'MEMBER',
          fullName: 'John MEMBER',
          privacyApplied: false,
        },
        {
          type: 'LEGAL_ENTITY',
          fullName: 'John LEGAL_ENTITY',
          privacyApplied: false,
        },
        {
          type: 'OTHER',
          fullName: 'John OTHER',
          privacyApplied: false,
        },
        {
          type: 'DPO',
          fullName: 'John DPO',
          privacyApplied: false,
        },
      ],
    };

    const tree = renderer.create(<Members {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
