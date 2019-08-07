import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import has from 'lodash/has';
import isArray from 'lodash/isArray';

import getDateFormatted from '../utils/getDateFormatted';
import getDefaultLanguage from '../utils/getDefaultLanguage';
import getInitiative from '../utils/getInitiative';
import getInitiativeStatusLabel from '../utils/getInitiativeStatusLabel';

// Generic
import Icon from '../components/Icon';
import Message from '../components/Message';
// import Spinner from '../components/Spinner/Spinner';

// Sub-components
import Progress from '../components/Initiative/Progress';

// Partials
// This is a client-side page in Gatsby => no `location` parameter.
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ForumBanner from '../components/ForumBanner';
import Footer from '../components/Footer/FooterLanguage';

const Initiative = ({ location, pageContext }) => {
  const messageConfig = {
    variant: 'warning',
    icon: {
      shape: 'notifications--warning',
      size: 'l',
    },
  };

  const clientRoute = pageContext.layout === 'dynamic' ? true : false;
  const defaultLanguage = getDefaultLanguage();
  let currentLanguage = defaultLanguage;
  const hash = location.hash || '#';
  const parts = hash.slice(1).split('-');

  const [initiativeData, setData] = useState({});

  if (parts && parts.length) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? '/initiative'
        : 'https://ec.europa.eu/citizens-initiative/services/initiative';

    const [language, status, year, number] = parts;

    if (currentLanguage !== language) {
      currentLanguage = language;
    }

    useEffect(() => {
      const fetchData = async () => {
        let initiativeData = {};

        // On netlify.com, which is test environment, use a function.
        if (location.origin && location.origin.includes('netlify.com')) {
          const result = await axios.get(
            `${location.origin}/.netlify/functions/initiative?year=${year}&number=${number}`
          );
          initiativeData = result.data.initiative;
        }
        // Otherwise make requests as usual.
        else {
          initiativeData = await getInitiative({ endpoint, year, number });
        }

        const dateRegistration = has(initiativeData, 'registrationDate')
          ? getDateFormatted(initiativeData.registrationDate)
          : '';

        console.log('initiativeData', initiativeData);

        let details = {};

        if (has(initiativeData, 'initiativeLanguages.initiativeLanguage')) {
          // Sometimes `initiativeLanguages.initiativeLanguage` is an array.
          // This means that the given initiative is available in several languages.
          if (isArray(initiativeData.initiativeLanguages.initiativeLanguage)) {
            details = initiativeData.initiativeLanguages.initiativeLanguage.find(
              l => l['@code'] === currentLanguage
            );

            // If the list of available translations does not have the currently selected language.
            // Fallback to default language.
            if (!details.title && currentLanguage !== defaultLanguage) {
              details = initiativeData.initiativeLanguages.initiativeLanguage.find(
                l => l['@code'] === defaultLanguage
              );
            }
          }

          // When not an array, this means that the initiative is available in only 1 language.
          // This scenario hopes that the currently selected language is the original language of creation.
          if (
            initiativeData.initiativeLanguages.initiativeLanguage['@code'] ===
            currentLanguage
          ) {
            details = initiativeData.initiativeLanguages.initiativeLanguage;
          }

          // If the initiative did not have content in default language or translation.
          // Fallback to what we can get, better than nothing.
          if (!details.title) {
            details = initiativeData.initiativeLanguages.initiativeLanguage;
          }
        }

        console.log('details', details);

        const people = has(initiativeData, 'organisers.organiser')
          ? initiativeData.organisers.organiser
          : [];

        const reps = people.filter(p => p['@role'] === 'R');
        const subs = people.filter(p => p['@role'] === 'S');
        const members = people.filter(p => p['@role'] === 'M');

        const initiative = {
          title: details.title,
          status: initiativeData.status,
          dateRegistration,
          dateDeadline: 'N/A', // deadlineForCollection available from searchEntry is missing in details endpoint.
          number: initiativeData.registrationNumber,
          subjectMatter: details.subjectMatter,
          objectives: details.mainObjectives,
          legalBase: details.legalBase,
          website: details.website,
          organisers: { reps, subs, members },
        };

        setData(initiative);
      };

      fetchData();
    }, [currentLanguage]);
  }

  return (
    <>
      <Helmet title={initiativeData.title ? initiativeData.title : '...'} />
      <TopMessage clientRoute={clientRoute} />
      <Header clientRoute={clientRoute} />
      <Menu clientRoute={clientRoute} />
      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {initiativeData.title ? initiativeData.title : '...'}
            </h1>
          </div>
          <ul className="ecl-u-d-flex ecl-u-pl-none ecl-u-mv-l ecl-u-type-m ecl-page-header__info-list">
            <li className="ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  shape="general--organigram"
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                />
                Current status:{' '}
                {initiativeData.status
                  ? getInitiativeStatusLabel(initiativeData.status)
                  : '...'}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--edit"
                />
                Commission registration number:{' '}
                {initiativeData.number ? initiativeData.number : '...'}
              </div>
            </li>
            <li className="ecl-u-ml-l ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                Deadline:{' '}
                {initiativeData.dateDeadline
                  ? initiativeData.dateDeadline
                  : '...'}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                Date of registration:{' '}
                {initiativeData.dateRegistration
                  ? initiativeData.dateRegistration
                  : '...'}
              </div>
            </li>
            <li className="ecl-u-ml-l ecl-page-header__info-item">
              <a
                href="#"
                target="_blank"
                type="submit"
                className="ecl-button ecl-button--call"
              >
                <span className="ecl-button__container">
                  <span className="ecl-button__label" data-ecl-label="true">
                    Support this initiative
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress initiative={initiativeData} />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {initiativeData.status === 'REGISTERED' ? (
                <>
                  <p className="ecl-u-type-paragraph ecl-u-type-bold">
                    Only a part(s) of this initiative has(ve) been registered.
                    Please read the Commission Decision for the scope of the
                    registered initiative.
                  </p>
                  <Message
                    title="Disclaimer"
                    description={
                      'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.'
                    }
                    {...messageConfig}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.subjectMatter ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Subject-matter</h2>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: initiativeData.subjectMatter,
                    }}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.objectives ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Objectives</h2>
                  <ul className="ecl-u-type-paragraph">
                    {initiativeData.objectives.split(/\n/).map((line, key) => (
                      <li
                        key={key}
                        className="ecl-u-type-paragraph"
                        dangerouslySetInnerHTML={{
                          __html: line,
                        }}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                ''
              )}
              {initiativeData.legalBase ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    Provisions of the Treaties considered relevant by the
                    organisers
                  </h2>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: initiativeData.legalBase,
                    }}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.website ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Website</h2>
                  <p className="ecl-u-type-paragraph">
                    <a
                      href={initiativeData.website}
                      className="ecl-link"
                      target="_blank"
                    >
                      {initiativeData.website}
                    </a>
                  </p>
                </>
              ) : (
                ''
              )}
              {initiativeData.organisers ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    Organisers / Members of citizens' committee:
                  </h2>
                  <ul className="ecl-u-type-paragraph">
                    {has(initiativeData, 'organisers.reps')
                      ? initiativeData.organisers.reps.map((rep, key) => (
                          <li key={`r-${key}`}>
                            Representative: {rep.fullname}
                            {rep.email ? ` - ${rep.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(initiativeData, 'organisers.subs')
                      ? initiativeData.organisers.subs.map((sub, key) => (
                          <li key={`s-${key}`}>
                            Substitute: {sub.fullname}
                            {sub.email ? ` - ${sub.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(initiativeData, 'organisers.members') ? (
                      <li key="m-0">
                        Members:{' '}
                        {initiativeData.organisers.members
                          .map(m => m.fullname)
                          .join(', ')}
                      </li>
                    ) : (
                      ''
                    )}
                  </ul>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
      <ForumBanner clientRoute={clientRoute} />
      <Footer clientRoute={clientRoute} />
    </>
  );
};

export default Initiative;
