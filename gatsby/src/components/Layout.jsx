import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';

import { ContextProvider } from '../Context';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import TopMessage from './TopMessage/TopMessage';
import Header from './Header';
import Menu from './Menu/Menu';
import Footer from './Footer/FooterMultilingual';

const Layout = ({ children, location }) => {
  // Homepage is a the splash page with languages.
  if (location.pathname === '/') return children;

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
    <ContextProvider>
      <TopMessage currentLanguage={currentLanguage} />
      <Header
        languages={languages}
        currentLanguage={currentLanguage}
        location={location}
        contentTranslations={contentTranslations}
      />
      <Menu currentLanguage={currentLanguage} />
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">{children}</div>
      </main>
      <Footer location={location} />
    </ContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
