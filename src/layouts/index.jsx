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
import ForumBanner from '../components/ForumBanner';

const LocaleContext = React.createContext();

const Layout = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'landing') return children;

  const { locale } = pageContext;

  return (
    <>
      <LocaleContext.Provider value={{ locale }}>
        <SEO />
        <TopMessage />
        <Header location={location} />
        <Menu location={location} />
        {children}
        <ForumBanner location={location} />
        <Footer location={location} />
      </LocaleContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export { Layout as default, LocaleContext };
