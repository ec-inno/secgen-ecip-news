import React from 'react';
import { Link } from 'gatsby';

import plusSign from '../assets/plus.png';
import getCurrentLanguage from '../../utils/getCurrentLanguage';

const New = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

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
              to={`/${currentLanguage}/how-to`}
              className="ecl-link ecl-link--standalone"
            >
              How to start an initiative?
            </Link>
          </h1>
        </header>
      </article>
    </div>
  );
};

export default New;
