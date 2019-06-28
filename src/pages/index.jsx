import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import logoSvg from '@ecl/eu-preset-website/dist/images/logo/logo--mute.svg';

import SEO from '../components/SEO';
import LanguageList from '../components/LanguageList/LanguageList';

const Index = props => {
  const { languages } = props.data.site.siteMetadata.languages;

  const items = languages.map(language => ({
    href: `/${language.lang}`,
    ...language,
  }));

  return (
    <>
      <SEO title="Welcome" />
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
