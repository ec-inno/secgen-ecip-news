import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import config from '../config';
import I18nContext from '../../../context/I18n';
import getPagination from './getPagination';

import Result from './Result';
import Icon from '../../Icon';
import Message from '../../Message';
import Pagination from '../../Pagination';
import SearchForm from './FormAdvanced';
import Spinner from '../../Spinner';

const Area = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [filters, setFilters] = useState({});
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState('0/10');

  useEffect(() => {
    setIsLoading(true);
    const lang = locale.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/ALL/${lang}/${pagination}`;

    axios
      .post(endpoint, filters)
      .then(response => {
        setInitiatives(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
        setIsLoading(false);
      });
  }, [filters, pagination]);

  const options = { t, initiatives, pagination, setPagination };
  const paginationConfig = getPagination(options);

  return (
    <div className="ecl-container">
      <div className="ecl-row">
        <aside className="ecl-col-12 ecl-col-lg-3">
          <h3 className="ecl-u-type-heading-3 ecl-u-mt-l ecl-u-mt-lg-none">
            {t('Search options')}
          </h3>
          <SearchForm setFilters={setFilters} />
        </aside>
        <section className="ecl-col-12 ecl-col-lg-9">
          <h2 className="ecl-u-type-heading-2 ecl-u-d-none ecl-u-d-lg-block ecl-u-mv-none">
            {t('Search results')}{' '}
            {initiatives.recordsFound ? `(${initiatives.recordsFound})` : ''}
          </h2>

          {initiatives.entries && initiatives.entries.length !== 0 && (
            <h3 className="ecl-u-type-heading-3 ecl-u-mb-none ecl-u-mt-3xl ecl-u-mt-lg-l">
              {t('Showing results')} {pagination}
            </h3>
          )}

          {filters.filters && (
            <div className="ecl-u-mt-l ecl-u-mb-l ecl-u-d-flex ecl-u-flex-column ecl-u-flex-lg-row ecl-u-align-items-lg-center">
              {Object.keys(filters.filters)
                // Language filter is tricky and service is not able to handle it well at the moment.
                .filter(filter => filter !== 'LANGUAGE')
                .map((filter, key) => {
                  return (
                    <span
                      key={`filter-${key}`}
                      className={
                        key > 0
                          ? 'ecl-u-ml-lg-m ecl-u-mt-m ecl-u-mt-lg-none'
                          : ''
                      }
                    >
                      <span className="ecl-u-type-m">{filter}</span>
                      <button
                        className="ecl-u-ml-s ecl-tag ecl-tag--removable"
                        value={filter}
                        onClick={e => {
                          e.preventDefault();

                          const existing = Object.keys(filters.filters).find(
                            filter => filter === e.target.value
                          );

                          if (existing) {
                            const newFilters = cloneDeep(filters.filters);
                            delete newFilters[existing];
                            delete newFilters['LANGUAGE'];
                            setFilters(newFilters);
                          }
                        }}
                      >
                        {filters.filters[filter].join(' ')}
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
                  );
                })}
            </div>
          )}
          {isLoading && <Spinner />}
          <Message
            className={errorMessageIsVisible ? '' : 'hidden'}
            onClose={() => setErrorMessageVisibility(false)}
            title={t('An error occurred while fetching initiatives.')}
            description={errorMessage}
            {...config.error}
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
            <Pagination {...paginationConfig} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Area;
