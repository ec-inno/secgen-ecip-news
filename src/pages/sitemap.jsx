import React from 'react';
import { Link as LinkInternal } from 'gatsby';
import LinkExternal from '../components/Link/LinkEcl';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import SEO from '../components/SEO';

const Sitemap = ({ location, data }) => {
  const list = [];
  const remove = '/multisite/ecip/';
  const currentLanguage = getCurrentLanguage(location);

  const menuTmp = require('../components/Menu/data.json'); // From query when API comes

  const menu = menuTmp.length
    ? menuTmp
        .filter(link => link.attributes.enabled)
        .map(link => ({
          title: link.attributes.title,
          hrefFormatted: link.attributes.fetched_alias
            .replace(remove, '')
            .replace(`${currentLanguage}/`, `/${currentLanguage}/`),
          external: link.attributes.external,
        }))
        .map(link => ({
          ...link,
          href:
            link.hrefFormatted === currentLanguage
              ? `/${currentLanguage}`
              : link.hrefFormatted,
        }))
    : [];

  const pages =
    data.allNodeOePage && data.allNodeOePage.edges
      ? data.allNodeOePage.edges.map(({ node }) => ({
          title: node.title,
          href: `/${currentLanguage}${node.path.alias}`,
        }))
      : [];

  list.push(...menu);
  list.push(...pages);

  console.log('list', list);

  return (
    <>
      <SEO title="Sitemap" location={location} />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">Sitemap</h1>
              {list.length ? (
                <ul className="ecl-unordered-list">
                  {list.map((listItem, key) => {
                    return (
                      <li key={key} className="ecl-unordered-list__item">
                        {listItem.external ? (
                          <LinkExternal
                            href={listItem.href}
                            className="ecl-link ecl-link--standalone"
                          >
                            {listItem.title}
                          </LinkExternal>
                        ) : (
                          <LinkInternal
                            to={listItem.href}
                            className="ecl-link ecl-link--standalone"
                          >
                            {listItem.title}
                          </LinkInternal>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getPages($locale: String!, $languageRegex: String!) {
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
