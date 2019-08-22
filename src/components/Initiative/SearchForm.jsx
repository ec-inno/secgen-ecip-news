import React from 'react';
import { Link } from 'gatsby';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const SearchForm = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  return (
    <div className="ecl-u-pa-m eci-filter ecl-u-mv-xl">
      <form>
        <div className="ecl-row">
          <div className="ecl-col-sm-12 ecl-col-md-5">
            <div className="ecl-form-group ecl-form-group--select">
              <label className="ecl-form-label" for="select-id">
                Filter by category
              </label>
              <div className="ecl-select__container">
                <select
                  id="select-id"
                  name="select-name"
                  className="ecl-select"
                >
                  <option selected="">All categories</option>
                  <option>Agriculture</option>
                  <option>Aid and development cooperation</option>
                  <option>Business and economy</option>
                  <option>Consumers and health</option>
                  <option>Culture and media</option>
                  <option>Digital economy and society</option>
                  <option>Education, youth and sport</option>
                  <option>Employment and social affairs</option>
                  <option>Energy</option>
                  <option>Environment and climate</option>
                  <option>External trade and relations</option>
                  <option>Justice and fundamental rights</option>
                  <option>Maritime affairs and fisheries</option>
                  <option>Migration and asylum</option>
                  <option>Regional development</option>
                  <option>Research</option>
                  <option>Security</option>
                  <option>Transport</option>
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
            <div className="ecl-form-group ecl-form-group--select">
              <div className="ecl-form-group ecl-form-group--text-input">
                <label className="ecl-form-label" for="keyword-id">
                  Filter by keyword
                </label>
                <input
                  type="text"
                  id="keyword-id"
                  name="keyword-name"
                  className="ecl-text-input"
                />
              </div>
            </div>
          </div>

          <div className="ecl-col-sm-12 ecl-col-md-2 ecl-u-d-flex ecl-u-align-items-end">
            <button type="submit" className="ecl-button ecl-button--primary">
              <span className="ecl-button__container">
                <span className="ecl-button__label" data-ecl-label="true">
                  Apply filters
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
