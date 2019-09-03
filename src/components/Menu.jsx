import React, { useContext } from 'react';
import classnames from 'classnames';
import { useStaticQuery, graphql, Link } from 'gatsby';

import I18nContext from '../context/I18n';

const Menu = () => {
  const { location, locale } = useContext(I18nContext);

  const remove = '/multisite/ecip/';
  const locationParts =
    location && location.pathname
      ? location.pathname.split('/').filter(p => p)
      : [];
  const urlPath = locationParts[1];

  const data = useStaticQuery(graphql`
    query getMenus {
      allMenu {
        edges {
          node {
            id
            title
            external
            fetched_alias
            enabled
            parent {
              id
            }
          }
        }
      }
    }
  `);

  const links = data.allMenu.edges.length
    ? data.allMenu.edges
        // Take essential information.
        .map(({ node }) => node)
        // Keep only items which are enabled are meant to be displayed.
        .filter(link => link.enabled)
        // Keep only first-level menu items.
        .filter(link => !link.parent)
        // Keep items in the given language because static query does not support variables at the moment.
        .filter(link => link.id.includes(`/${locale}/`))
        .map(link => ({
          id: link.id,
          label: link.title,
          href: '/' + link.fetched_alias.replace(remove, ''),
        }))
    : [];

  return (
    <>
      {links && links.length ? (
        <nav className="eci-menu">
          <div className="ecl-container">
            <ul className="eci-menu__list">
              {links.map(link => {
                const { id, label, href } = link;

                let classActive = '';

                if (
                  // Home page.
                  (urlPath === undefined && location.pathname === href) ||
                  // Internal pages.
                  (urlPath && href.includes(urlPath))
                ) {
                  classActive = 'eci-menu__option--is-selected';
                }

                const classNames = classnames(classActive, 'eci-menu__option');

                return (
                  <li className={classNames} key={id}>
                    <Link to={href} className="eci-menu__link ecl-link">
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      ) : (
        ''
      )}
    </>
  );
};

export default Menu;
