import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowDD from '../../ArrowDD';
import Select from '../../Select';
import TextInput from '../../TextInput';
import Button from '../../Button';

import getCategories from '../../../utils/getCategoriesTranslated';

const FormBasic = ({ setFilters }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  const categories = getCategories(t);

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
          <Select
            id="filter-category"
            label={t('Filter by category')}
            value={category}
            options={categories}
            onChange={e => setCategory(e.target.value)}
            arrow={<ArrowDD />}
          />
        </div>

        <div className="ecl-col-sm-12 ecl-col-md-5">
          <TextInput
            id="filter-text-keywords"
            label={t('Filter by keyword')}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <div className="ecl-col-sm-12 ecl-col-md-2 ecl-u-d-flex ecl-u-align-items-end">
          <Button label={t('Apply filters')} />
        </div>
      </div>
    </form>
  );
};

export default FormBasic;
