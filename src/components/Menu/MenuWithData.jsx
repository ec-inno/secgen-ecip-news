import React from 'react';

import Menu from './Menu';
import { useQuery } from './query';
import { useI18nContext } from '../../context/I18n';

const MenuWithData = () => {
  const { location, locale } = useI18nContext();
  const data = useQuery();

  // Menu information about `fetched_alias` contains site folder we don't need.
  const drupalSiteFolder = process.env.GATSBY_DRUPAL_SITE_FOLDER
    ? `/${process.env.GATSBY_DRUPAL_SITE_FOLDER}/`
    : '';

  const items = data.allMenu.edges.length
    ? data.allMenu.edges
        // Take essential information.
        .map(({ node }) => node)
        // Keep items in the given language because static query does not support variables at the moment.
        .filter(link => link.id.includes(`/${locale}/`))
        .map(link => ({
          id: link.id,
          label: link.title,
          href: '/' + link.href.replace(drupalSiteFolder, ''),
        }))
    : [];

  return <Menu items={items} location={location} />;
};

export default MenuWithData;
