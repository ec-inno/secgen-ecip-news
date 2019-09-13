import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFree = ({ label, value, onChangeHandler, className }) => (
  <div
    className={classnames(
      'ecl-form-group ecl-form-group--text-input',
      className
    )}
  >
    <label className="ecl-form-label" htmlFor="filter-text-free">
      {label}
    </label>
    <input
      type="text"
      id="filter-text-free"
      className="filter-text-free"
      className="ecl-text-input"
      value={value}
      onChange={e => onChangeHandler(e.target.value)}
    />
  </div>
);

TextFree.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  className: PropTypes.string,
};

export default TextFree;
