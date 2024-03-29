import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import getCategories from '@eci/utils/getCategories';
import getStatuses from '@eci/utils/getStatuses';
import getLanguages from '@eci/utils/getLanguages';

import I18nContext from '@eci/context/I18n';
import queryContext from '@eci/context/Query';

import ArrowDD from '../../../ArrowDD';
import Button from '../../../Button';
import Fieldset from '../../../Fieldset';
import Select from '../../../Select';
import TextInput from '../../../TextInput';

const InitiativesSearchAdvancedForm = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { query, dispachQuery } = useContext(queryContext);
  const { filters } = query;

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
  const [category, setCategory] = useState('any');
  const [status, setStatus] = useState('ALL');
  const [language, setLanguage] = useState(locale);

  const filtersResetHandlers = {
    TEXT_FREE: () => setTextFree(''),
    TEXT_EXACT: () => setTextExact(''),
    TEXT_CONDITIONAL: () => setTextConditional(''),
    ORGANISERS: () => setOrganisers(''),
    DATE_FROM: () => setDateFrom(''),
    DATE_TO: () => setDateTo(''),
    CATEGORY: () => setCategory('any'),
    STATUS: () => setStatus('ALL'),
    LANGUAGE: () => setLanguage(locale),
  };

  const filtersReset = () =>
    Object.values(filtersResetHandlers).forEach(handler => handler());

  // Change preferred language for initiatives' content on change of interface language.
  useEffect(() => {
    dispachQuery({ type: 'changeLanguage', language: locale });
  }, [locale]);

  useEffect(() => {
    Object.keys(filters).forEach(filter => {
      if (filter in filtersResetHandlers) {
        delete filtersResetHandlers[filter];
      }
    });
    filtersReset();
  }, [filters]);

  const categories = getCategories(t);
  const statuses = getStatuses(t);
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
        const dateFormatPattern = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g;

        // Validate input:
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
          (dateFrom !== '' && !dateFrom.match(dateFormatPattern)) ||
          (dateTo !== '' && !dateTo.match(dateFormatPattern))
        ) {
          setDateInvalid(true);
          return setDateInvalidMessage(t('Wrong formatting.'));
        }

        if (dateFrom === '' && dateTo !== '') {
          setDateInvalid(true);
          return setDateInvalidMessage(t('Initial date missing.'));
        }

        // If input is fine, reset feedback and send data to the API.
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
            CATEGORY: [category],
            STATUS: status !== 'ALL' ? [status] : [],
            // Consider the language filter only if it's different than the current interface.
            LANGUAGE: language !== locale ? [language] : [],
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
        legend={t('Date of registration')}
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
        value={category}
        options={categories}
        onChange={e => setCategory(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-status"
        label={t('Status')}
        groupClassName="ecl-u-mb-s"
        value={status}
        options={statuses}
        onChange={e => setStatus(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Select
        id="filter-language"
        label={t('Language')}
        groupClassName="ecl-u-mb-s"
        value={language}
        options={languages}
        onChange={e => setLanguage(e.target.value)}
        arrow={<ArrowDD />}
      />

      <Button label={t('Apply filters')} />
      <br />
      <Button
        onClick={e => {
          e.preventDefault();
          errorsReset();
          filtersReset();
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
