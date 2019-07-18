import React from 'react';
import PropTypes from 'prop-types';

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

  const currentLanguage = getCurrentLanguage(location);

  return (
    <>
      <SEO />
      <TopMessage currentLanguage={currentLanguage} />
      <Header location={location} />
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
