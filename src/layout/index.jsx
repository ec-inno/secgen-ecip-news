import React from 'react';
import PropTypes from 'prop-types';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';
import '../components/assets/custom.css';

import SEO from '../components/SEO';

import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer/FooterLanguage';

const Layout = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'landing' || pageContext.layout === 'dynamic')
    return children;

  return (
    <>
      <SEO />
      <TopMessage location={location} />
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
