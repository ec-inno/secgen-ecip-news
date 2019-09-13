import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import getOptions from './getOptions';

const Category = ({ value, onChangeHandler, className }) => {
  const { t } = useTranslation();
  const options = getOptions(t);

  return (
    <div
      className={classnames('ecl-form-group ecl-form-group--select', className)}
    >
      <label className="ecl-form-label" htmlFor="filter-category">
        {t('Filter by category')}
      </label>
      <div className="ecl-select__container">
        <select
          id="filter-category"
          className="filter-category"
          className="ecl-select"
          value={value}
          onChange={e => onChangeHandler(e.target.value)}
        >
          {Object.keys(options).map((value, i) => (
            <option value={value} key={i}>
              {options[value]}
            </option>
          ))}
        </select>
        <div
          className="ecl-select__icon ecl-u-type-heading-1"
          style={{ color: '#fff' }}
        >
          ▾
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  className: PropTypes.string,
};

export default Category;
