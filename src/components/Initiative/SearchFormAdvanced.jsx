import React, { useState } from 'react';

import { languages } from '../../../languages';
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const SearchForm = ({ location, setFilters }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

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
    <div className="ecl-u-pa-m eci-filter">
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
        <fieldset className="ecl-fieldset ecl-u-mb-s">
          <legend className="ecl-form-legend ecl-form-legend--level-1">
            {translation.find_initiatives}
          </legend>

          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-text-free">
                  all these words:
                </label>
                <input
                  type="text"
                  id="filter-text-free"
                  name="filter-text-free"
                  className="ecl-text-input"
                  value={textFree}
                  onChange={e => setTextFree(e.target.value)}
                />
              </div>
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-text-exact">
                  this exact wording or phrase:
                </label>
                <input
                  type="text"
                  id="filter-text-exact"
                  name="filter-text-exact"
                  className="ecl-text-input"
                  value={textExact}
                  onChange={e => setTextExact(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label
                  className="ecl-form-label"
                  htmlFor="filter-text-conditional"
                >
                  one or more of these words:
                </label>
                <input
                  type="text"
                  id="filter-text-conditional"
                  name="filter-text-conditional"
                  className="ecl-text-input"
                  value={textConditional}
                  onChange={e => setTextConditional(e.target.value)}
                />
              </div>
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-organisers">
                  one of whose organiser is:
                </label>
                <input
                  type="text"
                  id="filter-organisers"
                  name="filter-organisers"
                  className="ecl-text-input"
                  value={organisers}
                  onChange={e => setOrganisers(e.target.value)}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="ecl-fieldset ecl-u-mb-s">
          <legend className="ecl-form-legend ecl-form-legend--level-1">
            whose date of registration is between ...
          </legend>

          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-date-from">
                  from (format: dd/mm/yyyy)
                </label>
                <input
                  type="text"
                  id="filter-date-from"
                  name="filter-date-from"
                  className="ecl-text-input"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                />
              </div>
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-6">
              <div className="ecl-form-group ecl-form-group--text-input ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-date-to">
                  to (format: dd/mm/yyyy)
                </label>
                <input
                  type="text"
                  id="filter-date-to"
                  name="filter-date-to"
                  className="ecl-text-input"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="ecl-fieldset ecl-u-mb-s">
          <legend className="ecl-form-legend ecl-form-legend--level-1">
            has the following attributes ...
          </legend>

          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-category">
                  {translation.filter_category}
                </label>
                <div className="ecl-select__container">
                  <select
                    id="filter-category"
                    name="filter-category"
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
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-status">
                  whose status is:
                </label>
                <div className="ecl-select__container">
                  <select
                    id="filter-status"
                    name="filter-status"
                    className="ecl-select"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value="any">{''}</option>
                  </select>
                  <div
                    className="ecl-select__icon ecl-u-type-heading-1"
                    style={{ color: '#fff' }}
                  >
                    ▾
                  </div>
                </div>
              </div>
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <div className="ecl-form-group ecl-form-group--select ecl-u-mb-s">
                <label className="ecl-form-label" htmlFor="filter-language">
                  in this language:
                </label>
                <div className="ecl-select__container">
                  <select
                    id="filter-language"
                    name="filter-language"
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
            </div>
          </div>
        </fieldset>

        <div className="ecl-u-d-flex ecl-u-justify-content-end">
          <button type="submit" className="ecl-button ecl-button--primary">
            <span className="ecl-button__container">
              <span className="ecl-button__label" data-ecl-label="true">
                {translation.filter_button}
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
