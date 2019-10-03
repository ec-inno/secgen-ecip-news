import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import getSitemap from '@eci/utils/getSitemap';

import Head from '../components/Head';
import ListNested from '../components/ListNested';

const Sitemap = ({ data, pageContext: { locale } }) => {
  const { t } = useTranslation();
  const list = getSitemap({ data, locale });

  return (
    <>
      <Head title={t('Sitemap')} />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">{t('Sitemap')}</h1>
              <ListNested list={list} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getSitemap($locale: String!, $languageRegex: String!) {
    allMenu(
      filter: {
        id: { regex: $languageRegex }
        menu_name: { eq: "main" }
        enabled: { eq: true }
      }
    ) {
      edges {
        node {
          id
          title
          external
          href: fetched_alias
          enabled
          parent {
            id
          }
        }
      }
    }
    allNodeOePage(
      filter: {
        id: { regex: $languageRegex }
        path: { langcode: { eq: $locale } }
      }
      sort: { fields: path___alias, order: ASC }
    ) {
      edges {
        node {
          id
          title
          path {
            alias
          }
        }
      }
    }
    allSitePage(
      filter: {
        path: { regex: $languageRegex }
        context: { includeInSitemap: { eq: true } }
      }
    ) {
      edges {
        node {
          path
          context {
            title
            includeInSitemap
          }
        }
      }
    }
  }
`;

export default Sitemap;
