import React from 'react';
import iconsSpritePath from '@ecl/ec-preset-website/dist/images/icons/sprites/icons.svg';

const LanguageSwitcher = ({ languages, location, hideOverlay }) => {
  const showOverlay = e => {
    console.log(e.target);
    hideOverlay(false);
  };

  return (
    <div className="ecl-site-header__selector">
      <a
        onClick={showOverlay}
        className="ecl-link ecl-link--standalone"
        href="#"
        data-ecl-language-selector="true"
        aria-expanded="true"
      >
        English
        <span className="ecl-site-header__language-icon">
          <svg
            focusable="false"
            aria-hidden="true"
            className="ecl-icon ecl-icon--m"
          >
            <use xlinkHref={`${iconsSpritePath}#general--language`} />
          </svg>
          <span className="ecl-site-header__language-code">en</span>
        </span>
      </a>
    </div>
  );
};

export default LanguageSwitcher;
