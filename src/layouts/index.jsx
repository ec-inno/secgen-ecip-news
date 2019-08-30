import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';
import '../components/assets/custom.css';

import i18n from '../../i18n/config'; // i18next instance
import I18nContext from '../context/I18n'; // locale and location store

import SEO from '../components/SEO';
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer/FooterLanguage';
import ForumBanner from '../components/ForumBanner';

const Layout = ({ children, location, pageContext: { locale, layout } }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
