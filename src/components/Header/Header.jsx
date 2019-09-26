import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import logoPaths from '@eci/utils/logoPaths';

import { languages } from '../../../languages';
import { useI18nContext } from '../../context/I18n';

import SiteName from '../SiteName';
import LanguageListOverlay from '../LanguageList/LanguageListOverlayWithContext';
import LanguageSelector from '../LanguageSelector';

// Create a map of language code to language label.
const languageMap = languages.reduce((obj, item) => {
  obj[item.lang] = item.label;
  return obj;
}, {});

const Header = () => {
  const { locale, location } = useI18nContext();
  const { t } = useTranslation();
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
    const href = urlPath ? `/${item.lang}/${urlPath}` : `/${item.lang}`;
    const isActive = href.startsWith(`/${locale}`);

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
              aria-label={t('European Union')}
            >
              <img
                alt={`${t('European Union')} logo`}
                title={t('European Union')}
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
        closeLabel={t('Close')}
        title={t('Select your language')}
        items={items}
      />
    </>
  );
};

export default Header;
