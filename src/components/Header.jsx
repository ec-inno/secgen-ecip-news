import React from 'react';
import { Link } from 'gatsby';

import { languages } from '../../languages';
import { I18nContext } from '../layouts';

import logoPaths from '../utils/logoPaths';
import getTranslations from '../utils/getTranslations';

import SiteName from './SiteName';
import LanguageListOverlay from './LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from './LanguageSelector';

// Create a map of language code to language label.
const languageMap = languages.reduce((obj, item) => {
  obj[item.lang] = item.label;
  return obj;
}, {});

const Header = () => {
  const { locale, location } = React.useContext(I18nContext);
  const translation = getTranslations('header');
  const logo = logoPaths[locale];

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

    const isActive = href.includes(`/${locale}/`);

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
              to={`/${locale}`}
              aria-label={translation.european_union}
            >
              <img
                alt={`${translation.european_union} logo`}
                title={translation.european_union}
                className="ecl-site-header__logo-image"
                src={logo}
              />
            </Link>
            <LanguageSelector
              code={locale}
              name={languageMap[locale]}
              href="#"
            />
          </div>
        </div>
        <SiteName />
      </header>
      <LanguageListOverlay
        closeLabel={translation.close_label}
        title={translation.select_language}
        items={items}
      />
    </>
  );
};

export default Header;
