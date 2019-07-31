import React from 'react';

import getDateFormatted from '../utils/getDateFormatted';

import selected from '../components/Initiative/selected.json';

const initiative = selected[0];

const Progress = () => {
  console.log(initiative);

  const supported = [
    // From actual data.
    'ANSWERED',
    'COLLECTION_CLOSED',
    'CONDITIONS_NOT_FULFILLED',
    'REGISTERED',
    'WITHDRAWN_BY_ORGANISER',
    // Assumed.
    'VERIFICATION',
    'SUBMITTED',
  ];

  // In few cases input cannot be handled.
  if (!initiative.status) return '';

  if (initiative.status && supported.indexOf(initiative.status) === -1) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
        <p>Given status cannot be mapped to currently supported timeline.</p>
      </>
    );
  }

  switch (initiative.status) {
    case 'REGISTERED': {
      const dateFormatted = getDateFormatted(initiative.registrationDate);

      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <ol className="ecl-timeline" data-ecl-timeline="true">
            <li className="ecl-timeline__item ecl-timeline__item--current">
              <div className="ecl-timeline__label">Registered</div>
              <div className="ecl-timeline__content">{dateFormatted}</div>
            </li>
            {initiative.searchEntry['@status'] === 'OPEN' ? (
              <li className="ecl-timeline__item">
                <div className="ecl-timeline__label">Collection ongoing</div>
                <div className="ecl-timeline__content">Current status</div>
              </li>
            ) : (
              ''
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

    default: {
      return (
        <>
          <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
          <p>N/A</p>
        </>
      );
    }
  }
};

export default Progress;
