import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import defaultImage from '../assets/images/default-image.png';
import formatStatus from '../../utils/formatStatus';

const Card = ({ title, status, logo, href, totalSupporters, supportLink }) => {
  const { t } = useTranslation();
  const [logoData, setLogoData] = useState('');

  const { GATSBY_INITIATIVES_API: api } = process.env;
  const hasLogo = logo && logo.id && logo.mimeType;

  useEffect(() => {
    if (hasLogo) {
      axios
        .get(`${api}/register/logo/${logo.id}`, {
          responseType: 'arraybuffer',
        })
        .then(r => {
          const data = Buffer.from(r.data, 'binary').toString('base64');
          setLogoData(data);
        })
        .catch(e => {
          console.error(`Failed to fetch logo ${logo.id}`, e);
        });
    }
  }, []);

  const background = hasLogo
    ? `data:${logo.mimeType};base64,${logoData}`
    : defaultImage;

  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <span className="ecl-tag ecl-u-f-r eci-tag">
          {formatStatus(status)}
        </span>
        <div
          role="img"
          className="ecl-card__image"
          aria-label={title}
          style={{
            backgroundImage: `url('${background}')`,
          }}
        ></div>
        <h1 className="ecl-card__title">
          <Link
            to={href}
            className="ecl-link ecl-link--standalone"
            aria-label={title}
            level="1"
          >
            {title}
          </Link>
        </h1>
      </header>
      <section className="ecl-card__body">
        <p className="ecl-u-type-paragraph ecl-u-mv-none">
          {totalSupporters} {t('supporters')}
        </p>
        {supportLink && (
          <ul className="ecl-card__link-container">
            <li className="ecl-card__link-item">
              <a
                target="_blank"
                href={supportLink}
                className="ecl-card__link ecl-link ecl-link--standalone"
              >
                {t('Support this initiative')}
              </a>
            </li>
          </ul>
        )}
      </section>
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.string,
  totalSupporters: PropTypes.string,
  supportLink: PropTypes.string,
  logo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mimeType: PropTypes.string,
    size: PropTypes.number,
  }),
};

export default Card;
