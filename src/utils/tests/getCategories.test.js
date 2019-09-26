import getCategories from '../getCategories';

describe('getCategories utlity', () => {
  it('returns a list of values', () => {
    const t = s => s; // mocks https://www.i18next.com/overview/api#t
    const categories = getCategories(t);
    expect(categories).toMatchSnapshot();
  });
});
