import { useStaticQuery, graphql } from 'gatsby';

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
