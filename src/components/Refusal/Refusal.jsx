import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useI18nContext } from '@eci/context/I18n';
import { getReasons } from './utils';

const Refusal = ({ reasons: input }) => {
  if (!input || input.length === 0 || !Array.isArray(input)) return '';

  const { locale: language } = useI18nContext();
  const reasons = getReasons({ input, language });

  if (reasons.length === 0) return '';

  const { t } = useTranslation();

  return (
    <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
      <h2 className="ecl-u-type-heading-2">
        {t(
          "Commission's reply stating the reasons for refusal of registration"
        )}
      </h2>
      <ul className="ecl-u-type-paragraph">
        {reasons.map((reason, key) => (
          <li key={key} className="ecl-u-type-paragraph">
            {reason.RTR_MESSAGE}
          </li>
        ))}
      </ul>
    </div>
  );
};

Refusal.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.string),
};

export default Refusal;
