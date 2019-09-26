import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Members = ({ members }) => {
  if (!members || !Array.isArray(members)) return '';

  // [REPRESENTATIVE, SUBSTITUTE, MEMBER, LEGAL_ENTITY, OTHER, DPO ]
  const people = members
    ? members
        .filter(person => person.fullName)
        .filter(person => person.privacyApplied === false)
        .map(person => {
          const { activityPeriod, fullName: name } = person;

          // Include information about time of activity if present.
          const fullName = activityPeriod
            ? `${name} (${activityPeriod})`
            : name;

          return {
            ...person,
            fullName,
          };
        })
    : [];

  if (people.length === 0) return '';

  const reps = people.filter(p => p.type === 'REPRESENTATIVE');
  const subs = people.filter(p => p.type === 'SUBSTITUTE');
  const mem = people.filter(p => p.type === 'MEMBER');
  const legalEs = people.filter(p => p.type === 'LEGAL_ENTITY');
  const others = people.filter(p => p.type === 'OTHER');
  const dpos = people.filter(p => p.type === 'DPO');

  if (!reps && !subs && !mem && !legalEs && !others && !dpos) return '';

  const { t } = useTranslation();

  return (
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
        {mem && mem.length > 0 ? (
          <li key="members">
            {t('Members')}
            {': '}
            {mem.map(m => m.fullName).join(', ')}
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
  );
};

Members.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      fullName: PropTypes.string,
      privacyApplied: PropTypes.bool,
    })
  ),
};

export default Members;
