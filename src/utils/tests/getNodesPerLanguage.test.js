import getNodesPerLanguage from '../getNodesPerLanguage';

describe('getNodesPerLanguage utlity', () => {
  it('returns an empty object on missing input', () => {
    const nodesOrganized = getNodesPerLanguage();
    expect(nodesOrganized).toEqual({});
  });

  it('organizes nodes per language', () => {
    const nodes = [
      {
        node: {
          id: 'api/en/996f8aca-e3dd-5fbd-808a-b499a9497d5d',
          path: {
            langcode: 'en',
          },
        },
      },
      {
        node: {
          id: 'api/bg/996f8aca-e3dd-5fbd-808a-b499a9497d5d',
          path: {
            langcode: 'en',
          },
        },
      },
      {
        node: {
          id: 'api/bg/996f8aca-e3dd-5fbd-808a-b499a9497d5d',
          path: {
            langcode: 'bg',
          },
        },
      },
    ];
    const nodesOrganized = getNodesPerLanguage(nodes, 'en');
    expect(nodesOrganized.en.length).toBe(1);
    expect(nodesOrganized.bg.length).toBe(1);
  });
});
