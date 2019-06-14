import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import logoEN from '@ecl/ec-preset-website/dist/images/logo/logo--en.svg';
import logoBG from '@ecl/ec-preset-website/dist/images/logo/logo--bg.svg';
import logoFR from '@ecl/ec-preset-website/dist/images/logo/logo--fr.svg';

import languages from '../languages';
import getCurrentLanguage from '../utils/getCurrentLanguage';

import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSwitcher from './LanguageSwitcher';

const { map: languageMap } = languages;

const Header = ({ languages, location, contentTranslations }) => {
  let items = [];
  let logo = logoEN;

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
  const [langcode, path] = currentPath.split('/').filter(p => p);

  const translationSet = contentTranslations.find(contentTranslation => {
    return (
      contentTranslation.path.alias === `/${path}` &&
      contentTranslation.path.langcode === langcode
    );
  });

  if (translationSet && translationSet.translations.length) {
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
  }
  // Fallback to selecting a language-specific start.
  else {
    items = languages.map(language => ({
      href: `/${language.lang}`,
      ...language,
    }));
  }

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
            <LanguageSwitcher location={location} />
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
