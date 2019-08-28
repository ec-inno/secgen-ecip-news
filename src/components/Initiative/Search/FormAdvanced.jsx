import React, { useState } from 'react';

import { languages } from '../../../../languages';
import getCurrentLanguage from '../../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../../utils/getDefaultLanguage';

const FormAdvanced = ({ location, setFilters }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../../translations/initiative/${language}.json`);

  const [textFree, setTextFree] = useState('');
  const [textExact, setTextExact] = useState('');
  const [textConditional, setTextConditional] = useState('');
  const [organisers, setOrganisers] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [initiativeLanguage, setInitiativeLanguage] = useState(language);

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
          All these words
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
          Exact wording or phrase
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
          One or more of
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
          Organiser
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
          From (format: dd/mm/yyyy)
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
          To (format: dd/mm/yyyy)
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
          {translation.filter_category}
        </label>
        <div className="ecl-select__container">
          <select
            id="filter-category"
            className="filter-category"
            className="ecl-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="any">{translation.any}</option>
            <option value="AGRI">{translation.AGRI}</option>
            <option value="DEVCO">{translation.DEVCO}</option>
            <option value="EURO">{translation.EURO}</option>
            <option value="SANTE">{translation.SANTE}</option>
            <option value="CULT">{translation.CULT}</option>
            <option value="DECO">{translation.DEVCO}</option>
            <option value="EDU">{translation.EDU}</option>
            <option value="EMPL">{translation.EMPL}</option>
            <option value="ENER">{translation.ENER}</option>
            <option value="ENV">{translation.ENV}</option>
            <option value="TRADE">{translation.TRADE}</option>
            <option value="JUST">{translation.JUST}</option>
            <option value="MARE">{translation.MARE}</option>
            <option value="MIGR">{translation.MIGR}</option>
            <option value="REGIO">{translation.REGIO}</option>
            <option value="RSH">{translation.RSH}</option>
            <option value="SEC">{translation.SEC}</option>
            <option value="TRA">{translation.TRA}</option>
            <option value="REGFRA">{translation.REGFRA}</option>
            <option value="REGECI">{translation.REGECI}</option>
            <option value="COLLECI">{translation.COLLECI}</option>
            <option value="EXAECI">{translation.EXAECI}</option>
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
          Status
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
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="SUCCESSFUL">Successful</option>
            <option value="ARCHIVED">Archived</option>
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
          Language
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
            {translation.filter_button}
          </span>
        </span>
      </button>
    </form>
  );
};

export default FormAdvanced;
