import React from 'react';
import { useTranslation } from 'react-i18next';

// Generic
import Head from '../components/Head';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import Share from '../components/Share';

// Utilities
import useDetailsApi from '../components/Initiative/utils/useDetailsApi';

// Sub-components, keep out of /src/pages.
import Details from '../components/Initiative/Details';
import ErrorMessage from '../components/ErrorMessage';
import Meta from '../components/Meta';
import Progress from '../components/Initiative/Progress';

const Initiative = ({ location, pageContext: { locale } }) => {
  const { t } = useTranslation();
  const { details, isLoading, error } = useDetailsApi({ location, locale });

  const linguisticVersions =
    details && Object.keys(details).length !== 0
      ? Object.values(details.linguisticVersions)
      : [];

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

  // Try to get content for the current locale.
  let linguisticVersion = linguisticVersions.find(
    version => version.languageCode.toLowerCase() === locale
  );

  if (!linguisticVersion) {
    // Fallback to original language.
    linguisticVersion = linguisticVersions.find(version => version.original);
  }

  const title =
    linguisticVersion && linguisticVersion.title
      ? linguisticVersion.title
      : '...';

  return (
    <>
      <Head title={title} />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">{title}</h1>
          </div>
          <Meta
            status={details.status}
            registrationNumber={details.comRegNum}
            deadline={details.deadline}
            dateRefusal={details.refusalDate}
            dateRegistration={details.registrationDate}
            supportLink={details.supportLink}
          />
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress details={details} />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {linguisticVersion &&
                linguisticVersion.languageCode &&
                linguisticVersion.languageCode.toLowerCase() !== locale && (
                  <Message
                    variant="warning"
                    title={t('Disclaimer')}
                    description={t(
                      'The initiative is not available in the current language. Original language version is currently displayed.'
                    )}
                    icon={{
                      shape: 'notifications--warning',
                      size: 'l',
                    }}
                  />
                )}
              <Details
                linguisticVersion={linguisticVersion}
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
