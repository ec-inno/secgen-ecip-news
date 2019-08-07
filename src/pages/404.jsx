import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/SEO';
import getCurrentLanguage from '../utils/getCurrentLanguage';

const NotFound = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

  return (
    <>
      <SEO title="Not found" />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">404</h1>
              <p className="ecl-u-type-paragraph">
                Not found. Go <Link to={`/${currentLanguage}`}>home</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
