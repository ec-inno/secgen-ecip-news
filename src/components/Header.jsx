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

const Header = ({ location, clientRoute }) => {
  let loc = {};
  let pathParts = [];
  let langcodeCurrent = defaultLangKey;
  let urlPath = '';
  let logo = logoPaths[defaultLangKey];
  // `clientRoute` is contained in `pageContext`, in this context passed from parent.
  // Based on `dynamic` property communicating client-only route.
  const isClientRouting = clientRoute || false;

  // If it's used as a client-side only.
  if (typeof window !== 'undefined') {
    loc = window.location;
  }
  // Respect Gatsby's location if provided.
  if (location) {
    loc = location;
  }

  // Client-only page, currently using hashes in url for passing information.
  // Change when redirects and rewrites are working instead of the hashes.
  if (loc && loc.hash && loc.pathname === '/initiatives/') {
    const pathParts = loc.hash.slice(1).split('-');
    langcodeCurrent = pathParts.shift();
    urlPath = pathParts.join('-');
  }
  // Non-hash scenario, paths are divided with slashes.
  else if (loc && loc.pathname) {
    pathParts = loc.pathname.split('/').filter(p => p);
    langcodeCurrent = pathParts.shift();
    urlPath = pathParts.join('/');
  }

  // Change logo to a language-specific one, if applicable.
  if (langcodeCurrent !== defaultLangKey) {
    logo = logoPaths[langcodeCurrent];
  }

  const items = languages.map(language => {
    const href = isClientRouting
      ? `/initiatives/#${language.lang}-${urlPath}`
      : `/${language.lang}/${urlPath}`;

    const isActive =
      href.includes(`/#${langcodeCurrent}`) ||
      href.includes(`/${langcodeCurrent}/`);

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
        <SiteName location={location} clientRoute={clientRoute} />
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
