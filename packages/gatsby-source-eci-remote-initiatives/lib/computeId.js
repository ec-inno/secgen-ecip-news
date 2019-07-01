const crypto = require('crypto');

const computeId = initiative => {
  if (initiative.year && initiative.number) {
    return crypto
      .createHash('md5')
      .update(`${initiative.year}/${initiative.number}`)
      .digest('hex');
  }

  return crypto
    .createHash('md5')
    .update(`rejected/${initiative.searchEntry.title}`)
    .digest('hex');
};
module.exports = computeId;
