import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk, cloneDeep } from 'lodash';

import config from '../config';

import getCurrentLanguage from '../../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../../utils/getDefaultLanguage';

import Card from '../Card';
import Icon from '../../Icon';
import Message from '../../Message';
import New from '../New';
import Pagination from '../Pagination';
import SearchForm from './FormAdvanced';
import Spinner from '../../Spinner';

const Area = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../../translations/initiative/${language}.json`);

  const { GATSBY_INITIATIVES_API: api } = process.env;

  const itemsPerRow = 3;
  const itemsPerPageDefault = 8;
  const rowClass = 'ecl-row';

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [filters, setFilters] = useState({});
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    setIsLoading(true);
    const lang = language.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/ALL/${lang}/0/${itemsPerPage}`;

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
  }, [filters, itemsPerPage]);

  const hasEntries = initiatives.entries && initiatives.entries.length;
  const groups = hasEntries
    ? Math.ceil(initiatives.entries.length / itemsPerRow)
    : null;

  return (
    <div className="ecl-container">
      <div className="ecl-row">
        <aside className="ecl-col-12 ecl-col-lg-3">
          <h3 className="ecl-u-type-heading-3 ecl-u-mt-l ecl-u-mt-lg-none">
            Search options
          </h3>
          <SearchForm setFilters={setFilters} location={location} />
        </aside>
        <section className="ecl-col-12 ecl-col-lg-9">
          <h2 className="ecl-u-type-heading-2 ecl-u-d-none ecl-u-d-lg-block ecl-u-mv-none">
            Search results
          </h2>

          {initiatives.entries && initiatives.entries.length !== 0 && (
            <h3 className="ecl-u-type-heading-3 ecl-u-mb-none ecl-u-mt-3xl ecl-u-mt-lg-l">{`Showing results ${initiatives.entries.length} of ${initiatives.all}`}</h3>
          )}

          {filters.filters && (
            <div className="ecl-u-mt-l ecl-u-mb-l ecl-u-d-flex ecl-u-flex-column ecl-u-flex-lg-row ecl-u-align-items-lg-center">
              {Object.keys(filters.filters)
                // Language filter is tricky and service is not able to handle it well at the moment.
                .filter(filter => filter !== 'LANGUAGE')
                .map((filter, key) => {
                  return (
                    <span
                      key={key}
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
            title={translation.error_getting_initiatives}
            description={errorMessage}
            {...config.error}
          />
          {hasEntries ? (
            chunk(initiatives.entries, itemsPerRow).map((group, k) => {
              const groupLength = group.length;
              // If it's either the first or last item, do not add 'md'.
              const rowSpacing =
                k === 0 || k + 1 === groups ? 'ecl-u-mt-l' : 'ecl-u-mt-md-l';

              const classNames = classnames(rowClass, rowSpacing);

              return (
                <div className={classNames} key={k}>
                  {group.map((item, key) => {
                    const list = [];

                    list.push(
                      <div
                        key={key}
                        className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none"
                      >
                        <Card key={key} item={item} location={location} />
                      </div>
                    );

                    if (k + 1 === groups && key + 1 === groupLength) {
                      list.push(<New key={key + 1} location={location} />);
                    }

                    return list;
                  })}
                </div>
              );
            })
          ) : (
            <div className="ecl-row">
              <div className="ecl-col-sm-12 ecl-col-md-12">
                <p className="ecl-u-type-paragraph">
                  There are no initiatives meeting current filter criteria.
                </p>
              </div>
            </div>
          )}
          {isLoading && <Spinner />}
          {itemsPerPage < initiatives.all && hasEntries && (
            <Pagination
              location={location}
              onClick={e => {
                e.preventDefault();
                const newItemsPerPage = itemsPerPage * 2 + 1;
                setItemsPerPage(newItemsPerPage);
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Area;
