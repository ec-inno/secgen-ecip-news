import React from 'react';

import TopMessage from '../components/TopMessage';
import Header from '../components/Header';

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
      <div>Details</div>
    </>
  );
};

export default Initiative;
