import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import getDefaultLanguage from '../utils/getDefaultLanguage';

const Menu = ({ location }) => {
  let language = getDefaultLanguage();
  let urlPath = '';

  // Try to extract language from pathname, same as getCurrentLanguage.
  // Though here we need also the url parts, so we do it manually.
  const locationParts = location.pathname.split('/').filter(p => p);

  language = locationParts[0];
  urlPath = locationParts[1];

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
