import React, { useState } from 'react';
import { Link } from 'gatsby';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const SearchForm = ({ location, setFilters }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="ecl-u-pa-m eci-filter ecl-u-mv-xl">
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
            <div className="ecl-form-group ecl-form-group--select">
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

          <div className="ecl-col-sm-12 ecl-col-md-5">
            <div className="ecl-form-group ecl-form-group--text-input">
              <label className="ecl-form-label" htmlFor="filter-keyword">
                {translation.filter_keyword}
              </label>
              <input
                type="text"
                id="filter-keyword"
                name="filter-keyword"
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
                  {translation.filter_button}
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
      <p className="ecl-u-type-paragraph ecl-u-mb-none">
        <Link className="ecl-link" to={`/${language}/find-initiative`}>
          {translation.get_more_filters}
        </Link>
      </p>
    </div>
  );
};

export default SearchForm;
