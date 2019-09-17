import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowDD from '../../../ArrowDD';
import Select from '../../../Select';
import TextInput from '../../../TextInput';
import Button from '../../../Button';

import getCategories from '../../utils/getCategories';
import getLanguages from '../../utils/getLanguages';

const InitiativesSearchAdvancedForm = ({ query, dispachQuery }) => {
  const { t } = useTranslation();

  const [textFree, setTextFree] = useState('');
  const [textExact, setTextExact] = useState('');
  const [textConditional, setTextConditional] = useState('');
  const [organisers, setOrganisers] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const categories = getCategories(t);
  const languages = getLanguages(t);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-free"
        label={t('All these words')}
        value={textFree}
        onChange={e => setTextFree(e.target.value)}
        onBlur={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'TEXT_FREE',
            filterValue: [e.target.value],
          })
        }
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-exact"
        label={t('Exact wording or phrase')}
        value={textExact}
        onChange={e => setTextExact(e.target.value)}
        onBlur={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'TEXT_EXACT',
            filterValue: [e.target.value],
          })
        }
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-text-conditional"
        label={t('One or more of')}
        value={textConditional}
        onChange={e => setTextConditional(e.target.value)}
        onBlur={e => {
          const keywordsOr = e.target.value.split(' ');

          dispachQuery({
            type: 'changeFilter',
            filter: 'TEXT_CONDITIONAL',
            filterValue: keywordsOr,
          });
        }}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-organisers"
        label={t('Organiser')}
        value={organisers}
        onChange={e => setOrganisers(e.target.value)}
        onBlur={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'ORGANISERS',
            filterValue: [e.target.value],
          })
        }
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-date-from"
        label={t('From')}
        value={dateFrom}
        onChange={e => setDateFrom(e.target.value)}
        onBlur={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'DATE_FROM',
            filterValue: [e.target.value],
          })
        }
        helperText={t('dd/mm/yyyy')}
      />

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-date-to"
        label={t('To')}
        value={dateTo}
        onChange={e => setDateTo(e.target.value)}
        onBlur={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'DATE_TO',
            filterValue: [e.target.value],
          })
        }
        helperText={t('dd/mm/yyyy')}
      />

      <Select
        id="filter-category"
        label={t('Filter by category')}
        groupClassName="ecl-u-mb-s"
        value={
          query.filters &&
          query.filters &&
          query.filters.CATEGORY &&
          query.filters.CATEGORY.length
            ? query.filters.CATEGORY[0]
            : ''
        }
        options={categories}
        onChange={e =>
          dispachQuery({
            type: 'changeFilter',
            filter: 'CATEGORY',
            filterValue: [e.target.value],
          })
        }
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-status"
        label={t('Status')}
        groupClassName="ecl-u-mb-s"
        value={query.status}
        options={[
          { value: 'ALL', label: t('All') },
          { value: 'ONGOING', label: t('Ongoing') },
          { value: 'ANSWERED', label: t('Answered') },
          { value: 'REFUSED', label: t('Refused') },
        ]}
        onChange={e =>
          dispachQuery({ type: 'changeStatus', status: e.target.value })
        }
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-language"
        label={t('Language')}
        groupClassName="ecl-u-mb-s"
        value={query.language}
        options={languages}
        onChange={e =>
          dispachQuery({
            type: 'changeLanguage',
            language: e.target.value,
          })
        }
        arrow={<ArrowDD />}
      />

      <Button label={t('Apply filters')} />
      <br />
      <Button
        onClick={e => {
          e.preventDefault();

          // Clear text fields.
          setTextFree('');
          setTextExact('');
          setTextConditional('');
          setOrganisers('');
          setDateFrom('');
          setDateTo('');

          // And the rest depending on query state store.
          dispachQuery({ type: 'reset' });
        }}
        className="ecl-u-mt-m ecl-u-mt-lg-l"
        variant="secondary"
        label={t('Clear all')}
      />
    </form>
  );
};

export default InitiativesSearchAdvancedForm;
