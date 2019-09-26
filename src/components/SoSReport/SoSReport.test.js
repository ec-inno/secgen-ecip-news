import React from 'react';
import renderer from 'react-test-renderer';

import SoSReport from './SoSReport';

describe('SoSReport', () => {
  it('no input: returns an empty string', () => {
    const tree = renderer.create(<SoSReport />).toJSON();
    expect(tree).toBe('');
  });

  it('requires more than 1 signature by totalSignatures: case 0', () => {
    const props = {
      submission: {
        totalSignatures: 0,
      },
    };

    const tree = renderer.create(<SoSReport {...props} />).toJSON();
    expect(tree).toBe('');
  });

  it('requires more than 1 signature by totalSignatures: case 1', () => {
    const props = {
      submission: {
        totalSignatures: 1,
      },
    };

    const tree = renderer.create(<SoSReport {...props} />).toJSON();
    expect(tree).toBe('');
  });

  it('renders signatures information when greater than 1 by totalSignatures', () => {
    const props = {
      submission: {
        totalSignatures: 2,
      },
    };

    const tree = renderer.create(<SoSReport {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders entries when provided', () => {
    const props = {
      submission: {
        entry: [
          {
            countryCodeType: 'BG',
            total: 12598,
            afterSubmission: false,
          },
          {
            countryCodeType: 'DK',
            total: 4610,
            afterSubmission: false,
          },
        ],
      },
    };

    const tree = renderer.create(<SoSReport {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
