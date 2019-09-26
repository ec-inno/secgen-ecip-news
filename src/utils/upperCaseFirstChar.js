/**
 * Formats an input string to be more human-readable.
 * @param {String} input
 */
const upperCaseFirstChar = input => {
  if (typeof input !== 'string') return input;

  return (
    input.charAt(0).toUpperCase() +
    input
      .slice(1)
      .toLowerCase()
      .replace(/_/g, ' ')
  );
};

export default upperCaseFirstChar;
