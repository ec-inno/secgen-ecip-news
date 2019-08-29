import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * When a given status is marked as "assumed", this means that no actual data
 * has been found during the development of the component and named has been
 * thought of. Also, the fact that these are assumed means there are no date
 * fields matched to them currently.
 * Meaning, on "SUBMITTED" and "ANSWERED" we won't display dates.
 */
const Progress = ({ initiative }) => {
  const { t } = useTranslation();

  const supportedStatuses = [
    'REGISTERED',
    'COLLECTION_CLOSED',
    'VERIFICATION', // assumed
    'SUBMITTED', // assumed
    'ANSWERED',
    'CONDITIONS_NOT_FULFILLED',
    'WITHDRAWN_BY_ORGANISER',
  ];

  // In few cases input cannot be handled.
  if (!initiative || !initiative.status) return '';

  if (
    initiative.status &&
    supportedStatuses.indexOf(initiative.status) === -1
  ) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
        <p className="ecl-u-type-paragraph">
          {t('Given status cannot be mapped to currently supported timeline.')}
        </p>
      </>
    );
  }

  // Prepare information about some fields.
  const registrationDate = initiative.registrationDate
    ? getDateFormatted(initiative.registrationDate)
    : '';

  const collectionDeadline =
    initiative.searchEntry && initiative.searchEntry.deadlineForCollection
      ? getDateFormatted(initiative.searchEntry.deadlineForCollection)
      : '';

  switch (initiative.status) {
    case 'REGISTERED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            {registrationDate ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">{t('Registered')}</div>
                <div className="ecl-timeline__content">
                  {t('Deadline')}
                  {': '}
                  {registrationDate}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">{t('Registered')}</div>
                <div className="ecl-timeline__content">
                  {t('Current status')}
                </div>
              </li>
            )}
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
                <div className="ecl-timeline__content">
                  {t('Deadline')}
                  {': '}
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--disabled">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">
                {t('Collection closed')}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Verification')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Submitted')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Answered')}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'COLLECTION_CLOSED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Registered')}</div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {t('Collection ongoing')}
              </div>
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {t('Collection closed')}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {t('Collection closed')}
                </div>
                <div className="ecl-timeline__content">
                  {t('Current status')}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Verification')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Submitted')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Answered')}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'VERIFICATION': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Registered')}</div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {t('Collection closed')}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">{t('Verification')}</div>
              <div className="ecl-timeline__content">{t('Current status')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Submitted')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Answered')}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'SUBMITTED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Registered')}</div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {t('Collection closed')}
              </div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Verification')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">{t('Submitted')}</div>
              <div className="ecl-timeline__content">{t('Current status')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{t('Answered')}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'ANSWERED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Registered')}</div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {t('Collection ongoing')}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {t('Collection closed')}
              </div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Verification')}</div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{t('Submitted')}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">{t('Answered')}</div>
              <div className="ecl-timeline__content">{t('Current status')}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'CONDITIONS_NOT_FULFILLED':
    case 'WITHDRAWN_BY_ORGANISER': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <p className="ecl-u-type-paragraph">
            {t("Initiative hasn't reached registration phase.")}
          </p>
        </>
      );
    }

    default: {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
          <p className="ecl-u-type-paragraph">{t('N/A')}</p>
        </>
      );
    }
  }
};

export default Progress;
