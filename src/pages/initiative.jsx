import React from 'react';
import { useTranslation } from 'react-i18next';

import useDetailsApi from '@eci/utils/useDetailsApi';
import extractInitiativesDetails from '@eci/utils/extractInitiativesDetails';
import shouldDisplayFile from '@eci/utils/shouldDisplayFile';

import ErrorMessage from '../components/ErrorMessage';
import FileDownload from '../components/FileDownload';
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
  const { details, error } = useDetailsApi({ location, locale });

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

  const {
    additionalDocument,
    annexText,
    dateEnd,
    dateRefusal,
    dateRegistration,
    dateStart,
    deadline,
    decisionUrl,
    draftLegal,
    funding,
    isPartiallyRegistered,
    linguisticVersionIsFallback,
    members,
    objectives,
    progress,
    refusalReasons,
    registrationNumber,
    status,
    submission,
    supportLink,
    title,
    treaties,
    website,
  } = extractInitiativesDetails({ details, locale });

  return (
    <>
      <Head title={title} />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">{title}</h1>
          </div>
          <Meta
            status={status}
            registrationNumber={registrationNumber}
            deadline={deadline}
            dateRefusal={dateRefusal}
            dateRegistration={dateRegistration}
            supportLink={supportLink}
          />
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mb-l">
              <Progress
                progress={progress}
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {linguisticVersionIsFallback && (
                <Message
                  variant="info"
                  title={t('Notice')}
                  description={t(
                    'The initiative is not available in this language. The original language version is currently displayed.'
                  )}
                  icon={{
                    shape: 'notifications--warning',
                    size: 'l',
                  }}
                  className="ecl-u-mb-l"
                />
              )}

              {decisionUrl && (
                <Section title={t('Answer of the European Commission')}>
                  <p className="ecl-u-type-paragraph">
                    <Link
                      href={decisionUrl}
                      label={decisionUrl}
                      target="_blank"
                    />
                  </p>
                </Section>
              )}
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
              {objectives && (
                <Section title={t('Objectives')}>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: objectives,
                    }}
                  />
                </Section>
              )}
              {website && (
                <Section title={t('Website')}>
                  <p className="ecl-u-type-paragraph">
                    <Link href={website} label={website} target="_blank" />
                  </p>
                </Section>
              )}
              <SoSReport submission={submission} />
              {treaties && (
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
              )}
              {annexText && (
                <Section title={t('Annex')}>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: annexText,
                    }}
                  />
                </Section>
              )}
              {shouldDisplayFile(additionalDocument) && (
                <Section title={t('Additional information')}>
                  <FileDownload file={additionalDocument} />
                </Section>
              )}
              {shouldDisplayFile(draftLegal) && (
                <Section title={t('Draft legal act')}>
                  <FileDownload file={draftLegal} />
                </Section>
              )}
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
