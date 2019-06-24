import React from 'react';
import { graphql, Link } from 'gatsby';

const Homepage = ({ data }) => {
  const news = data.allNews.edges;

  return (
    <main className="ecl-u-pv-xl">
      <div className="ecl-container">
        <ul className="ecl-unordered-list">
          {news.map(newsNode => {
            const { node } = newsNode;
            const { id, title, oe_teaser, path } = node;
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
                    __html: oe_teaser.processed,
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
  query getNews($locale: String!, $languageRegex: String!) {
    allNews(
      filter: { id: { regex: $languageRegex }, langcode: { eq: $locale } }
      limit: 10
      sort: { order: DESC, fields: oe_publication_date }
    ) {
      edges {
        node {
          id
          title
          path {
            alias
            langcode
          }
          oe_teaser {
            processed
          }
        }
      }
    }
  }
`;

export default Homepage;
