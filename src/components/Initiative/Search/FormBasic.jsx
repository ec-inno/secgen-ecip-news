import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Category from './filters/Category/index';

const FormBasic = ({ setFilters }) => {
  const { t } = useTranslation();

  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <form
      onSubmit={e => {
        const filters = {};
        e.preventDefault();

        if (category !== '' && category !== 'any') {
          filters.CATEGORY = [category];
        }

        if (keyword !== '') {
          filters.TEXT_FREE = [keyword];
        }

        setFilters({ filters });
      }}
    >
      <div className="ecl-row">
        <div className="ecl-col-sm-12 ecl-col-md-5">
          <Category value={category} onChangeHandler={setCategory} />
        </div>

        <div className="ecl-col-sm-12 ecl-col-md-5">
          <div className="ecl-form-group ecl-form-group--text-input">
            <label className="ecl-form-label" htmlFor="filter-keyword">
              {t('Filter by keyword')}
            </label>
            <input
              type="text"
              id="filter-keyword"
              className="filter-keyword"
              className="ecl-text-input"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
          </div>
        </div>

        <div className="ecl-col-sm-12 ecl-col-md-2 ecl-u-d-flex ecl-u-align-items-end">
          <button type="submit" className="ecl-button ecl-button--primary">
            <span className="ecl-button__container">
              <span className="ecl-button__label" data-ecl-label="true">
                {t('Apply filters')}
              </span>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormBasic;
