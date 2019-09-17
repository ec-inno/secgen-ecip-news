import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import useInitiativesSearchApi from '../useInitiativesSearchApi';
import I18nContext from '../../../../context/I18n';
import InitiativesSearch from '../../../../context/InitiativesSearch';

import SearchForm from './Form';
import SearchPagination from '../SearchPagination';

import FilterTags from '../../FilterTags';
import Result from '../../Result';

import ErrorMessage from '../../../ErrorMessage';
import Spinner from '../../../Spinner';

const SearchAdvanced = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { query } = useContext(InitiativesSearch);

  const { results, isLoading, error } = useInitiativesSearchApi({ query });

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
            {results.recordsFound ? `(${results.recordsFound})` : ''}
          </h2>

          {results.entries && results.entries.length !== 0 && (
            <h3 className="ecl-u-type-heading-3 ecl-u-mb-none ecl-u-mt-3xl ecl-u-mt-lg-l">
              {t('Showing results')} {query.pagination}
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
          {results.recordsFound > 10 && <SearchPagination results={results} />}
        </section>
      </div>
    </div>
  );
};

export default SearchAdvanced;
