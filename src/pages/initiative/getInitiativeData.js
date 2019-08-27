import React from 'react';
import axios from 'axios';
import has from 'lodash/has';
import isArray from 'lodash/isArray';

import I18nContext from '../../context/I18n';

import getDefaultLanguage from '../../utils/getDefaultLanguage';
import getDateFormatted from '../../utils/getDateFormatted';
import getInitiative from '../../utils/getInitiative';

const endpoint =
  process.env.NODE_ENV === 'development'
    ? '/initiative'
    : 'https://ec.europa.eu/citizens-initiative/services/initiative';

const getInitiativeData = async () => {
  let initiativeDetails = {};
  let initiativeBasicInfo = {};
  const defaultLanguage = getDefaultLanguage();
  const { location, locale } = React.useContext(I18nContext);

  const clientRouteParameters = location.hash.slice(1).split('-');
  const [year, number] = clientRouteParameters;

  // On netlify.com, which is test environment, use a function.
  if (location.origin && location.origin.includes('netlify.com')) {
    const result = await axios.get(
      `${location.origin}/.netlify/functions/initiative?year=${year}&number=${number}`
    );
    initiativeBasicInfo = result.data.initiative;
  }
  // Otherwise make requests as usual.
  else {
    initiativeBasicInfo = await getInitiative({ endpoint, year, number });
  }

  if (has(initiativeBasicInfo, 'initiativeLanguages.initiativeLanguage')) {
    // Sometimes `initiativeLanguages.initiativeLanguage` is an array.
    // This means that the given initiative is available in several languages.
    if (isArray(initiativeBasicInfo.initiativeLanguages.initiativeLanguage)) {
      initiativeDetails = initiativeBasicInfo.initiativeLanguages.initiativeLanguage.find(
        l => l['@code'] === locale
      );

      // If the list of available translations does not have the currently selected language.
      // Fallback to default language.
      if (!initiativeDetails.title && locale !== defaultLanguage) {
        initiativeDetails = initiativeBasicInfo.initiativeLanguages.initiativeLanguage.find(
          l => l['@code'] === defaultLanguage
        );
      }
    }

    // When not an array, this means that the initiative is available in only 1 language.
    // This scenario hopes that the currently selected language is the original language of creation.
    if (
      initiativeBasicInfo.initiativeLanguages.initiativeLanguage['@code'] ===
      locale
    ) {
      initiativeDetails =
        initiativeBasicInfo.initiativeLanguages.initiativeLanguage;
    }

    // If the initiative did not have content in default language or translation.
    // Fallback to what we can get, better than nothing.
    if (!initiativeDetails.title) {
      initiativeDetails =
        initiativeBasicInfo.initiativeLanguages.initiativeLanguage;
    }
  }

  // Prepare data for the object to return.
  const title = has(initiativeDetails, 'title') ? initiativeDetails.title : '';
  const status = has(initiativeBasicInfo, 'status')
    ? initiativeBasicInfo.status
    : '';
  const dateRegistration = has(initiativeBasicInfo, 'registrationDate')
    ? getDateFormatted(initiativeBasicInfo.registrationDate)
    : '';
  const registrationNumber = has(initiativeBasicInfo, 'registrationNumber')
    ? initiativeBasicInfo.registrationNumber
    : '';
  const subjectMatter = has(initiativeDetails, 'subjectMatter')
    ? initiativeDetails.subjectMatter
    : '';
  const objectives = has(initiativeDetails, 'mainObjectives')
    ? initiativeDetails.mainObjectives
    : '';
  const legalBase = has(initiativeDetails, 'legalBase')
    ? initiativeDetails.legalBase
    : '';
  const website = has(initiativeDetails, 'website')
    ? initiativeDetails.website
    : '';
  const people = has(initiativeBasicInfo, 'organisers.organiser')
    ? initiativeBasicInfo.organisers.organiser
    : [];

  const reps = people.filter(p => p['@role'] === 'R');
  const subs = people.filter(p => p['@role'] === 'S');
  const members = people.filter(p => p['@role'] === 'M');

  const initiative = {
    title,
    status,
    dateRegistration,
    dateDeadline: 'N/A', // deadlineForCollection available from searchEntry is missing in initiativeDetails endpoint.
    number: registrationNumber,
    subjectMatter,
    objectives,
    legalBase,
    website,
    organisers: { reps, subs, members },
  };

  return initiative;
};

export default getInitiativeData;
