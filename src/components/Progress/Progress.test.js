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

    expect(tree[1].type).toBe('ol');
    expect(tree[1].children[0]).toMatchSnapshot(); // Registered
    expect(tree[1].children[1]).toMatchSnapshot(); // Ongoing
  });

  it('input of dates: renders them below timeline', () => {
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
      dateStart: '11/08/2019',
      dateEnd: '09/09/2020',
    };

    const tree = renderer.create(<Progress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
