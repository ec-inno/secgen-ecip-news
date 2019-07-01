const axios = require('axios');

// @see https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  { endpoint }
) => {
  const { createNode } = actions;

  reporter.info('ECI Remote service: getting initiatives ...');

  try {
    const allInitiatives = await axios.get(`${endpoint}/get/all`);
    const { initiative: initiativesBasic } = allInitiatives.data;

    const initiativesFull = await Promise.all(
      initiativesBasic.map(async (initiativeMeta, i) => {
        const year = initiativeMeta['@year'];
        const number = initiativeMeta['@number'];

        if (year && number) {
          const result = await axios.get(
            `${endpoint}/details/${year}/${number}`
          );
          const { initiative: additional } = result.data;

          const basic = initiativesBasic[i];

          const initiativeFull = {
            // Copy 2 properties in a more readable way.
            year,
            number,
            ...basic,
            ...additional,
          };

          return initiativeFull;
        }
      })
    );

    return initiativesFull.map(initiative => {
      if (initiative.number) {
        const nodeContent = JSON.stringify(initiative);

        const nodeMeta = {
          id: createNodeId(`initiative-${initiative.number}`),
          parent: null,
          children: [],
          internal: {
            type: 'Initiative',
            content: nodeContent,
            contentDigest: createContentDigest(initiative),
          },
        };

        const node = Object.assign({}, initiative, nodeMeta);
        createNode(node);
      }
    });
  } catch (error) {
    reporter.error(error);
  }
};
