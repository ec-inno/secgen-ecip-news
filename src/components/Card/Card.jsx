import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const Card = ({
  title,
  status,
  background,
  href,
  totalSupporters,
  supportLink,
}) => {
  const { t } = useTranslation();

  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <span className="ecl-tag ecl-u-f-r eci-tag">{status}</span>
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
  totalSupporters: PropTypes.number,
  supportLink: PropTypes.string,
  background: PropTypes.string,
};

export default Card;
