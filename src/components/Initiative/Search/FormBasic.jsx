import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Category from './filters/Category';
import TextField from './filters/TextField';

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
          <TextField
            label={t('Filter by keyword')}
            value={keyword}
            onChangeHandler={setKeyword}
          />
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
