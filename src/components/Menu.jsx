import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

const Menu = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const locationParts =
    location && location.pathname
      ? location.pathname.split('/').filter(p => p)
      : [];
  const urlPath = locationParts[1]; // undefined is fine, checked later.

  const translation = require(`../../translations/menu/${language}.json`);

  const { links } = translation;

  return (
    <>
      {links && links.length ? (
        <nav className="eci-menu">
          <div className="ecl-container">
            <ul className="eci-menu__list">
              {links.map((link, key) => {
                const { label, href } = link;
                let classActive = '';

                if (
                  // Home page.
                  (href === '/' && !urlPath) ||
                  // Internal pages.
                  (urlPath && href.includes(urlPath))
                ) {
                  classActive = 'eci-menu__option--is-selected';
                }

                const classNames = classnames(classActive, 'eci-menu__option');

                return (
                  <li className={classNames} key={key}>
                    <Link
                      to={
                        // If the user has left a base path, correct it, as there's always a language.
                        href === '/' ? `/${language}` : `/${language}${href}`
                      }
                      className="eci-menu__link ecl-link"
                    >
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
