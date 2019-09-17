import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import InitiativesSearch from './Search/context/query';

import Icon from '../Icon';

const FilterTags = () => {
  const { t } = useTranslation();
  const { query, dispachQuery } = useContext(InitiativesSearch);

  const getPrettyLabel = filterMachineReadable => {
    const map = {
      TEXT_FREE: t('Free keywords'),
      TEXT_EXACT: t('Exact keywords'),
      TEXT_CONDITIONAL: t('Keywords (OR)'),
      ORGANISERS: t('Orgnisers'),
      DATE_FROM: t('From'),
      DATE_TO: t('To'),
    };

    if (filterMachineReadable in map) {
      return map[filterMachineReadable];
    }

    return filterMachineReadable;
  };

  if (query.filters && Object.keys(query.filters).length === 0) {
    return '';
  }

  return (
    <div className="ecl-u-mt-l ecl-u-mb-l ecl-u-d-flex ecl-u-flex-column ecl-u-flex-lg-row ecl-u-align-items-lg-center">
      {Object.keys(query.filters).map((filter, key) => (
        <span
          key={`filter-${key}`}
          className={key > 0 ? 'ecl-u-ml-lg-m ecl-u-mt-m ecl-u-mt-lg-none' : ''}
        >
          <span className="ecl-u-type-m">{getPrettyLabel(filter)}</span>
          <button
            className="ecl-u-ml-s ecl-tag ecl-tag--removable"
            value={filter}
            onClick={e => {
              e.preventDefault();

              dispachQuery({
                type: 'removeFilter',
                filter: e.target.value,
              });
            }}
          >
            {query.filters[filter].join(' ')}
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
  );
};

export default FilterTags;
