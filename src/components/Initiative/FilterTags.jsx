import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import getCategories from '@eci/utils/getCategories';
import getLanguages from '@eci/utils/getLanguages';
import getStatuses from '@eci/utils/getStatuses';

import queryContext from '@eci/context/Query';

import Icon from '../Icon';

const FilterTags = () => {
  const { t } = useTranslation();
  const { query, dispachQuery } = useContext(queryContext);

  const getPrettyLabel = machineReadable => {
    const map = {
      TEXT_FREE: t('Free keywords'),
      TEXT_EXACT: t('Exact keywords'),
      TEXT_CONDITIONAL: t('Keywords (OR)'),
      ORGANISERS: t('Orgnisers'),
      DATE_FROM: t('From'),
      DATE_TO: t('To'),
      CATEGORY: t('Category'),
      STATUS: t('Status'),
      LANGUAGE: t('Language'),
    };

    if (machineReadable in map) {
      return map[machineReadable];
    }

    return machineReadable;
  };

  const getPrettyValue = machineReadable => {
    const categories = getCategories(t);
    const category = categories.find(cat => cat.value === machineReadable);

    if (category && category.label) return category.label;

    const languages = getLanguages(t);
    const language = languages.find(l => l.value === machineReadable);

    if (language && language.label) return language.label;

    const statuses = getStatuses(t);
    const status = statuses.find(s => s.value === machineReadable);

    if (status && status.label) return status.label;

    return machineReadable;
  };

  return (
    <>
      {query.filters && Object.keys(query.filters).length !== 0 && (
        <div className="ecl-u-mt-l ecl-u-mb-l ecl-u-d-flex ecl-u-flex-column ecl-u-flex-lg-row ecl-u-align-items-lg-center">
          {Object.keys(query.filters).map((filter, key) => (
            <span
              key={`filter-${key}`}
              className={
                key > 0 ? 'ecl-u-ml-lg-m ecl-u-mt-m ecl-u-mt-lg-none' : ''
              }
            >
              <span className="ecl-u-type-m">{getPrettyLabel(filter)}</span>
              <button
                className="ecl-u-ml-s ecl-tag ecl-tag--removable"
                value={filter}
                onClick={e => {
                  e.preventDefault();

                  dispachQuery({
                    type: 'unsetFilter',
                    filter: e.target.value,
                  });
                }}
              >
                {query.filters[filter].map(getPrettyValue).join(' ')}
                <span className="ecl-tag__icon">
                  <Icon
                    className="ecl-tag__icon-close"
                    shape="ui--close"
                    size="xs"
                  />
                  <Icon
                    className="ecl-tag__icon-close-filled"
                    shape="ui--close"
                    size="xs"
                  />
                </span>
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterTags;
