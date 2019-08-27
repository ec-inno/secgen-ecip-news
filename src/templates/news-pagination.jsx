import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

import useTranslations from '../utils/useTranslations';

import SEO from '../components/SEO';

const News = ({ data, pageContext }) => {
  const translation = useTranslations('news');

  const { currentPage, numPages, locale } = pageContext;
  const pageRoot = `/${locale}/news/`;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? pageRoot : pageRoot + (currentPage - 1).toString();
  const nextPage = pageRoot + (currentPage + 1).toString();

  const { edges: newsItems } = data.allNodeOeNews;

  return (
    <Fragment>
      <SEO title={translation.title} description={translation.news_intro} />
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{translation.title}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                {translation.news_intro}
              </p>
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-12 ecl-col-sm-3">
              <nav>
                <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                  {translation.inpage_title}
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
                        <a
                          href={`#${slugify(title, { lower: true })}`}
                          className="ecl-link ecl-link--standalone ecl-u-d-block"
                        >
                          {title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="ecl-col-12 ecl-col-sm-9">
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  {translation.previous}
                </Link>
              )}
              {!isLast && (
                <Link to={nextPage} rel="next">
                  {translation.next}
                </Link>
              )}
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
                        {translation.news_source}
                        {': '}
                        <Link to={field_source.uri}>{field_source.uri}</Link>
                      </p>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
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
