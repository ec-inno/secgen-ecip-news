import React from 'react';

const Progress = () => {
  return (
    <>
      <h3 className="ecl-u-type-heading-3">Initiative progress </h3>
      <ol className="ecl-timeline" data-ecl-timeline="true">
        <li className="ecl-timeline__item">
          <div className="ecl-timeline__label">Registered</div>
          <div className="ecl-timeline__content">11/09/2018</div>
        </li>
        <li className="ecl-timeline__item ecl-timeline__item--current">
          <div className="ecl-timeline__label">Collection ongoing</div>
          <div className="ecl-timeline__content">Current status</div>
        </li>
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
};

export default Progress;
