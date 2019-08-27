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

const I18nContext = React.createContext();

const Layout = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'landing') return children;

  const { locale } = pageContext;

  return (
    <>
      <I18nContext.Provider value={{ locale, location }}>
        <SEO />
        <TopMessage />
        <Header />
        <Menu />
        {children}
        <ForumBanner location={location} />
        <Footer location={location} />
      </I18nContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export { Layout as default, I18nContext };
