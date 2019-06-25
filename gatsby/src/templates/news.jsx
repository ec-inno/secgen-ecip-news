import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

const NewsTemplate = ({ data }) => {
  const { news: node } = data;
  const { title, body, oe_publication_date, translations } = node;

  return (
    <main className="ecl-u-pv-xl">
      <div className="ecl-container">
        <h1>{title}</h1>
        <p className="ecl-paragraph">{oe_publication_date}</p>
        <div
          className="ecl-paragraph"
          dangerouslySetInnerHTML={{
            __html: body.processed,
          }}
        />

        {translations ? (
          <ul className="ecl-unordered-list">
            {translations.map(translation => (
              <li
                className="ecl-unordered-list__item"
                key={translation.langcode}
              >
                <Link to={`/${translation.langcode}${translation.alias}`}>
                  {translation.langcode}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </main>
  );
};

export const query = graphql`
  query getNewsSingle($alias: String!, $langcode: String!) {
    news(path: { alias: { eq: $alias }, langcode: { eq: $langcode } }) {
      title
      oe_publication_date
      body {
        processed
      }
      translations {
        alias
        langcode
      }
    }
  }
`;

export default NewsTemplate;
