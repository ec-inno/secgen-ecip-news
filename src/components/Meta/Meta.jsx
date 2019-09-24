import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import formatStatus from '../../utils/formatStatus';

import Icon from '../Icon';
import Link from '../Link/LinkEcl';

const Meta = ({
  status,
  registrationNumber,
  deadline,
  dateRefusal,
  dateRegistration,
  supportLink,
}) => {
  if (
    !status &&
    !registrationNumber &&
    !deadline &&
    !dateRefusal &&
    !dateRegistration &&
    !supportLink
  ) {
    return '';
  }

  const { t } = useTranslation();

  return (
    <ul className="ecl-u-d-flex ecl-u-pl-none ecl-u-mv-l ecl-u-type-m ecl-page-header__info-list">
      <li className="ecl-page-header__info-item">
        {status && (
          <div className="ecl-u-d-flex">
            <Icon
              shape="general--organigram"
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
            />
            {t('Current status')}
            {': '}
            {formatStatus(status)}
          </div>
        )}
        {registrationNumber && (
          <div className="ecl-u-d-flex ecl-u-mt-xs">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--edit"
            />
            {t('Commission registration number')}
            {': '}
            {registrationNumber ? registrationNumber : '...'}
          </div>
        )}
      </li>
      <li className="ecl-u-ml-l ecl-page-header__info-item">
        {deadline && (
          <div className="ecl-u-d-flex">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            {t('Deadline')}
            {': '}
            {deadline}
          </div>
        )}
        {dateRefusal && (
          <div className="ecl-u-d-flex">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            {t('Date of refulsal')}
            {': '}
            {dateRefusal}
          </div>
        )}
        {dateRegistration && (
          <div className="ecl-u-d-flex ecl-u-mt-xs">
            <Icon
              className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
              shape="general--calendar"
            />
            {t('Date of registration')}
            {': '}
            {dateRegistration}
          </div>
        )}
      </li>

      {supportLink && (
        <li className="ecl-u-ml-l ecl-page-header__info-item">
          <Link
            href={supportLink}
            variant="cta"
            label={t('Support this initiative')}
          />
        </li>
      )}
    </ul>
  );
};

Meta.propTypes = {
  status: PropTypes.string,
  registrationNumber: PropTypes.string,
  deadline: PropTypes.string,
  dateRefusal: PropTypes.string,
  dateRegistration: PropTypes.string,
  supportLink: PropTypes.string,
};

export default Meta;
