import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import InitiativesSearch from '../../../../context/InitiativesSearch';

import ArrowDD from '../../../ArrowDD';
import Button from '../../../Button';
import Fieldset from '../../../Fieldset';
import Select from '../../../Select';
import TextInput from '../../../TextInput';

import getCategories from '../../utils/getCategories';
import getLanguages from '../../utils/getLanguages';

const InitiativesSearchAdvancedForm = () => {
  const { t } = useTranslation();
  const { query, dispachQuery } = useContext(InitiativesSearch);

  const [textFree, setTextFree] = useState('');
  const [textExact, setTextExact] = useState('');
  const [textConditional, setTextConditional] = useState('');
  const [KWinvalid, setKWInvalid] = useState(false);
  const [KWValidationMessage, setKWValidationMessage] = useState('');
  const [organisers, setOrganisers] = useState('');
  const [orgInvalid, setOrgInvalid] = useState(false);
  const [orgInvalidMessage, setOrgInvalidMessage] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [dateInvalid, setDateInvalid] = useState(false);
  const [dateInvalidMessage, setDateInvalidMessage] = useState('');

  const categories = getCategories(t);
  const languages = getLanguages(t);

  const errorsReset = () => {
    setKWValidationMessage('');
    setKWInvalid(false);
    setOrgInvalidMessage('');
    setOrgInvalid(false);
    setDateInvalidMessage('');
    setDateInvalid(false);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        if (
          (textFree !== '' && textExact !== '') ||
          (textFree !== '' && textConditional !== '') ||
          (textExact !== '' && textConditional !== '')
        ) {
          setKWInvalid(true);
          return setKWValidationMessage(
            t('Only one field in this group can be used at the same time.')
          );
        }

        if (
          (textFree !== '' && textFree.length < 3) ||
          (textExact !== '' && textExact.length < 3) ||
          (textConditional !== '' && textConditional.length < 3)
        ) {
          setKWInvalid(true);
          return setKWValidationMessage(t('At least 3 characters required.'));
        }

        if (organisers !== '' && organisers.length < 3) {
          setOrgInvalid(true);
          return setOrgInvalidMessage(t('At least 3 characters required.'));
        }

        if (
          (dateFrom !== '' &&
            !dateFrom.match(
              /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g
            )) ||
          (dateTo !== '' &&
            !dateTo.match(
              /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g
            ))
        ) {
          setDateInvalid(true);
          return setDateInvalidMessage(t('Wrong formatting.'));
        }

        if (dateFrom === '' && dateTo !== '') {
          setDateInvalid(true);
          return setDateInvalidMessage(t('Initial date missing.'));
        }

        errorsReset();

        dispachQuery({
          type: 'setFilters',
          filters: {
            TEXT_FREE: [textFree],
            TEXT_EXACT: [textExact],
            TEXT_CONDITIONAL: textConditional.split(' '),
            ORGANISERS: [organisers],
            DATE_FROM: [dateFrom],
            DATE_TO: [dateTo],
          },
        });
      }}
    >
      <Fieldset
        className="ecl-u-mb-s"
        legend={t('Keywords search')}
        invalid={KWinvalid}
        invalidText={KWValidationMessage}
      >
        <TextInput
          groupClassName="ecl-u-mb-s"
          id="filter-text-free"
          label={t('All these words')}
          value={textFree}
          onChange={e => setTextFree(e.target.value)}
        />

        <TextInput
          groupClassName="ecl-u-mb-s"
          id="filter-text-exact"
          label={t('Exact wording or phrase')}
          value={textExact}
          onChange={e => setTextExact(e.target.value)}
        />

        <TextInput
          groupClassName="ecl-u-mb-s"
          id="filter-text-conditional"
          label={t('One or more of')}
          value={textConditional}
          onChange={e => setTextConditional(e.target.value)}
        />
      </Fieldset>

      <TextInput
        groupClassName="ecl-u-mb-s"
        id="filter-organisers"
        label={t('Organiser')}
        value={organisers}
        onChange={e => setOrganisers(e.target.value)}
        invalid={orgInvalid}
        invalidText={orgInvalidMessage}
      />

      <Fieldset
        className="ecl-u-mb-s"
        legend={t('Date range')}
        invalid={dateInvalid}
        invalidText={dateInvalidMessage}
      >
        <TextInput
          groupClassName="ecl-u-mb-s"
          id="filter-date-from"
          label={t('From')}
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          helperText={t('dd/mm/yyyy')}
        />

        <TextInput
          groupClassName="ecl-u-mb-s"
          id="filter-date-to"
          label={t('To')}
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          helperText={t('dd/mm/yyyy')}
        />
      </Fieldset>

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

          // Errors.
          errorsReset();

          // Text fields.
          setTextFree('');
          setTextExact('');
          setTextConditional('');
          setOrganisers('');
          setDateFrom('');
          setDateTo('');

          // Query state.
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
