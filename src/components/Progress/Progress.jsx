import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import upperCaseFirstChar from '@eci/utils/upperCaseFirstChar';

import { getStages } from './utils';

const Progress = ({
  progress,
  dateCollectionStart,
  dateCollectionEarlyClosure,
}) => {
  let closedEarlier = false;
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

  const timeline = [];
  const stages = getStages(progress);

  if (
    dateCollectionStart &&
    !stages.find(stage => stage.name === 'COLLECTION_START_DATE')
  ) {
    const stepPrev = stages.findIndex(stage => stage.name === 'REGISTERED');

    if (stepPrev >= 0) {
      stages.splice(stepPrev + 1, 0, {
        name: 'COLLECTION_START_DATE',
        active: false,
        date: dateCollectionStart,
      });
    }
  }

  if (
    dateCollectionEarlyClosure &&
    !stages.find(stage => stage.name === 'COLLECTION_EARLY_CLOSURE')
  ) {
    const stepPrev = stages.findIndex(stage => stage.name === 'ONGOING');

    if (stepPrev >= 0) {
      stages.splice(stepPrev + 1, 0, {
        name: 'COLLECTION_EARLY_CLOSURE',
        active: false,
        date: dateCollectionEarlyClosure,
      });
    }
  }

  stages.forEach((stage, key) => {
    if (
      stage.footnoteType &&
      stage.footnoteType === 'COLLECTION_EARLY_CLOSURE'
    ) {
      closedEarlier = true;
    }

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
          {closedEarlier && <span className="ecl-u-type-color-red"> *</span>}
        </div>
        {stage.date && (
          <div className="ecl-timeline__content">{stage.date}</div>
        )}
      </li>
    );
  });

  if (stages.length === 0) {
    return (
      <>
        <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
        <p className="ecl-u-type-paragraph">
          {t('Malformed or unsupported data.')}
        </p>
      </>
    );
  }

  return (
    <>
      <h3 className="ecl-u-type-heading-3">{t('Initiative progress')}</h3>
      <ol className="ecl-timeline" data-ecl-timeline="true">
        {timeline}
      </ol>
      {closedEarlier && (
        <p class="ecl-u-type-paragraph-s ecl-u-type-color-red">
          {t('Collection closed earlier by organisers.')}
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
      footnoteType: PropTypes.string,
    })
  ),
  dateCollectionStart: PropTypes.string,
  dateCollectionEarlyClosure: PropTypes.string,
};

export default Progress;
