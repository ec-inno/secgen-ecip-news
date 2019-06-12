import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import logoSvg from '@ecl/ec-preset-website/dist/images/logo/logo--mute.svg';

import LanguageList from '../components/LanguageList/LanguageList';

// Homepage follows closely language splash page: https://github.com/ec-europa/europa-component-library/blob/v2-dev/src/systems/ec/implementations/react/page-structure/language-list/src/LanguageListSplash.jsx
const Index = props => {
  const { languages } = props.data.site.siteMetadata.languages;

  // For the moment, subpages follow lang attributes.
  const items = languages.map(language => ({
    href: `/${language.lang}`,
    ...language,
  }));

  return (
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
  );
};

Index.propTypes = {
  data: PropTypes.object,
};

export default Index;

export const pageQuery = graphql`
  query getSiteMetaData {
    site {
      siteMetadata {
        languages {
          languages {
            label
            lang
          }
        }
      }
    }
  }
`;
