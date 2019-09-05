import { unflatten } from 'flat';

const organizeChildren = (obj, result = {}) => {
  if (!obj || Object.keys(obj).length === 0) return result;

  const keep = ['href', 'title', 'external'];

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      const children = {};

      Object.keys(obj[key]).forEach(k => {
        if (keep.includes(k)) {
          if (!result[key]) {
            result[key] = {};
          }
          result[key][k] = obj[key][k];
        }

        if (!keep.includes(k) && typeof obj[key][k] === 'object') {
          children[k] = obj[key][k];
        }
      });

      result[key].children = children;

      delete obj[key];
    }
  }
};

/**
 * Provides a nested structure representing a sitemap, based on main menu and pages.
 * @param {Object} data Pages' graphql queries result.
 * @param {Object} location The `location` object passed to pages.
 */
const getSitemap = ({ data, locale }) => {
  const list = {};
  const listPrepare = [];
  let listGroupPrepare = {};

  // Menu information about `fetched_alias`, aliased as `href` below, contains site folder we don't need.
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

  listPrepare.push(...menu);
  listPrepare.push(...pages);

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
  listGroupPrepare = Object.assign({ [home.title]: home }, listGroupPrepare);

  const listNested = unflatten(listGroupPrepare);

  organizeChildren(listNested, list);

  console.log('list', list);

  return list;
};

export default getSitemap;
