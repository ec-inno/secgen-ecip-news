import React from 'react';
import { useTranslation } from 'react-i18next';

import image from './assets/images/bg-forum.png';
import Link from '../components/Link/LinkEcl';

const ForumBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="ecl-page-banner ecl-page-banner--image-shade ecl-page-banner--centered ecl-u-mt-l">
      <div
        className="ecl-page-banner__image"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className="ecl-container ecl-page-banner__container">
        <div className="ecl-page-banner__content">
          <h1 className="ecl-page-banner__title">
            {t('Want to learn and collaborate?')}
          </h1>
          <Link
            href="#"
            className="ecl-page-banner__button"
            variant="cta"
            label={t('Join the forum')}
            icon={{
              shape: 'ui--corner-arrow',
              size: 'xs',
              transform: 'rotate-90',
            }}
            iconPosition="after"
          />
        </div>
      </div>
    </section>
  );
};

export default ForumBanner;
