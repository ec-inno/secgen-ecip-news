/**
 * Returns a list of categories.
 * @param {Function} t String translation function such as https://www.i18next.com/overview/api#t
 */
const getCategories = t => {
  return [
    { value: 'any', label: t('All categories') },
    { value: 'AGRI', label: t('Agriculture') },
    { value: 'DEVCO', label: t('Aid and development cooperation') },
    { value: 'EURO', label: t('Business and economy') },
    { value: 'SANTE', label: t('Consumers and health') },
    { value: 'CULT', label: t('Culture and media') },
    { value: 'DECO', label: t('Digital economy and society') },
    { value: 'EDU', label: t('Education, youth and sport') },
    { value: 'EMPL', label: t('Employment and social affairs') },
    { value: 'ENER', label: t('Energy') },
    { value: 'ENV', label: t('Environment and climate') },
    { value: 'TRADE', label: t('External trade and relations') },
    { value: 'JUST', label: t('Justice and fundamental rights') },
    { value: 'MARE', label: t('Maritime affairs and fisheries') },
    { value: 'MIGR', label: t('Migration and asylum') },
    { value: 'REGIO', label: t('Regional development') },
    { value: 'RSH', label: t('Research') },
    { value: 'SEC', label: t('Security') },
    { value: 'TRA', label: t('Transport') },
    { value: 'REGFRA', label: t('Regulatory Framework') },
    { value: 'REGECI', label: t('Registration of initiatives') },
    { value: 'COLLECI', label: t('Signature collection') },
    { value: 'EXAECI', label: t('Examination of initiatives') },
  ];
};

export default getCategories;
