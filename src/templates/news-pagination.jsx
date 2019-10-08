import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import Head from '../components/Head';
import LinkExternal from '../components/Link/LinkEcl';
import Pagination from '../components/Pagination/PaginationInternal';

const News = ({ data, pageContext: { locale, pagination } }) => {
  const { t } = useTranslation();

  /**
   * Prepare pagination.
   */
  const items = [];
  const { pagesCount, pageCurrent } = pagination;
  const section = `/${locale}/news`;

  if (pageCurrent !== 0) {
    const previous = pageCurrent === 1 ? '' : `/${pageCurrent}`;

    items.push({
      isPrevious: true,
      ariaLabel: t('Go to previous page'),
      link: {
        variant: 'standalone',
        href: `${section}${previous}`,
        label: t('Previous'),
        iconPosition: 'before',
        icon: {
          shape: 'ui--corner-arrow',
          size: 'xs',
          transform: 'rotate-270',
        },
      },
    });
  }

  for (let i = 0; i < pagesCount; i += 1) {
    const displayNum = i + 1;
    const label = String(displayNum);

    if (i === pageCurrent) {
      items.push({
        isCurrent: true,
        ariaLabel: `${t('Page')} ${label}`,
        label,
      });
    } else {
      items.push({
        ariaLabel: `${t('Go to page')} ${label}`,
        link: {
          variant: 'standalone',
          href: displayNum === 1 ? section : `/${section}/${displayNum}`,
          label,
        },
      });
    }
  }

  if (pagesCount !== pageCurrent + 1) {
    const next = pageCurrent === 0 ? 2 : pageCurrent + 2; // /news === /news/1

    items.push({
      isNext: true,
      ariaLabel: t('Go to next page'),
      link: {
        variant: 'standalone',
        href: `${section}/${next}`,
        label: t('Next'),
        iconPosition: 'after',
        icon: {
          shape: 'ui--corner-arrow',
          size: 'xs',
          transform: 'rotate-90',
        },
      },
    });
  }

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
                  <Pagination label={t('Browse news')} items={items} />
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
