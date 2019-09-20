import React from 'react';
import PropTypes from 'prop-types';

import { useOverlayContext } from '../../context/Overlay';

import Icon from '../Icon';

const LanguageSelector = ({ href, name, code }) => {
  const { setOverlayIsHidden } = useOverlayContext();

  return (
    <div className="ecl-site-header__selector">
      <a
        onClick={e => {
          e.preventDefault();
          setOverlayIsHidden(false);
        }}
        className="ecl-link ecl-link--standalone"
        href={href}
        data-ecl-language-selector
      >
        {name}
        <span className="ecl-site-header__language-icon">
          <Icon shape="general--language" size="m" />
          <span className="ecl-site-header__language-code">{code}</span>
        </span>
      </a>
    </div>
  );
};

LanguageSelector.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
};

LanguageSelector.defaultProps = {
  href: '',
  name: '',
  code: '',
};

export default LanguageSelector;
