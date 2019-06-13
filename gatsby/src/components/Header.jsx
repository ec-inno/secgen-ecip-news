import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import logoEN from '@ecl/ec-preset-website/dist/images/logo/logo--en.svg';
import logoBG from '@ecl/ec-preset-website/dist/images/logo/logo--bg.svg';
import logoFR from '@ecl/ec-preset-website/dist/images/logo/logo--fr.svg';

import LanguageListOverlay from './LanguageList/LanguageListOverlay';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ languages, location }) => {
  let logo = logoEN;
  const locations = location.pathname.split('/').filter(p => p);
  const currentLanguage = locations[0];

  switch (currentLanguage) {
    case 'fr': {
      logo = logoFR;
      break;
    }
    case 'bg': {
      logo = logoBG;
      break;
    }
  }

  const items = languages.map(language => ({
    href: `/${language.lang}`,
    ...language,
  }));

  return (
    <Fragment>
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
            <LanguageSwitcher languages={languages} location={location} />
          </div>
        </div>
      </header>
      <LanguageListOverlay
        closeLabel="Close"
        title="Select your language"
        items={items}
      />
    </Fragment>
  );
};

export default Header;
