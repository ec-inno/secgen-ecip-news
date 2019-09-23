import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

import Head from '../components/Head';
import LeadParagraph from '../components/LeadParagraph';
import SearchForm from '../components/Initiative/Search/Basic';

const Homepage = ({ data, pageContext: { locale } }) => {
  const { t } = useTranslation();
  const news = data.allNodeOeNews.edges;

  return (
    <>
      <Head title={t('Home')} description={t('Home description')} />
      <main>
        <div className="ecl-container">
          <LeadParagraph
            href={`/${locale}/how-it-works`}
            label={t('See how it works step by step')}
            text={t(
              "Get a greater say in the policies that affect your lives. The European Citizens' Initiative is a unique and innovative way for citizens to shape Europe by calling on the European Commission to make a legislative proposal. Once an initiative gathers 1 million signatures, the Commission decides on what follow-up action to take."
            )}
          />

          <SearchForm />

          {news && news.length ? (
            <section className="ecl-u-mt-xl">
              <h2 className="ecl-u-type-heading-2">{t('Latest news')}</h2>
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
                  {t('See more news')}
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
