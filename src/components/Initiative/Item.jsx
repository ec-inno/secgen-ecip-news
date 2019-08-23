import React, { useState, useEffect } from 'react';
import axios from 'axios';

import formatStatus from '../../utils/formatStatus';
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import defaultImage from '../assets/images/default-image.png';

const InitiativeItem = ({ item, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [logo, setLogo] = useState('');

  useEffect(() => {
    if (item.logo && item.logo.id) {
      axios
        .get(`${api}/register/logo/${item.logo.id}`, {
          responseType: 'arraybuffer',
        })
        .then(response => {
          const logoData = Buffer.from(response.data, 'binary').toString(
            'base64'
          );
          setLogo(logoData);
        })
        .catch(e => {
          console.error(`Failed to fetch logo ${item.logo.id}`, e);
        });
    }
  }, []);

  const background = logo
    ? `data:${item.logo.mimeType};base64,${logo}`
    : defaultImage;

  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <a href="#" className="ecl-tag ecl-u-f-r eci-tag">
          {formatStatus(item.status)}
        </a>
        <div
          className="ecl-card__image"
          alt={`Image of ${item.title} initiative`}
          style={{ backgroundImage: `url('${background}')` }}
        ></div>
        <h1 className="ecl-card__title">
          <a
            level="1"
            href={`/${language}/initiatives/#${item.id}`}
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
        {item.supportLink && (
          <ul className="ecl-card__link-container">
            <li className="ecl-card__link-item">
              <a
                target="_blank"
                href={item.supportLink}
                className="ecl-card__link ecl-link ecl-link--standalone"
              >
                {translation.support_cat}
              </a>
            </li>
          </ul>
        )}
      </section>
    </article>
  );
};

export default InitiativeItem;
