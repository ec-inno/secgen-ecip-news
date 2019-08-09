import React from 'react';
import { Link } from 'gatsby';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

import SEO from '../components/SEO';

const NotFound = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../translations/notfound/${language}.json`);

  const { title, description, message, back } = translation;

  return (
    <>
      <SEO location={location} title={title} description={description} />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">{title}</h1>
              <p className="ecl-u-type-paragraph">
                {message} <Link to={`/${language}`}>{back}</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
