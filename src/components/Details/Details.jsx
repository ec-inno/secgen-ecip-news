import React from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';

import File from '../File';
import Message from '../Message';
import SoS from '../SoS';

const Details = ({ linguisticVersion, details }) => {
  const { t } = useTranslation();

  return (
    <>
      {has(linguisticVersion, 'decisionUrl') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            {t('Answer of the European Commission')}
          </h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={linguisticVersion.decisionUrl}
              className="ecl-link"
              target="_blank"
            >
              {linguisticVersion.decisionUrl}
            </a>
          </p>
        </div>
      ) : (
        ''
      )}
      {has(details, 'refusalReasons') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            {t(
              "Commission's reply stating the reasons for refusal of registration"
            )}
          </h2>
          {typeof details.refusalReasons === 'string' ? (
            <p
              key={key}
              className="ecl-u-type-paragraph"
              dangerouslySetInnerHTML={{
                __html: details.refusalReasons,
              }}
            />
          ) : (
            <ul className="ecl-u-type-paragraph">
              {details.refusalReasons.map((reason, key) => (
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
          {has(details, 'refusalEURLEXLink') && (
            <>
              <h2 className="ecl-u-type-heading-2">{t('EUR-Lex reference')}</h2>
              <p className="ecl-u-type-paragraph">
                <a
                  href={details.refusalEURLEXLink}
                  className="ecl-link"
                  target="_blank"
                >
                  {details.refusalEURLEXLink}
                </a>
              </p>
            </>
          )}
          <File file={details.refusalDocument} />
        </div>
      ) : (
        ''
      )}
      {has(details, 'partiallyRegistered') ? (
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
      {has(linguisticVersion, 'objectives') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Objectives')}</h2>
          <ul className="ecl-u-type-paragraph">
            {linguisticVersion.objectives.split(/\n/).map((line, key) => (
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
      {has(linguisticVersion, 'website') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Website')}</h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={linguisticVersion.website}
              className="ecl-link"
              target="_blank"
            >
              {linguisticVersion.website}
            </a>
          </p>
        </>
      ) : (
        ''
      )}
      <SoS submission={details.submission} />
      {has(linguisticVersion, 'treaties') ? (
        <>
          <h2 className="ecl-u-type-heading-2">
            {t(
              'Provisions of the Treaties considered relevant by the organisers'
            )}
          </h2>
          <p className="ecl-u-type-paragraph">{linguisticVersion.treaties}</p>
        </>
      ) : (
        ''
      )}
      {has(linguisticVersion, 'annexText') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{t('Annex')}</h2>
          <p
            className="ecl-u-type-paragraph"
            dangerouslySetInnerHTML={{
              __html: linguisticVersion.annexText,
            }}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Details;
