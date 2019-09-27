import getCategories from '../getCategories';

describe('getCategories utlity', () => {
  it('returns a list of values', () => {
    const t = jest.fn(i => i); // mocks https://www.i18next.com/overview/api#t
    const categories = getCategories(t);
    expect(categories).toMatchSnapshot();
  });
});
