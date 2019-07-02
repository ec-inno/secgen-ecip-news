const axios = require('axios');
const deepmerge = require('deepmerge');

const computeId = require('./lib/computeId');
// Remove starting @ signs at important object keys.
const deepRename = require('./lib/deepRename');

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

    // Gather information from service.
    const initiatives = await Promise.all(
      initiativesBasic.map(async basic => {
        const year = basic['@year'];
        const number = basic['@number'];

        if (year && number) {
          const result = await axios.get(
            `${endpoint}/details/${year}/${number}`
          );
          const { initiative: additional } = result.data;

          return {
            year,
            number,
            ...basic,
            ...additional,
          };
        }

        return basic;
      })
    );

    // Create content in Gatsby.js.
    return initiatives.map(initiative => {
      deepRename(initiative);
      const id = computeId(initiative);

      const nodeContent = JSON.stringify(initiative);

      const nodeMeta = {
        id: createNodeId(`initiative-${id}`),
        parent: null,
        children: [],
        internal: {
          type: 'Initiatives',
          content: nodeContent,
          contentDigest: createContentDigest(initiative),
        },
      };

      const node = deepmerge(initiative, nodeMeta);

      // Create content in Gatsby.
      createNode(node);
    });
  } catch (error) {
    reporter.error(error);
  }
};
