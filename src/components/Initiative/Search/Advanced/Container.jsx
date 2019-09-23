import React, {
  Fragment,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import useInitiativesSearchApi from '../useInitiativesSearchApi';
import I18nContext from '../../../../context/I18n';

// Advanced search tools.
import InitiativesSearchContext, {
  queryInit,
  queryReducer,
} from '../context/query';

import SearchForm from './Form';
import SearchPagination from '../SearchPagination';

import FilterTags from '../../FilterTags';
import Result from '../../Result';

import ErrorMessage from '../../../ErrorMessage';
import Spinner from '../../../Spinner';

const SearchAdvanced = () => {
  const containerRef = useRef();
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const [query, dispachQuery] = useReducer(queryReducer, queryInit);

  // Send current state of `query` store to the service.
  const { results, isLoading, error } = useInitiativesSearchApi({ query });

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const [start, offset] = query.pagination.split('/');
  const resultsPagination =
    start === '0' ? `${Number(start) + 1}/${offset}` : `${start}/${offset}`;

  return (
    <>
      <InitiativesSearchContext.Provider value={{ query, dispachQuery }}>
        <div className="ecl-container">
          <div className="ecl-row">
            <aside className="ecl-col-12 ecl-col-lg-3">
              <h3 className="ecl-u-type-heading-3 ecl-u-mt-l ecl-u-mt-lg-none">
                {t('Search options')}
              </h3>
              <SearchForm />
            </aside>
            <section ref={containerRef} className="ecl-col-12 ecl-col-lg-9">
              <h2 className="ecl-u-type-heading-2 ecl-u-d-none ecl-u-d-lg-block ecl-u-mv-none">
                {t('Search results')}{' '}
                {results.recordsFound ? `(${results.recordsFound})` : ''}
              </h2>

              {results.entries && results.entries.length !== 0 && (
                <h3 className="ecl-u-type-heading-3 ecl-u-mb-none ecl-u-mt-3xl ecl-u-mt-lg-l">
                  {t('Showing results')} {resultsPagination}
                </h3>
              )}
              <FilterTags />
              {isLoading && <Spinner />}
              <ErrorMessage
                title={t('An error occurred while fetching results.')}
                error={error}
              />
              {results && results.entries && Array.isArray(results.entries) ? (
                results.entries.map((item, k) => (
                  <Fragment key={`result-${k}`}>
                    <Result
                      logo={item.logo}
                      title={item.title}
                      status={item.status}
                      pubRegNum={item.pubRegNum}
                      href={`/${locale}/initiatives/#${item.id}`}
                    />
                    {k !== results.entries.length - 1 && (
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
              {results.recordsFound > 10 && (
                <SearchPagination results={results} />
              )}
            </section>
          </div>
        </div>
      </InitiativesSearchContext.Provider>
    </>
  );
};

export default SearchAdvanced;
