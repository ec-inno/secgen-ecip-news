import React from 'react';
import { useTranslation } from 'react-i18next';

const Refusal = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return '';

  const list = [];
  const listSupported = [
    'reason.action.registration.reject.abuse',
    'reason.action.registration.reject.competences',
    'reason.action.registration.reject.requirements',
    'reason.action.registration.reject.values',
  ];

  reasons.forEach(reason => {
    if (listSupported.includes(reason)) {
      list.push(reason);
    }
  });

  if (list.length === 0) return '';

  const { t } = useTranslation();

  return (
    <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
      <h2 className="ecl-u-type-heading-2">
        {t(
          "Commission's reply stating the reasons for refusal of registration"
        )}
      </h2>
      <ul className="ecl-u-type-paragraph">
        {list.map((item, key) => (
          <li key={key} className="ecl-u-type-paragraph">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Refusal;
