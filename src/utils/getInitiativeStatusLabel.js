// API options: [OPEN, SUCCESSFUL, WITHDRAWN, INSUFFICIENT_SUPPORT, REJECTED, ALL]

/**
 * Provides human-readable form of status strings.
 *
 * @param {String} status The status as passed/received from API.
 */
const getInitiativeStatusLabel = status => {
  switch (status) {
    case 'OPEN':
      return 'Ongoing';

    case 'SUCCESSFUL':
      return 'Answered';

    case 'WITHDRAWN':
      return 'Withdrawn';

    case 'INSUFFICIENT_SUPPORT':
      return 'Insufficient support';

    case 'REJECTED':
      return 'Refused';

    default:
      return status.toLowerCase();
  }
};

export default getInitiativeStatusLabel;
