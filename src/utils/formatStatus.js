const formatStatus = s => {
  if (typeof s !== 'string') return s;
  return (
    s.charAt(0).toUpperCase() +
    s
      .slice(1)
      .toLowerCase()
      .replace('_', ' ')
  );
};

export default formatStatus;
