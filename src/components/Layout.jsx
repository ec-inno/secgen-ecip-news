import React from 'react';
import PropTypes from 'prop-types';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';

import SEO from './SEO';

import TopMessage from './TopMessage';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer/FooterLanguage';

const Layout = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'landing') return children;

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
