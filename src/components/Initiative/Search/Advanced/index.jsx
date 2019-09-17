import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import useApi from '../useApi';
import I18nContext from '../../../../context/I18n';
import InitiativesSearch from '../../../../context/InitiativesSearch';

import SearchForm from './Form';
import SearchPagination from '../SearchPagination';
import Result from '../../Result';

import ErrorMessage from '../../../ErrorMessage';
import Icon from '../../../Icon';
import Spinner from '../../../Spinner';

const SearchAdvanced = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { query, dispachQuery } = useContext(InitiativesSearch);

  const { initiatives, isLoading, error } = useApi({ query });

  return (
    <div className="ecl-container">
      <div className="ecl-row">
        <aside className="ecl-col-12 ecl-col-lg-3">
          <h3 className="ecl-u-type-heading-3 ecl-u-mt-l ecl-u-mt-lg-none">
            {t('Search options')}
          </h3>
          <SearchForm />
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
          {query.filters && Object.keys(query.filters).length !== 0 && (
            <div className="ecl-u-mt-l ecl-u-mb-l ecl-u-d-flex ecl-u-flex-column ecl-u-flex-lg-row ecl-u-align-items-lg-center">
              {Object.keys(query.filters).map((filter, key) => (
                <span
                  key={`filter-${key}`}
                  className={
                    key > 0 ? 'ecl-u-ml-lg-m ecl-u-mt-m ecl-u-mt-lg-none' : ''
                  }
                >
                  <span className="ecl-u-type-m">{filter}</span>
                  <button
                    className="ecl-u-ml-s ecl-tag ecl-tag--removable"
                    value={filter}
                    onClick={e => {
                      e.preventDefault();

                      dispachQuery({
                        type: 'removeFilter',
                        filter: e.target.value,
                      });
                    }}
                  >
                    {query.filters[filter].join(' ')}
                    <span className="ecl-tag__icon">
                      <Icon
                        className="ecl-tag__icon-close"
                        shape="ui--close"
                        size="xs"
                      />
                      <Icon
                        className="ecl-tag__icon-close-filled"
                        shape="ui--close"
                        size="xs"
                      />
                    </span>
                  </button>
                </span>
              ))}
            </div>
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
            <SearchPagination initiatives={initiatives} />
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchAdvanced;
