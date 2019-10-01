/**
 * These are values for filters, not resource path!
 * Resource path values are LATEST, ONGOING, ANSWERED, ALL, REFUSED.
 * @see ${api}/register/search/ref/STATUS
 * @param {Function} t Translate function
 * @returns {Array<Object>} Information structured for a select list.
 */
const getStatuses = t => {
  return [
    { value: 'ALL', label: t('All') },
    { value: 'ONGOING', label: t('Ongoing') },
    { value: 'ANSWERED', label: t('Answered') },
  ];
};

export default getStatuses;
