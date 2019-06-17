import React from 'react';
import { graphql, Link } from 'gatsby';

const Homepage = ({ data }) => {
  const initiatives = data.allInitiatives.edges;

  return (
    <ul className="ecl-unordered-list">
      {initiatives.map(initiativeNode => {
        const { node } = initiativeNode;
        const { id, title, field_main_objectives, path } = node;
        const { alias, langcode } = path;

        return (
          <li className="ecl-unordered-list__item" key={id}>
            <Link
              to={`/${langcode}${alias}`}
              className="ecl-u-d-block ecl-link ecl-link--standalone"
            >
              <strong>{title}</strong>
            </Link>

            <p
              key={id}
              className="ecl-paragraph"
              dangerouslySetInnerHTML={{
                __html: field_main_objectives.processed,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export const query = graphql`
  {
    allInitiatives(
      filter: { id: { regex: "//en//" }, langcode: { eq: "en" } }
    ) {
      edges {
        node {
          id
          title
          field_main_objectives {
            processed
          }
          field_subject_matter {
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
`;

export default Homepage;
