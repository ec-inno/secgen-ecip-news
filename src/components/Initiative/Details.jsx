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

  // [REPRESENTATIVE, SUBSTITUTE, MEMBER, LEGAL_ENTITY, OTHER, DPO ]
  const people = has(initiativeData, 'members')
    ? initiativeData.members
        .map(p => {
          const fullName = p.activityPeriod
            ? `${fullName} (${p.activityPeriod})`
            : fullName;
          return {
            fullName,
            ...p,
          };
        })
        .filter(p => !p.privacyApplied)
    : [];
  const reps = people.filter(p => p.type === 'REPRESENTATIVE');
  const subs = people.filter(p => p.type === 'SUBSTITUTE');
  const members = people.filter(p => p.type === 'MEMBER');
  const legalEs = people.filter(p => p.type === 'LEGAL_ENTITY');
  const others = people.filter(p => p.type === 'OTHER');
  const dpos = people.filter(p => p.type === 'DPO');

  console.log('initiativeData', initiativeData);
  console.log('languageSpecificData', languageSpecificData);

  return (
    <>
      {has(languageSpecificData, 'decisionUrl') ? (
        <div className="eci-answer ecl-u-pa-m ecl-u-mb-l">
          <h2 className="ecl-u-type-heading-2">
            Answer of the European Commission
          </h2>
          <p className="ecl-u-type-paragraph">
            <a
              href={languageSpecificData.decisionUrl}
              className="ecl-link"
              target="_blank"
            >
              {languageSpecificData.decisionUrl}
            </a>
          </p>
        </div>
      ) : (
        ''
      )}
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
      {has(languageSpecificData, 'additionalDocument') ? (
        <>
          <h2 className="ecl-u-type-heading-2">Additional information</h2>
          <Document file={languageSpecificData.additionalDocument} />
        </>
      ) : (
        ''
      )}
      {has(languageSpecificData, 'draftLegal') ? (
        <>
          <h2 className="ecl-u-type-heading-2">Draft legal act</h2>
          <Document file={languageSpecificData.draftLegal} />
        </>
      ) : (
        ''
      )}
      {reps.length ||
      subs.length ||
      members.length ||
      legalEs.length ||
      others.length ||
      dpos.length ? (
        <>
          <h2 className="ecl-u-type-heading-2">{translation.organisers}</h2>
          <ul className="ecl-u-type-paragraph">
            {legalEs ? (
              <li key="legalEntity">
                Legal entities
                {': '}
                {legalEs.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {reps
              ? reps.map((rep, key) => (
                  <li key={`rep-${key}`}>
                    {translation.representative}
                    {': '}
                    {rep.fullName}
                    {rep.email ? ` - ${rep.email}` : ''}
                  </li>
                ))
              : ''}
            {subs
              ? subs.map((sub, key) => (
                  <li key={`sub-${key}`}>
                    {translation.substitute}
                    {': '}
                    {sub.fullName}
                    {sub.email ? ` - ${sub.email}` : ''}
                  </li>
                ))
              : ''}
            {members ? (
              <li key="members">
                {translation.members}
                {': '}
                {members.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {others ? (
              <li key="others">
                Others
                {': '}
                {others.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {dpos ? (
              <li key="dpos">
                DPO
                {': '}
                {dpos.map(m => m.fullName).join(', ')}
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
