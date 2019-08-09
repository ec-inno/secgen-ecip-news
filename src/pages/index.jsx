import React from 'react';

import logoSvg from '@ecl/eu-preset-website/dist/images/logo/logo--mute.svg';

import SEO from '../components/SEO';
import LanguageList from '../components/LanguageList/LanguageList';

import { languages } from '../../languages';

const Index = () => {
  const items = languages.map(language => ({
    href: `/${language.lang}`,
    ...language,
  }));

  return (
    <>
      <SEO title="Welcome" description="" />
      <div className="ecl-language-list ecl-language-list--splash">
        <header className="ecl-language-list__header">
          <img
            className="ecl-language-list__logo"
            src={logoSvg}
            alt="European Commission logo"
          />
        </header>
        <div className="ecl-language-list__container ecl-container">
          <LanguageList items={items} />
        </div>
      </div>
    </>
  );
};

export default Index;
