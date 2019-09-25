import React from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';

import File from '../File';

const Details = ({ linguisticVersion, details }) => {
  const { t } = useTranslation();

  return (
    <>
      {has(linguisticVersion, 'decisionUrl') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            {t('Answer of the European Commission')}
          </h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={linguisticVersion.decisionUrl}
              className="ecl-link"
              target="_blank"
            >
              {linguisticVersion.decisionUrl}
            </a>
          </p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Details;
