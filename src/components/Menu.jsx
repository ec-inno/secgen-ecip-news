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

  const data = require(`../data/menu/${language}.json`);

  const { links } = data;

  return (
    <nav className="eci-menu">
      <div className="ecl-container">
        <ul className="eci-menu__list">
          {links && links.length
            ? links.map((link, key) => {
                const { label, href } = link;
                let classActive = '';

                if (
                  // In case of home page.
                  (href === '/' && !urlPath) ||
                  // Or any other internal one.
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
              })
            : ''}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
