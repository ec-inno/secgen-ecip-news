import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import SEO from './SEO';

import TopMessage from './TopMessage/TopMessage';
import Header from './Header';
import Menu from './Menu/Menu';
import Footer from './Footer/FooterMultilingual';

const Layout = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'landing') return children;

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
    }
  `);

  const { languages } = data.site.siteMetadata.languages;
  const currentLanguage = getCurrentLanguage(location);

  return (
    <>
      <SEO />
      <TopMessage currentLanguage={currentLanguage} />
      <Header languages={languages} location={location} />
      <Menu location={location} />
      {children}
      <Footer location={location} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
