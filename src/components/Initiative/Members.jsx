import React from 'react';
import has from 'lodash/has';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const Members = ({ initiativeData }) => {
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

  return (
    <>
      {reps || subs || members || legalEs || others || dpos ? (
        <>
          <h2 className="ecl-u-type-heading-2">{translation.organisers}</h2>
          <ul className="ecl-u-type-paragraph">
            {legalEs && legalEs.length > 0 ? (
              <li key="legalEntity">
                Legal entities
                {': '}
                {legalEs.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {reps && reps.length > 0
              ? reps.map((rep, key) => (
                  <li key={`rep-${key}`}>
                    {translation.representative}
                    {': '}
                    {rep.fullName}
                    {rep.email ? ` - ${rep.email}` : ''}
                  </li>
                ))
              : ''}
            {subs && subs.length > 0
              ? subs.map((sub, key) => (
                  <li key={`sub-${key}`}>
                    {translation.substitute}
                    {': '}
                    {sub.fullName}
                    {sub.email ? ` - ${sub.email}` : ''}
                  </li>
                ))
              : ''}
            {members && members.length > 0 ? (
              <li key="members">
                {translation.members}
                {': '}
                {members.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {others && others.length > 0 ? (
              <li key="others">
                Others
                {': '}
                {others.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {dpos && dpos.length > 0 ? (
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

export default Members;
