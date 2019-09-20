import React from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';

import Document from './Document';
import Funding from './Funding';
import Members from './Members';
import Message from '../Message';
import SoS from './SoS';

const Details = ({ languageSpecificData, initiativeData }) => {
  const { t } = useTranslation();

  return (
    <>
      {has(languageSpecificData, 'decisionUrl') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            {t('Answer of the European Commission')}
          </h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={languageSpecificData.decisionUrl}
              className="ecl-link"
              target="_blank"
            >
              {languageSpecificData.decisionUrl}
            </a>
          </p>
        </div>
      ) : (
        ''
      )}
      {has(initiativeData, 'refusalReasons') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            {t(
              "Commission's reply stating the reasons for refusal of registration"
            )}
          </h2>
          {typeof initiativeData.refusalReasons === 'string' ? (
            <p
              key={key}
              className="ecl-u-type-paragraph"
              dangerouslySetInnerHTML={{
                __html: initiativeData.refusalReasons,
              }}
            />
          ) : (
            <ul className="ecl-u-type-paragraph">
              {initiativeData.refusalReasons.map((reason, key) => (
                <li
                  key={key}
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: reason,
                  }}
                />
              ))}
            </ul>
          )}
          {has(initiativeData, 'refusalEURLEXLink') && (
            <>
              <h2 className="ecl-u-type-heading-2">{t('EUR-Lex reference')}</h2>
              <p className="ecl-u-type-paragraph">
                <a
                  href={initiativeData.refusalEURLEXLink}
                  className="ecl-link"
                  target="_blank"
                >
                  {initiativeData.refusalEURLEXLink}
                </a>
              </p>
            </>
          )}
          <Document file={initiativeData.refusalDocument} />
        </div>
      ) : (
        ''
      )}
      {has(initiativeData, 'partiallyRegistered') ? (
        <>
          <p className="ecl-u-type-paragraph ecl-u-type-bold">
            {t(
              'Only a part(s) of this initiative has(ve) been registered. Please read the Commission Decision for the scope of the registered initiative.'
            )}
          </p>
        </>
      ) : (
        ''
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
      {has(languageSpecificData, 'objectives') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Objectives')}</h2>
          <ul className="ecl-u-type-paragraph">
            {languageSpecificData.objectives.split(/\n/).map((line, key) => (
              <li
                key={key}
                className="ecl-u-type-paragraph"
                dangerouslySetInnerHTML={{
                  __html: line,
                }}
              />
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'website') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Website')}</h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={languageSpecificData.website}
              className="ecl-link"
              target="_blank"
            >
              {languageSpecificData.website}
            </a>
          </p>
        </>
      ) : (
        ''
      )}
      <SoS submission={initiativeData.submission} />
      {has(languageSpecificData, 'treaties') ? (
        <>
          <h2 className="ecl-u-type-heading-2">
            {t(
              'Provisions of the Treaties considered relevant by the organisers'
            )}
          </h2>
          <p className="ecl-u-type-paragraph">
            {languageSpecificData.treaties}
          </p>
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'annexText') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Annex')}</h2>
          <p
            className="ecl-u-type-paragraph"
            dangerouslySetInnerHTML={{
              __html: languageSpecificData.annexText,
            }}
          />
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'additionalDocument') ? (
        <>
          <h2 className="ecl-u-type-heading-2">
            {t('Additional information')}
          </h2>
          <Document file={languageSpecificData.additionalDocument} />
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'draftLegal') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Draft legal act')}</h2>
          <Document file={languageSpecificData.draftLegal} />
        </>
      ) : (
        ''
      )}
      <Members initiativeData={initiativeData} />
      <Funding funding={initiativeData.funding} />
    </>
  );
};

export default Details;
