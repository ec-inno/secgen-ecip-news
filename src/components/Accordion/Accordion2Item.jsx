/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../Icon';

const Accordion2Item = ({ id, toggle, onClick, level, children }) => {
  const HeadingTag = `h${level || 3}`;

  return (
    <div className="ecl-accordion2__item">
      {!!(toggle && toggle.label) && (
        <HeadingTag className="ecl-accordion2__title">
          <button
            type="button"
            className={classnames(toggle.className, 'ecl-accordion2__toggle')}
            data-ecl-accordion2-toggle
            aria-controls={`${id}-content`}
            onClick={onClick}
          >
            <span className="ecl-accordion2__toggle-flex">
              <Icon
                className="ecl-accordion2__toggle-icon"
                shape={toggle.iconShape}
                size="m"
                data-ecl-accordion2-icon
              />
              <span className="ecl-accordion2__toggle-title">
                {toggle.label}
              </span>
            </span>
          </button>
        </HeadingTag>
      )}

      <div
        className="ecl-accordion2__content"
        id={`${id}-content`}
        hidden
        role="region"
      >
        {children}
      </div>
    </div>
  );
};

Accordion2Item.propTypes = {
  id: PropTypes.string,
  toggle: PropTypes.shape({
    label: PropTypes.string,
    iconShape: PropTypes.string,
  }),
  onClick: PropTypes.func,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
};

Accordion2Item.defaultProps = {
  id: '',
  toggle: {},
  onClick: null,
  level: null,
  children: null,
};

export default Accordion2Item;
