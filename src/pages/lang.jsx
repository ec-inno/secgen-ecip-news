import React from 'react';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

import SEO from '../components/SEO';
import getCurrentLanguage from '../utils/getCurrentLanguage';
import LeadParagraph from '../components/LeadParagraph';
import InitiativesList from '../components/Initiative/List';
import ForumBanner from '../components/ForumBanner';

const Homepage = ({ data, location }) => {
  const currentLanguage = getCurrentLanguage(location);

  const {
    more_link,
    how_works_intro,
    how_works_link,
    latest_news_heading,
  } = data.file.childLangJson;

  const news = data.allNodeOeNews.edges;

  return (
    <>
      <SEO title="Home" />
      <main>
        <div className="ecl-container">
          <LeadParagraph
            linkPath={`/${currentLanguage}/how-it-works`}
            linkText={how_works_link}
            intro={how_works_intro}
          />

          <InitiativesList location={location} />
          {news.length ? (
            <section className="ecl-u-mt-xl">
              <h2 className="ecl-u-type-heading-2">{latest_news_heading}</h2>
              <ul className="ecl-unordered-list">
                {news.map(newsNode => {
                  const { node } = newsNode;
                  const { id, title, oe_teaser } = node;

                  return (
                    <li className="ecl-unordered-list__item" key={id}>
                      <Link
                        to={`/${currentLanguage}/news#${slugify(title, {
                          lower: true,
                        })}`}
                        className="ecl-u-d-block ecl-link ecl-link--standalone"
                      >
                        <strong>{title}</strong>
                      </Link>

                      {oe_teaser ? (
                        <div
                          key={id}
                          className="ecl-paragraph"
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
                  to={`/${currentLanguage}/news`}
                >
                  {more_link}
                </Link>
              </p>
            </section>
          ) : (
            ''
          )}
        </div>
      </main>
      <ForumBanner location={location} />
    </>
  );
};

export const query = graphql`
  query getNews($locale: String!, $languageRegex: String!) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "lang" }) {
      childLangJson {
        more_link
        how_works_intro
        how_works_link
        latest_news_heading
      }
    }
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
