import React from 'react';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

/**
 * When a given status is marked as "assumed", this means that no actual data
 * has been found during the development of the component and named has been
 * thought of. Also, the fact that these are assumed means there are no date
 * fields matched to them currently.
 * Meaning, on "SUBMITTED" and "ANSWERED" we won't display dates.
 */
const Progress = ({ initiative, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

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
        <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
        <p className="ecl-u-type-paragraph">{translation.progress_unmapped}</p>
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
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            {registrationDate ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {translation.registered}
                </div>
                <div className="ecl-timeline__content">
                  {translation.deadline}
                  {': '}
                  {registrationDate}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {translation.registered}
                </div>
                <div className="ecl-timeline__content">
                  {translation.current_status}
                </div>
              </li>
            )}
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
                <div className="ecl-timeline__content">
                  {translation.deadline}
                  {': '}
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--disabled">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">
                {translation.collection_closed}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">
                {translation.verification}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.submitted}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.answered}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'COLLECTION_CLOSED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.registered}
              </div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.collection_ongoing}
              </div>
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {translation.collection_closed}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">
                  {translation.collection_closed}
                </div>
                <div className="ecl-timeline__content">
                  {translation.current_status}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">
                {translation.verification}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.submitted}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.answered}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'VERIFICATION': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.registered}
              </div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.collection_closed}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">
                {translation.verification}
              </div>
              <div className="ecl-timeline__content">
                {translation.current_status}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.submitted}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.answered}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'SUBMITTED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.registered}
              </div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.collection_closed}
              </div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.verification}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">{translation.submitted}</div>
              <div className="ecl-timeline__content">
                {translation.current_status}
              </div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">{translation.answered}</div>
            </li>
          </ol>
        </>
      );
    }

    case 'ANSWERED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.registered}
              </div>
              {registrationDate && (
                <div className="ecl-timeline__content">{registrationDate}</div>
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">
                  {translation.collection_ongoing}
                </div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.collection_closed}
              </div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">
                {translation.verification}
              </div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">{translation.submitted}</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">{translation.answered}</div>
              <div className="ecl-timeline__content">
                {translation.current_status}
              </div>
            </li>
          </ol>
        </>
      );
    }

    case 'CONDITIONS_NOT_FULFILLED':
    case 'WITHDRAWN_BY_ORGANISER': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <p className="ecl-u-type-paragraph">
            {translation.registration_not_reached}
          </p>
        </>
      );
    }

    default: {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
          <p className="ecl-u-type-paragraph">{translation.not_applicable}</p>
        </>
      );
    }
  }
};

export default Progress;
