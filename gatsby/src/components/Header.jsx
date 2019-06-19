import React from 'react';
import { Link } from 'gatsby';

import logoBG from '@ecl/eu-preset-website/dist/images/logo/logo--bg.svg';
import logoEN from '@ecl/eu-preset-website/dist/images/logo/logo--en.svg';
import logoFR from '@ecl/eu-preset-website/dist/images/logo/logo--fr.svg';

import { map as languageMap } from '../languages';

import SiteName from './SiteName';
import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from './LanguageSelector';

const Header = ({
  languages,
  currentLanguage,
  location,
  contentTranslations,
}) => {
  // Defaults.
  let items = [];
  let logo = logoEN; // defaultLangKey could also be used if to be more sophisticated.
  // Enable display of language switcher overlay only when there's useful information for it.
  let opensOverlay = false;

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

  // In order to show an overlay with languages for switching
  // between different language version of a given content,
  // it's necessary to have enough context.
  const currentPath = location.pathname;
  const [langcode, urlPath] = currentPath.split('/').filter(p => p);

  if (langcode && urlPath) {
    const translationSet = contentTranslations.find(contentTranslation => {
      return (
        contentTranslation.path.alias === `/${urlPath}` &&
        contentTranslation.path.langcode === langcode
      );
    });

    // Are there translations for this content page?
    if (
      translationSet &&
      translationSet.translations &&
      translationSet.translations.length
    ) {
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
  }

  // It's the landing/home page of a specific language.
  // Examples /en, /bg, /fr, etc.
  if (currentLanguage && urlPath === undefined) {
    items = languages.map(language => ({
      href: `/${language.lang}`,
      ...language,
    }));
    opensOverlay = true;
  }

  return (
    <>
      <header className="ecl-site-header">
        <div className="ecl-site-header__container ecl-container">
          <div className="ecl-site-header__banner">
            <Link
              className="ecl-link ecl-link--standalone"
              to={`/${currentLanguage}`}
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
        <SiteName currentLanguage={currentLanguage} />
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
