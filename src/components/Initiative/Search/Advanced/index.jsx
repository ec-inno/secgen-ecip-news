import React, { Fragment, useState, useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import useApi from '../useApi';
import I18nContext from '../../../../context/I18n';

import SearchForm from './Form';
import SearchPagination from '../SearchPagination';
import Result from '../../Result';

import ErrorMessage from '../../../ErrorMessage';
import Icon from '../../../Icon';
import Spinner from '../../../Spinner';

const SearchAdvanced = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);

  const queryInit = {
    filters: {},
    status: 'ALL',
    language: locale,
    pagination: '0/10',
  };

  const queryReducer = (state, action) => {
    switch (action.type) {
      case 'paginate': {
        return {
          ...state,
          pagination: action.pagination,
        };
      }

      case 'changeStatus': {
        return {
          ...state,
          pagination: queryInit.pagination,
          status: action.status,
        };
      }

      case 'changeLanguage': {
        return {
          ...state,
          pagination: queryInit.pagination,
          language: action.language,
        };
      }

      case 'changeFilter': {
        return {
          ...state,
          pagination: queryInit.pagination,
          filters: {
            ...state.filters,
            [action.filter]: action.filterValue,
          },
        };
      }

      case 'setFilters': {
        console.log('action.filters', action.filters);
        return {
          ...state,
          pagination: queryInit.pagination,
          filters: {
            ...state.filters,
            ...action.filters,
          },
        };
      }

      case 'reset':
      default: {
        return queryInit;
      }
    }
  };

  const [query, dispachQuery] = useReducer(queryReducer, queryInit);

  const { initiatives, isLoading, error } = useApi({ query });

  return (
    <div className="ecl-container">
      <div className="ecl-row">
        <aside className="ecl-col-12 ecl-col-lg-3">
          <h3 className="ecl-u-type-heading-3 ecl-u-mt-l ecl-u-mt-lg-none">
            {t('Search options')}
          </h3>
          <SearchForm query={query} dispachQuery={dispachQuery} />
        </aside>
        <section className="ecl-col-12 ecl-col-lg-9">
          <h2 className="ecl-u-type-heading-2 ecl-u-d-none ecl-u-d-lg-block ecl-u-mv-none">
            {t('Search results')}{' '}
            {initiatives.recordsFound ? `(${initiatives.recordsFound})` : ''}
          </h2>

          {initiatives.entries && initiatives.entries.length !== 0 && (
            <h3 className="ecl-u-type-heading-3 ecl-u-mb-none ecl-u-mt-3xl ecl-u-mt-lg-l">
              {t('Showing results')} {query.pagination}
            </h3>
          )}

          {isLoading && <Spinner />}
          <ErrorMessage
            title={t('An error occurred while fetching initiatives.')}
            error={error}
          />
          {initiatives &&
          initiatives.entries &&
          Array.isArray(initiatives.entries) ? (
            initiatives.entries.map((item, k) => (
              <Fragment key={`result-${k}`}>
                <Result
                  logo={item.logo}
                  title={item.title}
                  status={item.status}
                  pubRegNum={item.pubRegNum}
                  href={`/${locale}/initiatives/#${item.id}`}
                />
                {k !== initiatives.entries.length - 1 && (
                  <hr key={`hr-${k}`} className="ecl-u-mv-none" />
                )}
              </Fragment>
            ))
          ) : (
            <div className="ecl-row">
              <div className="ecl-col-sm-12 ecl-col-md-12">
                <p className="ecl-u-type-paragraph">
                  {t(
                    'There are no initiatives meeting current filter criteria.'
                  )}
                </p>
              </div>
            </div>
          )}
          {isLoading && <Spinner />}
          {initiatives.recordsFound > 10 && (
            <SearchPagination
              initiatives={initiatives}
              query={query}
              dispachQuery={dispachQuery}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchAdvanced;
