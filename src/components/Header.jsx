import React from 'react';
import { Link } from 'gatsby';

import logoPaths from '../utils/logoPaths';
import { languages, defaultLangKey } from '../../languages';

// Create a map of language code to language label.
const languageMap = languages.reduce((obj, item) => {
  obj[item.lang] = item.label;
  return obj;
}, {});

import SiteName from './SiteName';
import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from './LanguageSelector';

const Header = ({ location }) => {
  if (!location) {
    return (
      <header className="ecl-site-header">
        <div className="ecl-site-header__container ecl-container">
          <div className="ecl-site-header__banner">
            <Link
              className="ecl-link ecl-link--standalone"
              to={`/${defaultLangKey}`}
              aria-label="European Union"
            >
              <img
                alt="European Union logo"
                title="European Union"
                className="ecl-site-header__logo-image"
                src={logoPaths[defaultLangKey]}
              />
            </Link>
          </div>
        </div>
        <SiteName />
      </header>
    );
  }

  let logo = logoPaths[defaultLangKey];

  const { pathname } = location;
  const pathParts = pathname.split('/').filter(p => p);
  const langcodeCurrent = pathParts.shift();
  const urlPath = pathParts.join('/');

  // Change logo to a language-specific one, if applicable.
  if (langcodeCurrent !== defaultLangKey) {
    logo = logoPaths[langcodeCurrent];
  }

  const items = languages.map(language => {
    const href = urlPath ? `/${language.lang}/${urlPath}` : `/${language.lang}`;
    const isActive = href.includes(langcodeCurrent);

    return {
      href,
      isActive,
      ...language,
    };
  });

  return (
    <>
      <header className="ecl-site-header">
        <div className="ecl-site-header__container ecl-container">
          <div className="ecl-site-header__banner">
            <Link
              className="ecl-link ecl-link--standalone"
              to={`/${langcodeCurrent}`}
              aria-label="European Union"
            >
              <img
                alt="European Union logo"
                title="European Union"
                className="ecl-site-header__logo-image"
                src={logo}
              />
            </Link>
            <LanguageSelector
              code={langcodeCurrent}
              name={languageMap[langcodeCurrent]}
              href="#"
            />
          </div>
        </div>
        <SiteName location={location} />
      </header>
      <LanguageListOverlay
        closeLabel="Close"
        title="Select your language"
        items={items}
      />
    </>
  );
};

export default Header;
