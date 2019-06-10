const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    query getAllInitiatives {
      allInitiatives {
        edges {
          node {
            id
            field_date
            field_subject_matter {
              processed
            }
            field_main_objectives {
              processed
            }
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
