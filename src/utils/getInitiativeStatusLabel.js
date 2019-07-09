const getInitiativeStatusLabel = status => {
  switch (status) {
    case 'OPEN':
      return 'Ongoing';

    case 'WITHDRAWN':
      return 'Withdrawn';

    case 'SUCCESSFUL':
      return 'Answered';

    case 'INSUFFICIENT_SUPPORT':
      return 'Insufficient support';

    case 'REJECTED':
      return 'Refused';

    default:
      return status.toLowerCase();
  }
};

export default getInitiativeStatusLabel;
