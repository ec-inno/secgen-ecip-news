import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';

const Homepage = ({ data }) => {
  const initiatives = data.allInitiatives.edges;

  return (
    <Fragment>
      {initiatives.map(initiativeNode => {
        const { node } = initiativeNode;
        const { id, title, field_main_objectives, path } = node;
        const { alias, langcode } = path;

        return (
          <Fragment key={id}>
            <Link
              to={`/${langcode}${alias}`}
              className="ecl-link ecl-link--standalone"
            >
              <h2 className="ecl-u-type-heading-2">{title}</h2>
            </Link>
            <p
              key={id}
              className="ecl-paragraph"
              dangerouslySetInnerHTML={{
                __html: field_main_objectives.processed,
              }}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export const query = graphql`
  {
    allInitiatives(
      filter: { id: { regex: "//fr//" }, langcode: { eq: "fr" } }
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
