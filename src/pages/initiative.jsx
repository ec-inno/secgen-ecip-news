import React from 'react';
import { useTranslation } from 'react-i18next';

// Utilities
import useDetailsApi from '../components/Initiative/utils/useDetailsApi';

import ErrorMessage from '../components/ErrorMessage';
import File from '../components/File';
import Funding from '../components/Funding';
import Head from '../components/Head';
import Link from '../components/Link/LinkEcl';
import Members from '../components/Members';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Progress from '../components/Progress';
import Refusal from '../components/Refusal';
import Section from '../components/Section';
import Share from '../components/Share';
import SoSReport from '../components/SoSReport';

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
  const submission = details && details.submission ? details.submission : {};
  const isPartiallyRegistered =
    details && details.partiallyRegistered ? true : false;
  const refusalReasons = details.refusalReasons ? details.refusalReasons : [];

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

  const annexText =
    linguisticVersion && linguisticVersion.annexText
      ? linguisticVersion.annexText
      : '';

  const treaties =
    linguisticVersion && linguisticVersion.treaties
      ? linguisticVersion.treaties
      : '';

  const website =
    linguisticVersion && linguisticVersion.website
      ? linguisticVersion.website
      : '';

  const objectives =
    linguisticVersion && linguisticVersion.objectives
      ? linguisticVersion.objectives
      : '';

  const decisionUrl =
    linguisticVersion && linguisticVersion.decisionUrl
      ? linguisticVersion.decisionUrl
      : '';

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

              <Section title={t('Answer of the European Commission')}>
                <p className="ecl-u-type-paragraph">
                  <Link
                    href={decisionUrl}
                    label={decisionUrl}
                    target="_blank"
                  />
                </p>
              </Section>
              <Refusal reasons={refusalReasons} />
              {isPartiallyRegistered && (
                <p className="ecl-u-type-paragraph ecl-u-type-bold">
                  {t(
                    'Only a part(s) of this initiative has(ve) been registered. Please read the Commission Decision for the scope of the registered initiative.'
                  )}
                </p>
              )}
              <Message
                onClose={null}
                variant="warning"
                title={t('Disclaimer')}
                description={t(
                  'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.'
                )}
                icon={{
                  shape: 'notifications--warning',
                  size: 'l',
                }}
              />
              <Section title={t('Objectives')}>
                <p
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: objectives,
                  }}
                />
              </Section>
              <Section title={t('Website')}>
                <p className="ecl-u-type-paragraph">
                  <Link href={website} label={website} target="_blank" />
                </p>
              </Section>
              <SoSReport submission={submission} />
              <Section
                title={t(
                  'Provisions of the Treaties considered relevant by the organisers'
                )}
              >
                <p
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: treaties,
                  }}
                />
              </Section>
              <Section title={t('Annex')}>
                <p
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: annexText,
                  }}
                />
              </Section>
              <Section title={t('Additional information')}>
                <File file={additionalDocument} />
              </Section>
              <Section title={t('Draft legal act')}>
                <File file={draftLegal} />
              </Section>
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
