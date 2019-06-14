const getCurrentLanguage = location => {
  const locations = location.pathname.split('/').filter(p => p);
  const currentLanguage = locations[0];
  return currentLanguage;
};

export default getCurrentLanguage;
