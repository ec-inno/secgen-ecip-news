import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

const Menu = ({ location }) => {
  const data = require('./data.json');

  const remove = '/multisite/ecip/';
  const locationParts =
    location && location.pathname
      ? location.pathname.split('/').filter(p => p)
      : [];
  const urlPath = locationParts[1];

  const links = data.length
    ? data
        // Keep only items which are enabled are meant to be displayed.
        .filter(link => link.attributes.enabled)
        // Keep only first-level menu items.
        .filter(link => !link.attributes.parent)
        .map(link => ({
          id: link.id,
          label: link.attributes.title,
          href: '/' + link.attributes.fetched_alias.replace(remove, ''),
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
