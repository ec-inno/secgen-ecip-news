import React from 'react';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import defaultImage from '../assets/images/default-image.png';

const formatStatus = s => {
  if (typeof s !== 'string') return s;
  return (
    s.charAt(0).toUpperCase() +
    s
      .slice(1)
      .toLowerCase()
      .replace('_', ' ')
  );
};

const InitiativeItem = ({ item, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <a href="#" className="ecl-tag ecl-u-f-r eci-tag">
          {formatStatus(item.status)}
        </a>
        <div
          className="ecl-card__image"
          alt="card image"
          style={{ backgroundImage: `url('${defaultImage}')` }}
        ></div>
        <h1 className="ecl-card__title">
          <a
            level="1"
            href={`/${language}/initiative/#${item.id}`}
            className="ecl-link ecl-link--standalone"
          >
            <span className="ecl-link__label">{item.title}</span>
          </a>
        </h1>
      </header>
      <section className="ecl-card__body">
        <p className="ecl-u-type-paragraph ecl-u-mv-none">
          {item.totalSupporters} {translation.supporters}
        </p>
      </section>
    </article>
  );
};

export default InitiativeItem;
