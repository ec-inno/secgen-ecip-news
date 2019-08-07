import React from 'react';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

import image from '../images/bg-forum.png';
import Button from '../components/Button';

const ForumBanner = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const arrowIcon = {
    shape: 'ui--corner-arrow',
    size: 'xs',
    transform: 'rotate-90',
  };

  const data = require(`../data/forumbanner/${language}.json`);
  const { message, button } = data;

  return (
    <section className="ecl-page-banner ecl-page-banner--image-shade ecl-page-banner--centered ecl-u-mt-l">
      <div
        className="ecl-page-banner__image"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className="ecl-container ecl-page-banner__container">
        <div className="ecl-page-banner__content">
          <h1 className="ecl-page-banner__title">{message}</h1>
          <Button
            className="ecl-page-banner__button"
            variant="call"
            label={button}
            icon={arrowIcon}
            iconPosition="after"
          />
        </div>
      </div>
    </section>
  );
};

export default ForumBanner;
