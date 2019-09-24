import React from 'react';
import { useTranslation } from 'react-i18next';
import has from 'lodash/has';

const Members = ({ details }) => {
  const { t } = useTranslation();

  // [REPRESENTATIVE, SUBSTITUTE, MEMBER, LEGAL_ENTITY, OTHER, DPO ]
  const people = has(details, 'members')
    ? details.members
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
          <h2 className="ecl-u-type-heading-2">{t('Organisers')}</h2>
          <ul className="ecl-u-type-paragraph">
            {legalEs && legalEs.length > 0 ? (
              <li key="legalEntity">
                {t('Legal entities')}
                {': '}
                {legalEs.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {reps && reps.length > 0
              ? reps.map((rep, key) => (
                  <li key={`rep-${key}`}>
                    {t('Representative')}
                    {': '}
                    {rep.fullName}
                    {rep.email ? ` - ${rep.email}` : ''}
                  </li>
                ))
              : ''}
            {subs && subs.length > 0
              ? subs.map((sub, key) => (
                  <li key={`sub-${key}`}>
                    {t('Substitude')}
                    {': '}
                    {sub.fullName}
                    {sub.email ? ` - ${sub.email}` : ''}
                  </li>
                ))
              : ''}
            {members && members.length > 0 ? (
              <li key="members">
                {t('Members')}
                {': '}
                {members.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {others && others.length > 0 ? (
              <li key="others">
                {t('Others')}
                {': '}
                {others.map(m => m.fullName).join(', ')}
              </li>
            ) : (
              ''
            )}
            {dpos && dpos.length > 0 ? (
              <li key="dpos">
                {t('DPO')}
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
