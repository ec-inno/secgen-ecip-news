import React from 'react';
import { graphql } from 'gatsby';
import { unflatten } from 'flat';

import SEO from '../components/SEO';
import ListNested from '../components/ListNested';

const Sitemap = ({ data, pageContext: { locale } }) => {
  const list = [];
  let listGroupPrepare = {};

  // Menu information about `fetched_alias` contains site folder we don't need.
  const drupalSiteFolder = process.env.GATSBY_SITE_FOLDER
    ? `/${process.env.GATSBY_SITE_FOLDER}/`
    : '';

  const menu = data.allMenu.edges.length
    ? data.allMenu.edges
        .map(({ node }) => node)
        .map(link => ({
          title: link.title,
          hrefFormatted: link.href
            .replace(drupalSiteFolder, '')
            .replace(`${locale}/`, `/${locale}/`),
          external: link.external,
        }))
        .map(link => ({
          ...link,
          href:
            link.hrefFormatted === locale ? `/${locale}` : link.hrefFormatted,
        }))
    : [];

  const pages =
    data.allNodeOePage && data.allNodeOePage.edges
      ? data.allNodeOePage.edges
          .map(({ node }) => ({
            title: node.title,
            href: `/${locale}${node.path.alias}`,
          }))
          // Keep only items which are not already present in the menu.
          .filter(link => !menu.find(m => m.href === link.href))
      : [];

  list.push(...menu);
  list.push(...pages);

  const home = list.shift();

  // Prepare list for a nested structure.
  list
    .map(item => {
      const path = item.href.split('/').filter(a => a);
      path.shift();
      const href = path.join('.');

      return {
        hrefNew: href,
        ...item,
      };
    })
    .filter(item => item.hrefNew)
    .forEach(item => {
      if (!listGroupPrepare[item.hrefNew]) {
        listGroupPrepare[item.hrefNew] = item;
      }
    });

  // Add back the link to Home.
  listGroupPrepare = Object.assign({ [home.title]: home }, listGroupPrepare);

  const listNested = unflatten(listGroupPrepare);

  return (
    <>
      <SEO title="Sitemap" />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">Sitemap</h1>
              <ListNested list={listNested} />
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
  }
`;

export default Sitemap;
