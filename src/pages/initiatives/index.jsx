import React, { useState, useEffect } from 'react';
import axios from 'axios';
import has from 'lodash/has';

// Generic utils.
import formatStatus from '../../utils/formatStatus';
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

// Page-specific utilities
// When components need more than a few attributes, keep config params out.
import config from './config';

// Generic
import SEO from '../../components/SEO';
import Icon from '../../components/Icon';
import Message from '../../components/Message';

// Sub-components, keep out of /src/pages.
import Progress from '../../components/Initiative/Progress';

const Initiative = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [initiativeData, setInitiativeData] = useState({});

  useEffect(() => {
    const fetchInitiative = async () => {
      const initiativeId = location.hash.substr(1, location.hash.length);
      const endpoint = `${api}/register/details/${initiativeId}`;

      try {
        const response = await axios.get(endpoint);
        setInitiativeData(response.data);
      } catch (error) {
        console.error(`Error while fetching data about initiative #{1}`, error);
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
      }
    };

    fetchInitiative();
  }, [language]);

  if (errorMessage) {
    const errorComponentConfig = {
      variant: 'error',
      icon: {
        shape: 'notifications--error',
        size: 'l',
      },
      close: {
        variant: 'ghost',
        label: 'Close',
        icon: {
          shape: 'ui--close',
          size: 's',
        },
      },
    };

    return (
      <div className="ecl-container ecl-u-mt-l">
        <Message
          className={errorMessageIsVisible ? '' : 'hidden'}
          onClose={() => setErrorMessageVisibility(false)}
          title={`Issue while getting data about initiative ${1}`}
          description={errorMessage}
          {...errorComponentConfig}
        />
      </div>
    );
  }

  const languageSpecificData = initiativeData.linguisticVersions
    ? Object.values(initiativeData.linguisticVersions).find(
        version => version.languageCode.toLowerCase() === language
      )
    : {};

  // console.log('languageSpecificData', languageSpecificData);
  // console.log('initiativeData', initiativeData);

  const people = has(initiativeData, 'members')
    ? initiativeData.members.filter(p => !p.privacyApplied)
    : [];
  const reps = people.filter(p => p.type === 'REPRESENTATIVE');
  const subs = people.filter(p => p.type === 'SUBSTITUTE');
  const members = people.filter(p => p.type === 'MEMBER');
  const legalEs = people.filter(p => p.type === 'LEGAL_ENTITY');
  const organisers = { reps, subs, members, legalEs };

  console.log('organisers', organisers);

  return (
    <>
      <SEO
        location={location}
        title={
          has(languageSpecificData, 'title')
            ? languageSpecificData.title
            : '...'
        }
      />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {has(languageSpecificData, 'title')
                ? languageSpecificData.title
                : '...'}
            </h1>
          </div>
          <ul className="ecl-u-d-flex ecl-u-pl-none ecl-u-mv-l ecl-u-type-m ecl-page-header__info-list">
            <li className="ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  shape="general--organigram"
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                />
                {translation.current_status}
                {': '}
                {has(initiativeData, 'status')
                  ? formatStatus(initiativeData.status)
                  : '...'}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--edit"
                />
                {translation.registration_number}
                {': '}
                {initiativeData.comRegNum ? initiativeData.comRegNum : '...'}
              </div>
            </li>
            <li className="ecl-u-ml-l ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                {translation.deadline}
                {': '}
                {initiativeData.deadline}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                {translation.date_registration}
                {': '}
                {initiativeData.registrationDate
                  ? initiativeData.registrationDate
                  : '...'}
              </div>
            </li>
            {initiativeData.supportLink && (
              <li className="ecl-u-ml-l ecl-page-header__info-item">
                <a
                  href={initiativeData.supportLink}
                  target="_blank"
                  type="submit"
                  className="ecl-button ecl-button--call"
                >
                  <span className="ecl-button__container">
                    <span className="ecl-button__label" data-ecl-label="true">
                      {translation.support_cat}
                    </span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress
                progress={initiativeData.progress}
                location={location}
              />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {initiativeData.partiallyRegistered ? (
                <>
                  <p className="ecl-u-type-paragraph ecl-u-type-bold">
                    Only a part(s) of this initiative has(ve) been registered.
                    Please read the Commission Decision for the scope of the
                    registered initiative.
                  </p>
                  <Message
                    title={translation.disclaimer}
                    description={
                      'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.'
                    }
                    {...config.message}
                  />
                </>
              ) : (
                ''
              )}
              {languageSpecificData.objectives ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    {translation.objectives}
                  </h2>
                  <ul className="ecl-u-type-paragraph">
                    {languageSpecificData.objectives
                      .split(/\n/)
                      .map((line, key) => (
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
              {languageSpecificData.website ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    {translation.website}
                  </h2>
                  <p className="ecl-u-type-paragraph">
                    <a
                      href={languageSpecificData.website}
                      className="ecl-link"
                      target="_blank"
                    >
                      {languageSpecificData.website}
                    </a>
                  </p>
                </>
              ) : (
                ''
              )}
              {languageSpecificData.treaties ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    Provisions of the Treaties considered relevant by the
                    organisers
                  </h2>
                  <p className="ecl-u-type-paragraph">
                    {languageSpecificData.treaties}
                  </p>
                </>
              ) : (
                ''
              )}
              {organisers ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    {translation.organisers}
                  </h2>
                  <ul className="ecl-u-type-paragraph">
                    {has(organisers, 'legalEs') ? (
                      <li key="le-0">
                        Legal entities
                        {': '}
                        {organisers.legalEs.map(m => m.fullName).join(', ')}
                      </li>
                    ) : (
                      ''
                    )}
                    {has(organisers, 'reps')
                      ? organisers.reps.map((rep, key) => (
                          <li key={`r-${key}`}>
                            {translation.representative}
                            {': '}
                            {rep.fullName}
                            {rep.email ? ` - ${rep.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(organisers, 'subs')
                      ? organisers.subs.map((sub, key) => (
                          <li key={`s-${key}`}>
                            {translation.substitute}
                            {': '}
                            {sub.fullName}
                            {sub.email ? ` - ${sub.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(organisers, 'members') ? (
                      <li key="m-0">
                        {translation.members}
                        {': '}
                        {organisers.members.map(m => m.fullName).join(', ')}
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
    </>
  );
};

export default Initiative;
