import React from 'react';

import formatStatus from '../../utils/formatStatus';
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const Progress = ({ progress, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  if (!progress) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">{translation.progress_label}</h3>
        <p className="ecl-u-type-paragraph">{translation.not_applicable}</p>
      </>
    );
  }

  const steps = [
    'REGISTERED',
    'ONGOING',
    'CLOSED',
    'VERIFICATION',
    'SUBMITTED',
    'ANSWERED',
  ];

  const stages = [];
  const timeline = [];

  steps.forEach(step => {
    const match = progress.find(item => item.name === step);
    if (match) stages.push(match);
  });

  stages.forEach(stage =>
    timeline.push(
      <li
        className={
          stage.active
            ? 'ecl-timeline__item ecl-timeline__item--current'
            : 'ecl-timeline__item'
        }
      >
        <div className="ecl-timeline__label">{formatStatus(stage.name)}</div>
        {stage.date && (
          <div className="ecl-timeline__content">{stage.date}</div>
        )}
      </li>
    )
  );

  return (
    <ol className="ecl-timeline" data-ecl-timeline="true">
      {timeline}
    </ol>
  );
};

export default Progress;
