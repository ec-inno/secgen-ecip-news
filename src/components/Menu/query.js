/* eslint import/prefer-default-export: 0 */

import { useStaticQuery, graphql } from 'gatsby';

// When importing * from this module, the function below will be possible to spy on.
export const useQuery = () => {
  const data = useStaticQuery(graphql`
    query getMainMenu {
      allMenu(
        filter: {
          menu_name: { eq: "main" }
          enabled: { eq: true }
          menu_has_parent: { eq: false }
        }
      ) {
        edges {
          node {
            menu_name
            id
            title
            external
            href: fetched_alias
            enabled
            menu_has_parent
          }
        }
      }
    }
  `);

  return data;
};
