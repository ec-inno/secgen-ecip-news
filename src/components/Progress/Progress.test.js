import React from 'react';
import renderer from 'react-test-renderer';

import Progress from './Progress';

describe('Progress utilities', () => {
  it('steps supported are public', () => {
    const { steps } = require('./utils');
    expect(steps).not.toBe(undefined);
    expect(Array.isArray(steps)).toBe(true);
    expect(steps.length > 0).toBe(true);
    expect(steps).toMatchSnapshot();
  });

  it('contains information about collection start and early closure dates in specific places', () => {
    const { steps } = require('./utils');
    expect(steps[1]).toBe('COLLECTION_START_DATE');
    expect(steps[3]).toBe('COLLECTION_EARLY_CLOSURE');
  });

  it('getStages() reorders items if not in correct order', () => {
    const progress = [
      {
        name: 'ONGOING',
        active: true,
        date: '09/09/2019',
      },
      {
        name: 'REGISTERED',
        active: false,
        date: '11/08/2019',
      },
    ];
    const { getStages } = require('./utils');

    const stages = getStages(progress);
    expect(stages[0].name).toBe('REGISTERED');
    expect(stages[1].name).toBe('ONGOING');
  });
});

describe('Progress', () => {
  it('no input: provides feedback for unsupported timeline', () => {
    const tree = renderer.create(<Progress />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders timeline in right order regardless of input order', () => {
    const props = {
      progress: [
        {
          name: 'ONGOING',
          active: true,
          date: '09/09/2019',
        },
        {
          name: 'REGISTERED',
          active: false,
          date: '11/08/2019',
        },
      ],
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('collection start date can be passed as a parameter', () => {
    const props = {
      progress: [
        {
          name: 'ONGOING',
          active: true,
          date: '09/09/2019',
        },
        {
          name: 'REGISTERED', // Yes, spec says this step will be given conditionally, but we still add it to ensure registration start date comes right after registration.
          active: false,
          date: '11/08/2019',
        },
      ],
      dateCollectionStart: '11/08/2019',
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('collection start date can be passed as a step', () => {
    const props = {
      progress: [
        {
          name: 'ONGOING',
          active: true,
          date: '09/09/2019',
        },
        {
          name: 'REGISTERED',
          active: false,
          date: '11/08/2019',
        },
        {
          name: 'COLLECTION_START_DATE',
          active: false,
          date: '22/09/2019',
        },
      ],
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('collection early closure date can be passed as a parameter', () => {
    const props = {
      progress: [
        {
          name: 'ONGOING',
          active: true,
          date: '09/09/2019',
        },
        {
          name: 'REGISTERED',
          active: false,
          date: '11/08/2019',
        },
      ],
      dateCollectionEarlyClosure: '11/08/2019',
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('collection early closure date can be passed as a step', () => {
    // Sample props are not to be passed like this from the service, but we double-check rendered order.
    const props = {
      progress: [
        {
          name: 'ONGOING',
          active: true,
          date: '09/09/2019',
        },
        {
          name: 'CLOSED',
          active: false,
          date: '11/08/2019',
        },
        {
          name: 'COLLECTION_EARLY_CLOSURE',
          active: false,
          date: '11/08/2019',
        },
      ],
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
