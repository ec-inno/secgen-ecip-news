import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import { ContextProviderWithReducer } from '../Context';

import TopMessage from './TopMessage/TopMessage';
import Header from './Header';
import Menu from './Menu/Menu';
import Footer from './Footer/FooterMultilingual';

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          languages {
            languages {
              lang
              label
            }
          }
        }
      }
      allNodeTranslation {
        nodes {
          path {
            langcode
            alias
          }
          translations {
            langcode
            alias
          }
        }
      }
    }
  `);

  const { languages } = data.site.siteMetadata.languages;
  const { nodes: contentTranslations } = data.allNodeTranslation;
  const currentLanguage = getCurrentLanguage(location);

  return (
    <ContextProviderWithReducer>
      <TopMessage currentLanguage={currentLanguage} />
      <Header
        languages={languages}
        currentLanguage={currentLanguage}
        location={location}
        contentTranslations={contentTranslations}
      />
      <Menu currentLanguage={currentLanguage} />
      {children}
      <Footer location={location} />
    </ContextProviderWithReducer>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
