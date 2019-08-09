import React from 'react';
import { Link } from 'gatsby';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import plusSign from '../assets/images/plus.png';

const New = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  return (
    <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
      <article className="ecl-card ecl-card--plus">
        <header className="ecl-card__header">
          <div
            className="ecl-card__image"
            alt="card image"
            style={{ backgroundImage: `url(${plusSign})` }}
          ></div>
          <h1 className="ecl-card__title ecl-u-type-heading-3">
            <Link
              level="1"
              to={`/${language}/how-to-start`}
              className="ecl-link ecl-link--standalone"
            >
              {translation.how_to_start}
            </Link>
          </h1>
        </header>
      </article>
    </div>
  );
};

export default New;
