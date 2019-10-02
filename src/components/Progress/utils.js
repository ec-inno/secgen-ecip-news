export const steps = [
  'REGISTERED',
  'COLLECTION_START_DATE',
  'ONGOING',
  'COLLECTION_EARLY_CLOSURE',
  'CLOSED',
  'VERIFICATION',
  'SUBMITTED',
  'ANSWERED',
];

/**
 * Reorder progress stages to match order of `steps`.
 * @param {Array<Object>} progress
 * @param {String} progress.name
 * @param {Boolean} progress.active
 * @param {Date} progress.date
 */
export const getStages = progress => {
  const stages = [];

  steps.forEach(step => {
    const match = progress.find(item => item.name === step);
    if (match) stages.push(match);
  });

  return stages;
};
