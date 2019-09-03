import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import I18nContext from '../../../context/I18n';

import { languages } from '../../../../languages';

const FormAdvanced = setFilters => {
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
      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-text-free">
          {t('All these words')}
        </label>
        <input
          type="text"
          id="filter-text-free"
          className="filter-text-free"
          className="ecl-text-input"
          value={textFree}
          onChange={e => setTextFree(e.target.value)}
        />
      </div>
      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-text-exact">
          {t('Exact wording or phrase')}
        </label>
        <input
          type="text"
          id="filter-text-exact"
          className="filter-text-exact"
          className="ecl-text-input"
          value={textExact}
          onChange={e => setTextExact(e.target.value)}
        />
      </div>
      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-text-conditional">
          {t('One or more of')}
        </label>
        <input
          type="text"
          id="filter-text-conditional"
          className="filter-text-conditional"
          className="ecl-text-input"
          value={textConditional}
          onChange={e => setTextConditional(e.target.value)}
        />
      </div>
      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-organisers">
          {t('Organiser')}
        </label>
        <input
          type="text"
          id="filter-organisers"
          className="filter-organisers"
          className="ecl-text-input"
          value={organisers}
          onChange={e => setOrganisers(e.target.value)}
        />
      </div>

      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-date-from">
          {t('From (format: dd/mm/yyyy)')}
        </label>
        <input
          type="text"
          id="filter-date-from"
          className="filter-date-from"
          className="ecl-text-input"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
        />
      </div>
      <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-date-to">
          {t('To (format: dd/mm/yyyy)')}
        </label>
        <input
          type="text"
          id="filter-date-to"
          className="filter-date-to"
          className="ecl-text-input"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
        />
      </div>

      <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
        <label className="ecl-form-label" htmlFor="filter-category">
          {t('Filter by category')}
        </label>
        <div className="ecl-select__container">
          <select
            id="filter-category"
            className="filter-category"
            className="ecl-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="any">{t('any')}</option>
            <option value="AGRI">{t('AGRI')}</option>
            <option value="DEVCO">{t('DEVCO')}</option>
            <option value="EURO">{t('EURO')}</option>
            <option value="SANTE">{t('SANTE')}</option>
            <option value="CULT">{t('CULT')}</option>
            <option value="DECO">{t('DEVCO')}</option>
            <option value="EDU">{t('EDU')}</option>
            <option value="EMPL">{t('EMPL')}</option>
            <option value="ENER">{t('ENER')}</option>
            <option value="ENV">{t('ENV')}</option>
            <option value="TRADE">{t('TRADE')}</option>
            <option value="JUST">{t('JUST')}</option>
            <option value="MARE">{t('MARE')}</option>
            <option value="MIGR">{t('MIGR')}</option>
            <option value="REGIO">{t('REGIO')}</option>
            <option value="RSH">{t('RSH')}</option>
            <option value="SEC">{t('SEC')}</option>
            <option value="TRA">{t('TRA')}</option>
            <option value="REGFRA">{t('REGFRA')}</option>
            <option value="REGECI">{t('REGECI')}</option>
            <option value="COLLECI">{t('COLLECI')}</option>
            <option value="EXAECI">{t('EXAECI')}</option>
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
            {languages.map(l => (
              <option value={l.lang}>{l.label}</option>
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
