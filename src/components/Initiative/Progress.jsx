import React from 'react';
import has from 'lodash/has';
import { useTranslation } from 'react-i18next';

import formatStatus from '../../utils/formatStatus';

const Progress = ({ details }) => {
  const { t } = useTranslation();

  if (!details.progress) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
        <p className="ecl-u-type-paragraph">
          {t('Given status cannot be mapped to currently supported timeline.')}
        </p>
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
    const match = details.progress.find(item => item.name === step);
    if (match) stages.push(match);
  });

  stages.forEach((stage, key) =>
    timeline.push(
      <li
        key={key}
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
    <>
      <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
      <ol className="ecl-timeline" data-ecl-timeline="true">
        {timeline}
      </ol>
      {has(details, 'startCollectionDate') && (
        <p className="ecl-u-type-paragraph-s ecl-u-type-bold">
          {t('Collection start date')}
          {': '}
          {details.startCollectionDate}
        </p>
      )}
      {has(details, 'earlyClosureDate') && (
        <p className="ecl-u-type-paragraph-s ecl-u-type-bold">
          {t('Collection closed earlier by the organisers')}
          {': '}
          {details.earlyClosureDate}
        </p>
      )}
    </>
  );
};

export default Progress;
