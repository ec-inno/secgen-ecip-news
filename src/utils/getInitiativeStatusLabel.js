// API options: [OPEN, SUCCESSFUL, WITHDRAWN, INSUFFICIENT_SUPPORT, REJECTED, ALL]

/**
 * Provides human-readable form of status strings.
 *
 * @param {String} status The status as passed/received from API.
 */
const getInitiativeStatusLabel = status => {
  // Statuses are inconsistent throughout the service.
  // These taxonomies will change and sometimes overlap as a mental model of the service creators, regular expressions are not enough.

  switch (status) {
    case 'OPEN':
      return 'Ongoing';

    case 'REGISTERED':
      return 'Registered';

    case 'SUCCESSFUL':
      return 'Answered';

    case 'COLLECTION_CLOSED':
      return 'Collection closed';

    case 'WITHDRAWN':
    case 'WITHDRAWN_BY_ORGANISER':
      return 'Withdrawn';

    case 'INSUFFICIENT_SUPPORT':
      return 'Insufficient support';

    case 'REJECTED':
      return 'Refused';

    case 'CONDITIONS_NOT_FULFILLED':
      return 'Conditions not fulfiled';

    case 'ANSWERED':
      return 'Answered';

    default:
      return status.toLowerCase();
  }
};

export default getInitiativeStatusLabel;
