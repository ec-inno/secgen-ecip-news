import React from 'react';
import { graphql, Link, navigate, withPrefix } from 'gatsby';

import { defaultLangKey } from '../languages';

const Homepage = ({ data, location }) => {
  if (typeof window !== 'undefined') {
    if (location.pathname === '/') {
      const homeUrl = withPrefix(`/${defaultLangKey}/`);
      navigate(homeUrl);

      return <div />;
    }
  }

  const initiatives = data.allInitiatives.edges;

  return (
    <main className="ecl-u-pv-xl">
      <div className="ecl-container">
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

                <div
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
      </div>
    </main>
  );
};

export const query = graphql`
  query getInitiatives($locale: String!, $languageRegex: String!) {
    allInitiatives(
      filter: { id: { regex: $languageRegex }, langcode: { eq: $locale } }
      limit: 10
      sort: { order: DESC, fields: field_date }
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
