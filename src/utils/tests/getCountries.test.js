import getCountries from '../getCountries';

describe('getCountries utlity', () => {
  it('returns a list of values', () => {
    const t = s => s; // mocks https://www.i18next.com/overview/api#t
    const countries = getCountries(t);
    expect(countries).toMatchSnapshot();
  });
});
