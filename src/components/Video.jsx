import React from 'react';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

import image from '../components/assets/images/video-image.png';

const Video = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const translation = require(`../../translations/video/${language}.json`);
  const { caption } = translation;

  return (
    <figure className="ecl-media-container">
      <img className="ecl-media-container__media" src={image} alt={caption} />
      <figcaption className="ecl-media-container__caption">
        {caption}
      </figcaption>
    </figure>
  );
};

export default Video;
