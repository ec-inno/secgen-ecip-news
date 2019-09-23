// These are values for filters, not resource path!
// Resource path values are LATEST, ONGOING, ANSWERED, ALL, REFUSED
const getStatuses = t => {
  return [
    { value: 'ALL', label: t('All') },
    { value: 'OPEN', label: t('Open') },
    { value: 'SUCCESSFUL', label: t('Successful') },
    { value: 'ARCHIVED', label: t('Archived') },
  ];
};

export default getStatuses;
