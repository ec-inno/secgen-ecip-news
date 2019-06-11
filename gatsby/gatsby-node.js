const path = require('path');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'initiatives') {
    // Create a new field on Gatsby side to later store information about translations of a given node.

    createNodeField({
      name: 'translations',
      node,
      value: [],
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    query getAllInitiatives {
      allInitiatives {
        edges {
          node {
            id
            path {
              alias
              langcode
            }
          }
        }
      }
    }
  `).then(result => {
    const { allInitiatives } = result.data;

    allInitiatives.edges.forEach(({ node }) => {
      const { alias, langcode } = node.path;
      // This is to "physically" create separate pages for languages.
      const pathInGatsby = `${langcode}${alias}`;

      createPage({
        path: pathInGatsby,
        component: path.resolve(`./src/templates/initiative.jsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          alias,
          langcode,
        },
      });
    });
  });
};
