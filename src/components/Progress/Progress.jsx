import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import upperCaseFirstChar from '@eci/utils/upperCaseFirstChar';

import { steps } from './utils';

const Progress = ({ progress, dateStart, dateEnd }) => {
  const { t } = useTranslation();

  if (!progress || progress.length === 0) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
        <p className="ecl-u-type-paragraph">
          {t('Given status cannot be mapped to currently supported timeline.')}
        </p>
      </>
    );
  }

  const stages = [];
  const timeline = [];

  // Reorder progress stages to match order of `steps`.
  steps.forEach(step => {
    const match = progress.find(item => item.name === step);
    if (match) stages.push(match);
  });

  // Build the timeline elements.
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
        <div className="ecl-timeline__label">
          {upperCaseFirstChar(stage.name)}
        </div>
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
      {dateStart && (
        <p className="ecl-u-type-paragraph-s ecl-u-type-bold">
          {t('Collection start date')}
          {': '}
          {dateStart}
        </p>
      )}
      {dateEnd && (
        <p className="ecl-u-type-paragraph-s ecl-u-type-bold">
          {t('Collection closed earlier by the organisers')}
          {': '}
          {dateEnd}
        </p>
      )}
    </>
  );
};

Progress.propTypes = {
  progress: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
      date: PropTypes.string,
    })
  ),
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
};

export default Progress;
