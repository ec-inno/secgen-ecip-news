import React from 'react';
import PropTypes from 'prop-types';

import iconsSpritePath from '@ecl/ec-preset-website/dist/images/icons/sprites/icons.svg';

import ContextConsumer from '../../Context';

import LanguageList from './LanguageList';

// @see https://github.com/ec-europa/europa-component-library/blob/v2-dev/src/systems/ec/implementations/react/page-structure/language-list/src/LanguageListOverlay.jsx
const LanguageListOverlay = ({ closeLabel, title, items }) => {
  return (
    <ContextConsumer>
      {({ data, set }) => {
        const { LanguageListOverlayIsHidden } = data;

        return (
          <div
            className="ecl-language-list ecl-language-list--overlay"
            data-ecl-language-list-overlay
            hidden={LanguageListOverlayIsHidden}
          >
            <div className="ecl-language-list__container ecl-container">
              <div className="ecl-row">
                <div className="ecl-language-list__close ecl-col-12 ecl-col-lg-8 ecl-offset-lg-2">
                  <button
                    onClick={() => set({ LanguageListOverlayIsHidden: true })}
                    data-ecl-language-list-close="true"
                    type="submit"
                    className="ecl-language-list__close-button ecl-button ecl-button--ghost"
                  >
                    <span className="ecl-button__container">
                      <span className="ecl-button__label" data-ecl-label="true">
                        {closeLabel}
                      </span>
                      <svg
                        focusable="false"
                        aria-hidden="true"
                        data-ecl-icon="true"
                        className="ecl-button__icon ecl-button__icon--after ecl-icon ecl-icon--s"
                      >
                        <use xlinkHref={`${iconsSpritePath}#ui--close`}></use>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="ecl-language-list__title ecl-col-12 ecl-col-lg-8 ecl-offset-lg-2">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    className="ecl-language-list__title-icon ecl-icon ecl-icon--m"
                  >
                    <use
                      xlinkHref={`${iconsSpritePath}#general--generic-lang`}
                    ></use>
                  </svg>
                  {title}
                </div>
              </div>
              <LanguageList items={items} isOverlay />
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
};

LanguageListOverlay.propTypes = {
  closeLabel: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
};

export default LanguageListOverlay;
