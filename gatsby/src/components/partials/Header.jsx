import React from 'react';
import { Link } from 'gatsby';

import logo from '@ecl/ec-preset-website/dist/images/logo/logo--en.svg';
import iconsSpritePath from '@ecl/ec-preset-website/dist/images/icons/sprites/icons.svg';

const Header = () => (
  <header className="ecl-site-header">
    <div className="ecl-site-header__container ecl-container">
      <div className="ecl-site-header__banner">
        <Link
          className="ecl-link ecl-link--standalone"
          to="/"
          aria-label="European Commission"
        >
          <img
            alt="European Commission logo"
            title="European Commission"
            className="ecl-site-header__logo-image"
            src={logo}
          />
        </Link>
        <div className="ecl-site-header__selector">
          <a
            className="ecl-link ecl-link--standalone"
            href="/example"
            data-ecl-language-selector="true"
            aria-expanded="true"
          >
            English
            <span className="ecl-site-header__language-icon">
              <svg
                focusable="false"
                aria-hidden="true"
                className="ecl-icon ecl-icon--m"
              >
                <use xlinkHref={`${iconsSpritePath}#general--language`} />
              </svg>
              <span className="ecl-site-header__language-code">en</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
