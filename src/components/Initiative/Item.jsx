import React from 'react';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getInitiativeStatusLabel from '../../utils/getInitiativeStatusLabel';

const InitiativeItem = ({ item, location }) => {
  const currentLanguage = getCurrentLanguage(location);

  let href = '#';
  const isOpen = item.searchEntry['@status'] === 'OPEN';

  // Set correct address for the initiative's link.
  if (item.year && item.number) {
    const { year, number } = item;

    switch (item.searchEntry['@status']) {
      case 'OPEN': {
        href = `/${currentLanguage}/initiatives/#open-${year}-${number}`;
        break;
      }

      case 'SUCCESSFUL': {
        href = `/${currentLanguage}/initiatives/#successful-${year}-${number}`;
        break;
      }

      case 'WITHDRAWN':
      case 'INSUFFICIENT_SUPPORT': {
        href = `/${currentLanguage}/initiatives/obsolete-${year}-${number}`;
        break;
      }

      default:
        break;
    }
  }

  const supporters =
    item.fundingSponsors && item.fundingSponsors.fundingSponsor
      ? item.fundingSponsors.fundingSponsor.length
      : 0;

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
        {supporters ? (
          <p className="ecl-u-type-paragraph ecl-u-mv-none">
            {supporters} supporters
          </p>
        ) : (
          ''
        )}
        {isOpen ? (
          <ul className="ecl-card__link-container">
            <li className="ecl-card__link-item">
              <a
                href="#"
                className="ecl-card__link ecl-link ecl-link--standalone"
              >
                Support this initiative
              </a>
            </li>
          </ul>
        ) : (
          ''
        )}
      </section>
    </article>
  );
};

export default InitiativeItem;
