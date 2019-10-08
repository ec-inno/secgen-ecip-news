import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import getPaginationItems from '@eci/utils/getPaginationItems';

import Head from '../components/Head';
import LinkExternal from '../components/Link/LinkEcl';
import LinkInternal from '../components/Link/LinkGatsby';
import Pagination from '../components/Pagination/Pagination';

const News = ({ data, pageContext: { locale, pagination } }) => {
  const { t } = useTranslation();

  /**
   * Prepare pagination.
   */
  const { pagesCount, pageCurrent } = pagination;
  const sectionBase = `/${locale}/news`;
  const items = getPaginationItems({ pagesCount, pageCurrent, sectionBase, t });

  /**
   * Prepare news.
   */
  const { edges: newsItems } = data.allNodeOeNews;
  const hasNews = Object.keys(newsItems).length !== 0;

  return (
    <>
      <Head
        title={t('News')}
        description={t('Access the latest news from ECI.')}
      />
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{t('News')}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                {t('Access the latest news from ECI.')}
              </p>
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            {hasNews && (
              <>
                <div className="ecl-col-12 ecl-col-sm-3">
                  <nav>
                    <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                      {t('Page contents')}
                    </div>
                    <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                      {newsItems.map((item, i) => {
                        const { node } = item;
                        const { title } = node;

                        return (
                          <li
                            key={i}
                            className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m"
                          >
                            <LinkExternal
                              label={title}
                              href={`#${slugify(title, { lower: true })}`}
                              variant="standalone"
                              className="ecl-u-d-block"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div className="ecl-col-12 ecl-col-sm-9">
                  {newsItems.map((item, i) => {
                    const { node } = item;
                    const {
                      title,
                      oe_publication_date,
                      oe_summary,
                      field_source,
                    } = node;

                    return (
                      <Fragment key={i}>
                        <h3
                          id={`${slugify(title, { lower: true })}`}
                          className="ecl-u-type-heading-3"
                        >
                          {title}
                        </h3>

                        <p className="ecl-u-type-paragraph-s">
                          {oe_publication_date}
                        </p>

                        {oe_summary && (
                          <div
                            key={i}
                            className="ecl-u-type-paragraph ecl-u-type-paragraph"
                            dangerouslySetInnerHTML={{
                              __html: oe_summary.processed,
                            }}
                          />
                        )}

                        {field_source && (
                          <p className="ecl-u-type-paragraph">
                            {t('News source')}
                            {': '}
                            <LinkExternal
                              target="_blank"
                              href={field_source.uri}
                              label={field_source.uri}
                            />
                          </p>
                        )}
                      </Fragment>
                    );
                  })}
                  {items.length > 1 && (
                    <Pagination
                      label={t('Browse news')}
                      items={items}
                      linkComponent={LinkInternal}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getNewsPaginated(
    $locale: String!
    $languageRegex: String!
    $skip: Int!
    $limit: Int!
  ) {
    allNodeOeNews(
      filter: { id: { regex: $languageRegex }, langcode: { eq: $locale } }
      sort: { fields: [oe_publication_date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          oe_publication_date
          oe_summary {
            processed
          }
          field_source {
            uri
            title
          }
        }
      }
    }
  }
`;

export default News;
