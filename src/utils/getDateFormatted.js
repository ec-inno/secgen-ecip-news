/**
 * Formats an input date string into `DD/MM/YYYY` used in this project.
 * @param {String} inputDate
 * @returns {String} Reformatted string.
 */
const getDateFormatted = inputDate => {
  if (!inputDate) return '';

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const dateFormatted = `${day}/${month + 1}/${year}`;

  return dateFormatted;
};

export default getDateFormatted;
