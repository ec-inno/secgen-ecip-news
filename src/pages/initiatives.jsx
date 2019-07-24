import React from 'react';

// This is a client-side page in Gatsby, so it will use partials/components without `location` parameter.
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ForumBanner from '../components/ForumBanner';
import Footer from '../components/Footer/FooterLanguage';

const Initiative = ({ location }) => {
  const hash = location.hash || '#';
  const parts = hash.slice(1).split('-');

  if (parts && parts.length) {
    const [status, year, number] = parts;
    console.log(status, year, number);
  }

  return (
    <>
      <TopMessage />
      <Header />
      <Menu />
      <div>Details</div>
      <ForumBanner />
      <Footer />
    </>
  );
};

export default Initiative;
