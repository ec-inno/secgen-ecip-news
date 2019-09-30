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

  it('Annex field: contains language from linguisticVersion', () => {
    const result = extractInitiativesDetails({
      details: ongoingInitiative,
      locale: 'en',
    });
    expect(result.additionalDocument.language).toBe('en');
  });

  it('Annex field: contains data about other languages', () => {
    const result = extractInitiativesDetails({
      details: ongoingInitiative,
      locale: 'fr',
    });
    expect(result.additionalDocument.language).toBe(undefined);
    expect(result.additionalDocument.otherLanguages).toEqual([
      'en',
      'es',
      'cs',
    ]);
  });
});
