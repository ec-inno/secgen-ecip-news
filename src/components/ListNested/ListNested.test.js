import React from 'react';
import renderer from 'react-test-renderer';
import ListNested from './ListNested';

describe('ListNested', () => {
  it('Returns an empty string on missing input', () => {
    const tree = renderer.create(<ListNested />).toJSON();
    expect(tree).toBe('');
  });

  it('Rendered output is sorted alphabetically', () => {
    const list = {
      faq: {
        href: '/en/faq',
        title: 'FAQ',
        external: false,
      },
      Home: {
        href: '/en',
        title: 'Home',
        external: false,
      },
      'how-it-works': {
        href: '/en/how-it-works',
        title: 'How it works',
        external: false,
        'data-protection': {
          href: '/en/how-it-works/data-protection',
          title: 'Data protection',
          external: false,
        },
      },
      'how-to-start': {
        href: '/en/how-to-start',
        title: 'How to start an initiative',
        external: false,
        competences: {
          href: '/en/how-to-start/competences',
          title: "Can your idea be a citizens' initiative?",
          external: false,
        },
      },
      'find-initiative': {
        href: '/en/find-initiative',
        title: 'Find initiative',
        external: false,
      },
    };
    const tree = renderer.create(<ListNested list={list} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
