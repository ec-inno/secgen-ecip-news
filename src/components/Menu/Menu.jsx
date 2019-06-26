import React from 'react';
import { Link } from 'gatsby';

import data from './data';

const Menu = ({ currentLanguage }) => {
  const links = data[currentLanguage];

  return (
    <nav className="eci-menu">
      <div className="ecl-container">
        <ul className="eci-menu__list">
          {links && links.length ? (
            links.map((link, key) => {
              const { label, href } = link;
              return (
                <li className="eci-menu__option" key={key}>
                  <Link
                    to={
                      // If the user has left a base path, correct it, as there's always a language.
                      href === '/'
                        ? `/${currentLanguage}`
                        : `/${currentLanguage}${href}`
                    }
                    className="eci-menu__link ecl-link"
                  >
                    {label}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="eci-menu__option eci-menu__option--is-selected">
              <a
                href={`/${currentLanguage}`}
                className="eci-menu__link ecl-link"
              >
                Home
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
