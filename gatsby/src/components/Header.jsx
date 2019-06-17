import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import logoEN from '@ecl/eu-preset-website/dist/images/logo/logo--en.svg';
import logoBG from '@ecl/eu-preset-website/dist/images/logo/logo--bg.svg';
import logoFR from '@ecl/eu-preset-website/dist/images/logo/logo--fr.svg';

import languages from '../languages';
import getCurrentLanguage from '../utils/getCurrentLanguage';

import SiteName from './SiteName';
import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from './LanguageSelector';

const { map: languageMap } = languages;

const Header = ({ languages, location, contentTranslations }) => {
  let items = [];
  let logo = logoEN;
  let opensOverlay = false;

  const currentLanguage = getCurrentLanguage(location);

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

  const currentPath = location.pathname;
  const [langcode, urlPath] = currentPath.split('/').filter(p => p);

  const translationSet = contentTranslations.find(contentTranslation => {
    return (
      contentTranslation.path.alias === `/${urlPath}` &&
      contentTranslation.path.langcode === langcode
    );
  });

  // Are there translations for this content page?
  if (translationSet && translationSet.translations.length && urlPath) {
    items = translationSet.translations.map(translation => {
      // translation is a structure of data coming from jsonapi about a pathauto alias.
      // Because gatsby has already created content matching this path, we only need to reformat the information.
      const { alias, langcode } = translation;

      return {
        href: `/${langcode}${alias}`,
        lang: langcode,
        label: languageMap[langcode],
        // src/components/LanguageList/LanguageListItem.jsx is not ready yet for isActive
        // isActive: langcode === currentLanguage,
      };
    });
    opensOverlay = true;
  }
  // It's the landing/home page of a specific language.
  else if (currentLanguage && urlPath === undefined) {
    items = languages.map(language => ({
      href: `/${language.lang}`,
      ...language,
    }));
    opensOverlay = true;
  }

  return (
    <Fragment>
      <header className="ecl-site-header">
        <div className="ecl-site-header__container ecl-container">
          <div className="ecl-site-header__banner">
            <Link
              className="ecl-link ecl-link--standalone"
              to="/"
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
              code={currentLanguage}
              name={languageMap[currentLanguage]}
              href="#"
              opensOverlay={opensOverlay}
            />
          </div>
        </div>
        <SiteName />
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
