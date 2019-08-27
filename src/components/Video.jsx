import React from 'react';

import useTranslations from '../utils/useTranslations';

import image from '../components/assets/images/video-image.png';

const Video = () => {
  const translation = useTranslations('video');

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
