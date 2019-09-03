import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import I18nContext from '../../context/I18n';

import plusSign from '../assets/images/plus.png';

const New = () => {
  const { locale } = useContext(I18nContext);
  const { t } = useTranslation();

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
              to={`/${locale}/how-to-start`}
              className="ecl-link ecl-link--standalone"
            >
              {t('How to start an initiative?')}
            </Link>
          </h1>
        </header>
      </article>
    </div>
  );
};

export default New;
