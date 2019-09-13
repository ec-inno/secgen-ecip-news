import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Category from './filters/Category';
import TextInput from '../../TextInput';

import I18nContext from '../../../context/I18n';

import { languages } from '../../../../languages';

const FormAdvanced = ({ setFilters }) => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);

  const [textFree, setTextFree] = useState('');
  const [textExact, setTextExact] = useState('');
  const [textConditional, setTextConditional] = useState('');
  const [organisers, setOrganisers] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [initiativeLanguage, setInitiativeLanguage] = useState(locale);

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

      <Category
        className="ecl-u-mb-s"
        value={category}
        onChangeHandler={setCategory}
      />

      <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-status">
          {t('Status')}
        </label>
        <div className="ecl-select__container">
          <select
            id="filter-status"
            className="filter-status"
            className="ecl-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="any">{''}</option>
            <option value="ALL">{t('All')}</option>
            <option value="OPEN">{t('Open')}</option>
            <option value="SUCCESSFUL">{t('Successful')}</option>
            <option value="ARCHIVED">{t('Archived')}</option>
          </select>
          <div
            className="ecl-select__icon ecl-u-type-heading-1"
            style={{ color: '#fff' }}
          >
            ▾
          </div>
        </div>
      </div>
      <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-language">
          {t('Language')}
        </label>
        <div className="ecl-select__container">
          <select
            id="filter-language"
            className="filter-language"
            className="ecl-select"
            value={initiativeLanguage}
            onChange={e => setInitiativeLanguage(e.target.value)}
          >
            {languages.map((l, i) => (
              <option value={l.lang} key={i}>
                {l.label}
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

      <button
        type="submit"
        className="ecl-u-mt-l ecl-button ecl-button--primary"
      >
        <span className="ecl-button__container">
          <span className="ecl-button__label" data-ecl-label="true">
            {t('Apply filters')}
          </span>
        </span>
      </button>
    </form>
  );
};

export default FormAdvanced;
