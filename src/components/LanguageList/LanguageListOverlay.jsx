import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../Button';
import Icon from '../Icon';

import LanguageList from './LanguageList';

const LanguageListOverlay = ({
  closeHandler,
  closeLabel,
  title,
  items,
  className,
  ...props
}) => {
  const classNames = classnames(
    className,
    'ecl-language-list',
    'ecl-language-list--overlay'
  );

  return (
    <div {...props} className={classNames} data-ecl-language-list-overlay>
      <div className="ecl-language-list__container ecl-container">
        <div className="ecl-row">
          <div className="ecl-language-list__close ecl-col-12 ecl-col-lg-8 ecl-offset-lg-2">
            <Button
              onClick={() => closeHandler()}
              variant="ghost"
              label={closeLabel}
              icon={{ shape: 'ui--close', size: 's' }}
              className="ecl-language-list__close-button"
              data-ecl-language-list-close
            />
          </div>
          <div className="ecl-language-list__title ecl-col-12 ecl-col-lg-8 ecl-offset-lg-2">
            <Icon
              shape="general--generic-lang"
              size="m"
              className="ecl-language-list__title-icon"
            />
            {title}
          </div>
        </div>
        <LanguageList items={items} isOverlay />
      </div>
    </div>
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
  className: PropTypes.string,
};

LanguageListOverlay.defaultProps = {
  closeLabel: '',
  title: '',
  items: [],
  className: '',
};

export default LanguageListOverlay;
