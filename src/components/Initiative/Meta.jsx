import React from 'react';
import has from 'lodash/has';

import formatStatus from '../../utils/formatStatus';

import Icon from '../Icon';

const Meta = ({ initiativeData }) => {
  return (
    <ul className="ecl-u-d-flex ecl-u-pl-none ecl-u-mv-l ecl-u-type-m ecl-page-header__info-list">
      <li className="ecl-page-header__info-item">
        {has(initiativeData, 'status') && (
          <div className="ecl-u-d-flex">
            <Icon
              shape="general--organigram"
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
            />
            Current status
            {': '}
            {formatStatus(initiativeData.status)}
          </div>
        )}
        {has(initiativeData, 'comRegNum') && (
          <div className="ecl-u-d-flex ecl-u-mt-xs">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--edit"
            />
            Commission registration number
            {': '}
            {initiativeData.comRegNum ? initiativeData.comRegNum : '...'}
          </div>
        )}
      </li>
      <li className="ecl-u-ml-l ecl-page-header__info-item">
        {has(initiativeData, 'deadline') && (
          <div className="ecl-u-d-flex">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            Deadline
            {': '}
            {initiativeData.deadline}
          </div>
        )}
        {has(initiativeData, 'refusalDate') && (
          <div className="ecl-u-d-flex">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            Date of refulsal
            {': '}
            {initiativeData.refusalDate}
          </div>
        )}
        {has(initiativeData, 'registrationDate') && (
          <div className="ecl-u-d-flex ecl-u-mt-xs">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            Date of registration
            {': '}
            {initiativeData.registrationDate}
          </div>
        )}
      </li>

      {has(initiativeData, 'supportLink') && (
        <li className="ecl-u-ml-l ecl-page-header__info-item">
          <a
            href={initiativeData.supportLink}
            target="_blank"
            type="submit"
            className="ecl-button ecl-button--call"
          >
            <span className="ecl-button__container">
              <span className="ecl-button__label" data-ecl-label="true">
                {translation.support_cat}
              </span>
            </span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default Meta;
