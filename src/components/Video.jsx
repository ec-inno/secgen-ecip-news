import React from 'react';
import { useTranslation } from 'react-i18next';

import image from '../components/assets/images/video-image.png';

const Video = () => {
  const { t } = useTranslation();

  return (
    <figure className="ecl-media-container">
      <img
        className="ecl-media-container__media"
        src={image}
        alt={t("The European Citizens' Initiative in video.")}
      />
      <figcaption className="ecl-media-container__caption">
        {t("The European Citizens' Initiative in video.")}
      </figcaption>
    </figure>
  );
};

export default Video;
