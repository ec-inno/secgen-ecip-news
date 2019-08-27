import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import { I18nContext } from '../layouts';

import getTranslations from '../utils/getTranslations';

const Menu = () => {
  const { locale, location } = React.useContext(I18nContext);
  const translation = getTranslations('menu');
  const { links } = translation;

  const locationParts =
    location && location.pathname
      ? location.pathname.split('/').filter(p => p)
      : [];
  const urlPath = locationParts[1]; // undefined is fine, checked later.

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
                        href === '/' ? `/${locale}` : `/${locale}${href}`
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
