import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import svg4everybody from 'svg4everybody';
import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import './styles.css';

import OverlayContext from '../context/Overlay';

// HOC providing i18n, locale and location.
import withI18next from '../i18n/withI18next';

import Head from '../components/Head';
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import ForumBanner from '../components/ForumBanner';

const Layout = ({ children, location, pageContext: { layout, locale } }) => {
  const [overlayIsHidden, setOverlayIsHidden] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);

    // IE fix for SVGs.
    if (typeof window !== 'undefined') {
      svg4everybody();
    }
  }, [location]);

  return (
    <>
      <OverlayContext.Provider value={{ overlayIsHidden, setOverlayIsHidden }}>
        {layout === 'landing' ? (
          children
        ) : (
          <>
            <Head htmlAttributes={{ lang: locale }} />
            <TopMessage />
            <Header />
            <Menu />
            {children}
            <ForumBanner />
            <Footer />
          </>
        )}
      </OverlayContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default withI18next()(Layout);
