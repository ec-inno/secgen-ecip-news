import extractInitiativesDetails from '../extractInitiativesDetails';

import ongoingInitiative from './stubs/initiatives/ongoing';

describe('extractInitiativesDetails utlity', () => {
  it('ongoing initiative case: English locale', () => {
    const result = extractInitiativesDetails({
      details: ongoingInitiative,
      locale: 'en',
    });
    expect(result).toMatchSnapshot();
  });
});
