import React from 'react';

// Generic utils.
import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

// Generic
import SEO from '../components/SEO';
import SearchResults from '../components/Initiative/SearchResults';

const FindInitiative = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../translations/initiative/${language}.json`);

  return (
    <>
      <SEO location={location} title={translation.search} />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">{translation.search}</h1>
          </div>
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <SearchResults location={location} />
        </div>
      </main>
    </>
  );
};

export default FindInitiative;