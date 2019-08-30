import React from 'react';
import PropTypes from 'prop-types';

import '@ecl/eu-preset-website/dist/styles/ecl-eu-preset-website.css';
import '../components/assets/styles.css';
import '../components/assets/custom.css';

import withI18next from '../i18n/withI18next';

import SEO from '../components/SEO';
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer/FooterLanguage';
import ForumBanner from '../components/ForumBanner';

const Layout = ({ children, pageContext: { layout } }) => {
  if (layout === 'landing') return children;

  return (
    <>
      <SEO />
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
