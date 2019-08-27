import React from 'react';
import PropTypes from 'prop-types';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';
import '../components/assets/custom.css';

import I18nContext from '../context/I18n';

import SEO from '../components/SEO';
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer/FooterLanguage';
import ForumBanner from '../components/ForumBanner';

const Layout = ({ children, location, pageContext: { locale, layout } }) => {
  return (
    <I18nContext.Provider value={{ locale, location }}>
      {layout === 'landing' ? (
        children
      ) : (
        <>
          <SEO />
          <TopMessage />
          <Header />
          <Menu />
          {children}
          <ForumBanner />
          <Footer />
        </>
      )}
    </I18nContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
