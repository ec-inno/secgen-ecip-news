import { unflatten } from 'flat';

/**
 * Provides a nested structure representing a sitemap, based on main menu and pages.
 * @param {Object} data Pages' graphql queries result.
 * @param {String} locale
 */
const getSitemap = ({ data, locale }) => {
  const listPrepare = [];
  let listGroupPrepare = {};

  // Menu information about `fetched_alias`, aliased as `href` below, contains site folder we don't need.
  const drupalSiteFolder = process.env.GATSBY_DRUPAL_SITE_FOLDER
    ? `/${process.env.GATSBY_DRUPAL_SITE_FOLDER}/`
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

  const others =
    data.allSitePage && data.allSitePage.edges
      ? data.allSitePage.edges.map(({ node }) => ({
          title:
            node.context && node.context.title ? node.context.title : 'test',
          href: node.path,
        }))
      : [];

  listPrepare.push(...menu);
  listPrepare.push(...pages);
  listPrepare.push(...others);

  const home = listPrepare.shift();

  // Prepare list for a nested structure.
  listPrepare
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
  /* eslint-disable-next-line */
  listGroupPrepare = Object.assign({ [home.title]: home }, listGroupPrepare);

  // Keep a set of link attributes, the rest will be treated as children for rendering nested unordered lists.
  const listFormatted = {};

  Object.keys(listGroupPrepare).forEach(key => {
    const { title, href, external: ex } = listGroupPrepare[key];
    listFormatted[key] = { title, href, external: ex || false };
  });

  const list = unflatten(listFormatted);

  return list;
};

export default getSitemap;
