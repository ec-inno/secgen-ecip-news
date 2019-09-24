import React from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';

// Generic
import Head from '../components/Head';
import Spinner from '../components/Spinner';
import Share from '../components/Share';

// Utilities
import useDetailsApi from '../components/Initiative/utils/useDetailsApi';

// Sub-components, keep out of /src/pages.
import Details from '../components/Initiative/Details';
import ErrorMessage from '../components/ErrorMessage';
import Meta from '../components/Initiative/Meta';
import Progress from '../components/Initiative/Progress';

const Initiative = ({ location, pageContext: { locale } }) => {
  const { t } = useTranslation();
  const { details, isLoading, error } = useDetailsApi({ location, locale });

  if (isLoading) {
    return <Spinner />;
  }

  if (error && error.message) {
    return (
      <div className="ecl-container ecl-u-mt-l">
        <ErrorMessage
          title={t('Issue occurred while getting initiative data')}
          error={error}
        />
      </div>
    );
  }

  const languageSpecificData = details.linguisticVersions
    ? Object.values(details.linguisticVersions).find(
        version => version.languageCode.toLowerCase() === locale
      )
    : {};

  return (
    <>
      <Head
        title={
          has(languageSpecificData, 'title')
            ? languageSpecificData.title
            : '...'
        }
      />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {has(languageSpecificData, 'title')
                ? languageSpecificData.title
                : '...'}
            </h1>
          </div>
          <Meta details={details} />
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress details={details} />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              <Details
                languageSpecificData={languageSpecificData}
                details={details}
              />
              <Share />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Initiative;
