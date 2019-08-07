import React from 'react';
import { Link } from 'gatsby';

import logoPaths from '../utils/logoPaths';
import { languages } from '../../languages';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

// Create a map of language code to language label.
const languageMap = languages.reduce((obj, item) => {
  obj[item.lang] = item.label;
  return obj;
}, {});

import SiteName from './SiteName';
import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from './LanguageSelector';

const Header = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const logo = logoPaths[language];

  let urlPath = '';
  let pathParts = [];

  if (location && location.pathname) {
    pathParts = location.pathname.split('/').filter(p => p);
  }

  // Current logic of language switcher: change language prefix.
  // This means that we add current in order to make paths for the translations.
  pathParts.shift();

  urlPath = pathParts.join('/');

  if (location.hash) {
    urlPath += location.hash;
  }

  const items = languages.map(item => {
    const href = `/${item.lang}/${urlPath}`;

    const isActive = href.includes(`/${language}/`);

    return {
      href,
      isActive,
      ...item,
    };
  });

  return (
    <>
      <header className="ecl-site-header">
        <div className="ecl-site-header__container ecl-container">
          <div className="ecl-site-header__banner">
            <Link
              className="ecl-link ecl-link--standalone"
              to={`/${language}`}
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
              code={language}
              name={languageMap[language]}
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
