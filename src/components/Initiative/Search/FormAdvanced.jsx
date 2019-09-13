import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowDD from '../../ArrowDD';
import Select from '../../Select';
import TextInput from '../../TextInput';
import Button from '../../Button';

import getCategories from '../../../utils/getCategoriesTranslated';
import getLanguages from '../../../utils/getLanguagesTranslated';

const FormAdvanced = ({ setFilters }) => {
  const { t } = useTranslation();

  const categories = getCategories(t);
  const languages = getLanguages(t);

  const [textFree, setTextFree] = useState('');
  const [textExact, setTextExact] = useState('');
  const [textConditional, setTextConditional] = useState('');
  const [organisers, setOrganisers] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [initiativeLanguage, setInitiativeLanguage] = useState('');

  return (
    <form
      onSubmit={e => {
        // Place for validations.
        const filters = {};
        e.preventDefault();

        if (textFree !== '') {
          filters.TEXT_FREE = [textFree];
        }

        if (textExact !== '') {
          filters.TEXT_EXACT = [textExact];
        }

        if (textConditional !== '') {
          const parts = textConditional.split(' ');
          filters.TEXT_CONDITIONAL = parts;
        }

        if (organisers !== '') {
          filters.ORGANISERS = [organisers];
        }

        if (dateFrom !== '') {
          filters.DATE_FROM = [dateFrom];
        }

        if (dateTo !== '') {
          filters.DATE_TO = [dateTo];
        }

        if (category !== '' && category !== 'any') {
          filters.CATEGORY = [category];
        }

        if (status !== '' && status !== 'any') {
          filters.STATUS = [status];
        }

        if (initiativeLanguage !== '') {
          filters.LANGUAGE = [initiativeLanguage];
        }

        setFilters({ filters });
      }}
    >
      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-free"
        label={t('All these words')}
        value={textFree}
        onChange={e => setTextFree(e.target.value)}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-exact"
        label={t('Exact wording or phrase')}
        value={textExact}
        onChange={e => setTextExact(e.target.value)}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-conditional"
        label={t('One or more of')}
        value={textConditional}
        onChange={e => setTextConditional(e.target.value)}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-organisers"
        label={t('Organiser')}
        value={organisers}
        onChange={e => setOrganisers(e.target.value)}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-date-from"
        label={t('From')}
        value={dateFrom}
        onChange={e => setDateFrom(e.target.value)}
        helperText={t('dd/mm/yyyy')}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-date-to"
        label={t('To')}
        value={dateTo}
        onChange={e => setDateTo(e.target.value)}
        helperText={t('dd/mm/yyyy')}
      />

      <Select
        id="filter-category"
        label={t('Filter by category')}
        groupClassName="ecl-u-mb-s"
        value={category}
        options={categories}
        onChange={e => setCategory(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-status"
        label={t('Status')}
        groupClassName="ecl-u-mb-s"
        value={status}
        options={[
          { value: 'any', label: '' },
          { value: 'ALL', label: t('All') },
          { value: 'OPEN', label: t('Open') },
          { value: 'SUCCESSFUL', label: t('Successful') },
          { value: 'ARCHIVED', label: t('Archived') },
        ]}
        onChange={e => setStatus(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-language"
        label={t('Language')}
        groupClassName="ecl-u-mb-s"
        value={initiativeLanguage}
        options={languages}
        onChange={e => setInitiativeLanguage(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Button label={t('Apply filters')} />
    </form>
  );
};

export default FormAdvanced;
