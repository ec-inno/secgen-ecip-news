import React from 'react';

import Header from '../components/Header';

const Initiative = ({ location }) => {
  if (location && location.pathname) {
    const { pathname } = location;
    const pathParts = pathname.split('/').filter(a => a);
    const initiativeParts = pathParts[1].split('-');
    const [status, year, number] = initiativeParts;

    console.log(status, year, number);
  }

  return (
    <>
      <Header />
      <div>Details</div>
    </>
  );
};

export default Initiative;
