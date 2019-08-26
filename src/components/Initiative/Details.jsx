import React from 'react';
import has from 'lodash/has';

// Generic utils.
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import Document from './Document';
import Message from '../Message';
import config from './config';

const Details = ({ languageSpecificData, initiativeData, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  let organisers = null;
  const people = has(initiativeData, 'members')
    ? initiativeData.members.filter(p => !p.privacyApplied)
    : [];
  const reps = people.filter(p => p.type === 'REPRESENTATIVE');
  const subs = people.filter(p => p.type === 'SUBSTITUTE');
  const members = people.filter(p => p.type === 'MEMBER');
  const legalEs = people.filter(p => p.type === 'LEGAL_ENTITY');
  if (reps.length || subs.length || members.length || legalEs.length) {
    organisers = { reps, subs, members, legalEs };
  }

  console.log('initiativeData', initiativeData);
  console.log('languageSpecificData', languageSpecificData);

  return (
    <>
      {has(initiativeData, 'refusalReasons') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            Commission's reply stating the reasons for refusal of registration
          </h2>
          {typeof initiativeData.refusalReasons === 'string' ? (
            <p
              key={key}
              className="ecl-u-type-paragraph"
              dangerouslySetInnerHTML={{
                __html: initiativeData.refusalReasons,
              }}
            />
          ) : (
            <ul className="ecl-u-type-paragraph">
              {initiativeData.refusalReasons.map((reason, key) => (
                <li
                  key={key}
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: reason,
                  }}
                />
              ))}
            </ul>
          )}
          {has(initiativeData, 'refusalEURLEXLink') && (
            <>
              <h2 className="ecl-u-type-heading-2">EUR-Lex reference</h2>
              <p className="ecl-u-type-paragraph">
                <a
                  href={initiativeData.refusalEURLEXLink}
                  className="ecl-link"
                  target="_blank"
                >
                  {initiativeData.refusalEURLEXLink}
                </a>
              </p>
            </>
          )}
          <Document file={initiativeData.refusalDocument} />
        </div>
      ) : (
        ''
      )}
      {has(initiativeData, 'partiallyRegistered') ? (
        <>
          <p className="ecl-u-type-paragraph ecl-u-type-bold">
            Only a part(s) of this initiative has(ve) been registered. Please
            read the Commission Decision for the scope of the registered
            initiative.
          </p>
        </>
      ) : (
        ''
      )}
      <Message
        title={translation.disclaimer}
        description={
          'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.'
        }
        {...config.message}
      />
      {has(languageSpecificData, 'objectives') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{translation.objectives}</h2>
          <ul className="ecl-u-type-paragraph">
            {languageSpecificData.objectives.split(/\n/).map((line, key) => (
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
      {has(languageSpecificData, 'website') ? (
        <>
          <h2 className="ecl-u-type-heading-2">{translation.website}</h2>
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
      {has(languageSpecificData, 'annexText') ? (
        <>
          <h2 className="ecl-u-type-heading-2">Annex</h2>
          <p
            className="ecl-u-type-paragraph"
            dangerouslySetInnerHTML={{
              __html: languageSpecificData.annexText,
            }}
          />
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'treaties') ? (
        <>
          <h2 className="ecl-u-type-heading-2">
            Provisions of the Treaties considered relevant by the organisers
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
          <h2 className="ecl-u-type-heading-2">{translation.organisers}</h2>
          <ul className="ecl-u-type-paragraph">
            {has(organisers, 'legalEs') && organisers.legalEs.length ? (
              <li key="le-0">
                Legal entities
                {': '}
                {organisers.legalEs.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {has(organisers, 'reps') && organisers.reps.length
              ? organisers.reps.map((rep, key) => (
                  <li key={`r-${key}`}>
                    {translation.representative}
                    {': '}
                    {rep.fullName}
                    {rep.email ? ` - ${rep.email}` : ''}
                  </li>
                ))
              : ''}
            {has(organisers, 'subs') && organisers.subs.length
              ? organisers.subs.map((sub, key) => (
                  <li key={`s-${key}`}>
                    {translation.substitute}
                    {': '}
                    {sub.fullName}
                    {sub.email ? ` - ${sub.email}` : ''}
                  </li>
                ))
              : ''}
            {has(organisers, 'members') && organisers.members.length ? (
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
    </>
  );
};

export default Details;
