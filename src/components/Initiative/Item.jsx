import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import I18nContext from '../../context/I18n';

import getInitiativeStatusLabel from '../../utils/getInitiativeStatusLabel';

const InitiativeItem = ({ item }) => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);

  // Try to build a valid path which can display information about an initiative.
  let href = '#';
  if (item.year && item.number) {
    const { year, number } = item;
    href = `/${locale}/initiative/#${year}-${number}`;
  }

  const supporters =
    item.fundingSponsors && item.fundingSponsors.fundingSponsor
      ? item.fundingSponsors.fundingSponsor.length
      : undefined;

  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <a href="#" className="ecl-tag ecl-u-f-r eci-tag">
          {getInitiativeStatusLabel(item.searchEntry['@status'])}
        </a>
        <div
          className="ecl-card__image"
          alt="card image"
          // style="background-image: url('media/initiatives/eat_original-en.png');"
        ></div>
        <h1 className="ecl-card__title">
          <a level="1" href={href} className="ecl-link ecl-link--standalone">
            <span className="ecl-link__label">{item.title}</span>
          </a>
        </h1>
      </header>
      <section className="ecl-card__body">
        {supporters && (
          <p className="ecl-u-type-paragraph ecl-u-mv-none">
            {supporters} {t('Supporters')}
          </p>
        )}
      </section>
    </article>
  );
};

export default InitiativeItem;
