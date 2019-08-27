import React from 'react';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

import useTranslations from '../utils/useTranslations';

import SEO from '../components/SEO';
import LeadParagraph from '../components/LeadParagraph';
import InitiativesList from '../components/Initiative/List';

const Homepage = ({ data, pageContext: { locale } }) => {
  const translation = useTranslations('home');
  const news = data.allNodeOeNews.edges;

  return (
    <>
      <SEO title={translation.title} description={translation.description} />
      <main>
        <div className="ecl-container">
          <LeadParagraph
            linkPath={`/${locale}/how-it-works`}
            linkText={translation.how_works_link}
            intro={translation.how_works_intro}
          />

          <InitiativesList />

          {news && news.length ? (
            <section className="ecl-u-mt-xl">
              <h2 className="ecl-u-type-heading-2">
                {translation.latest_news_heading}
              </h2>
              <ul className="ecl-unordered-list">
                {news.map(newsNode => {
                  const { node } = newsNode;
                  const { id, title, oe_teaser } = node;

                  return (
                    <li className="ecl-unordered-list__item" key={id}>
                      <Link
                        to={`/${locale}/news#${slugify(title, {
                          lower: true,
                        })}`}
                        className="ecl-u-d-block ecl-link ecl-link--standalone"
                      >
                        <strong>{title}</strong>
                      </Link>

                      {oe_teaser ? (
                        <div
                          key={id}
                          className="ecl-u-type-paragraph"
                          dangerouslySetInnerHTML={{
                            __html: oe_teaser.processed,
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="ecl-u-type-paragraph">
                <Link
                  className="ecl-link ecl-link--standalone"
                  to={`/${locale}/news`}
                >
                  {translation.more_link}
                </Link>
              </p>
            </section>
          ) : (
            ''
          )}
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getNews($locale: String!, $languageRegex: String!) {
    allNodeOeNews(
      filter: { id: { regex: $languageRegex }, langcode: { eq: $locale } }
      limit: 10
      sort: { order: DESC, fields: oe_publication_date }
    ) {
      edges {
        node {
          id
          title
          oe_teaser {
            processed
          }
        }
      }
    }
  }
`;

export default Homepage;
