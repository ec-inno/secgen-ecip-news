import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
          <div className="ecl-form-group ecl-form-group--select">
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
