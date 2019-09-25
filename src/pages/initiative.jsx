import React from 'react';
import { useTranslation } from 'react-i18next';

// Utilities
import useDetailsApi from '../components/Initiative/utils/useDetailsApi';

import ErrorMessage from '../components/ErrorMessage';
import FileSection from '../components/FileSection';
import Funding from '../components/Funding';
import Head from '../components/Head';
import Members from '../components/Members';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Progress from '../components/Progress';
import Share from '../components/Share';

import Details from '../components/Details';

const Initiative = ({ location, pageContext: { locale } }) => {
  const { t } = useTranslation();
  const { details, _, error } = useDetailsApi({ location, locale });

  const linguisticVersions =
    details && Object.keys(details).length !== 0
      ? Object.values(details.linguisticVersions)
      : [];

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
  let linguisticVersionIsFallback = false;
  let linguisticVersion = linguisticVersions.find(
    version => version.languageCode.toLowerCase() === locale
  );

  if (!linguisticVersion) {
    // Fallback to original language.
    // Information display should be "all or nothing", so we override, and all other props are coming from the original.
    linguisticVersion = linguisticVersions.find(version => version.original);
    linguisticVersionIsFallback = true;
  }

  /**
   * Information from `details`.
   */
  const progress = details && details.progress ? details.progress : [];
  const funding = details && details.funding ? details.funding : {};
  const members = details && details.members ? details.members : [];

  /**
   * Information from `linguisticVersion`.
   */
  const title =
    linguisticVersion && linguisticVersion.title
      ? linguisticVersion.title
      : '...';

  const draftLegal =
    linguisticVersion && linguisticVersion.draftLegal
      ? linguisticVersion.draftLegal
      : {};

  const additionalDocument =
    linguisticVersion && linguisticVersion.additionalDocument
      ? linguisticVersion.additionalDocument
      : {};

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
              <Progress
                progress={progress}
                dateStart={details.startCollectionDate}
                dateEnd={details.earlyClosureDate}
              />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {linguisticVersionIsFallback && (
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
              <FileSection
                title={t('Additional information')}
                file={additionalDocument}
              />
              <FileSection title={t('Draft legal act')} file={draftLegal} />
              <Members members={members} />
              <Funding funding={funding} />
              <Share />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Initiative;
