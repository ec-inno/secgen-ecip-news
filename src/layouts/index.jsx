import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';
import '../components/assets/custom.css';

// HOC providing i18n, locale and location to children.
import withI18next from '../i18n/withI18next';

import Head from '../components/Head';
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer/FooterLanguage';
import ForumBanner from '../components/ForumBanner';

const Layout = ({ children, location, pageContext: { layout, locale } }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [location]);

  if (layout === 'landing') return children;

  return (
    <>
      <Head htmlAttributes={{ lang: locale }} />
      <TopMessage />
      <Header />
      <Menu />
      {children}
      <ForumBanner />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default withI18next()(Layout);
