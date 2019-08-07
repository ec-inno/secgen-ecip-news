import React from 'react';

/**
 * When a given status is marked as "assumed", this means that no actual data
 * has been found during the development of the component and named has been
 * thought of. Also, the fact that these are assumed means there are no date
 * fields matched to them currently.
 * Meaning, on "SUBMITTED" and "ANSWERED" we won't display dates.
 */
const Progress = ({ initiative }) => {
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
  if (!initiative.status) return '';

  if (
    initiative.status &&
    supportedStatuses.indexOf(initiative.status) === -1
  ) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
        <p className="ecl-u-type-paragraph">
          Given status cannot be mapped to currently supported timeline.
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
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            {registrationDate ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">Registered</div>
                <div className="ecl-timeline__content">
                  Deadline: {registrationDate}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">Registered</div>
                <div className="ecl-timeline__content">Current status</div>
              </li>
            )}
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
                <div className="ecl-timeline__content">
                  Deadline: {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--disabled">
                <div className="ecl-timeline__label">Collection ongoing</div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Collection closed</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Verification</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Submitted</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Answered</div>
            </li>
          </ol>
        </>
      );
    }

    case 'COLLECTION_CLOSED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Registered</div>
              {registrationDate ? (
                <div className="ecl-timeline__content">{registrationDate}</div>
              ) : (
                ''
              )}
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Collection ongoing</div>
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">Collection closed</div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item ecl-timeline__item--current">
                <div className="ecl-timeline__label">Collection closed</div>
                <div className="ecl-timeline__content">Current status</div>
              </li>
            )}
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Verification</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Submitted</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Answered</div>
            </li>
          </ol>
        </>
      );
    }

    case 'VERIFICATION': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Registered</div>
              {registrationDate ? (
                <div className="ecl-timeline__content">{registrationDate}</div>
              ) : (
                ''
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Collection closed</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">Verification</div>
              <div className="ecl-timeline__content">Current status</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Submitted</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Answered</div>
            </li>
          </ol>
        </>
      );
    }

    case 'SUBMITTED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Registered</div>
              {registrationDate ? (
                <div className="ecl-timeline__content">{registrationDate}</div>
              ) : (
                ''
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Collection closed</div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Verification</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">Submitted</div>
              <div className="ecl-timeline__content">Current status</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--disabled">
              <div className="ecl-timeline__label">Answered</div>
            </li>
          </ol>
        </>
      );
    }

    case 'ANSWERED': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Registered</div>
              {registrationDate ? (
                <div className="ecl-timeline__content">{registrationDate}</div>
              ) : (
                ''
              )}
            </li>
            {collectionDeadline ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
                <div className="ecl-timeline__content">
                  {collectionDeadline}
                </div>
              </li>
            ) : (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
              </li>
            )}
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Collection closed</div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Verification</div>
            </li>
            <li className="ecl-timeline__item">
              <div className="ecl-timeline__label">Submitted</div>
            </li>
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">Answered</div>
              <div className="ecl-timeline__content">Current status</div>
            </li>
          </ol>
        </>
      );
    }

    case 'CONDITIONS_NOT_FULFILLED':
    case 'WITHDRAWN_BY_ORGANISER': {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <p className="ecl-u-type-paragraph">
            Initiative hasn't reached registration phase.
          </p>
        </>
      );
    }

    default: {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <p className="ecl-u-type-paragraph">N/A</p>
        </>
      );
    }
  }
};

export default Progress;
