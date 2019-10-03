import getSitemap from '../getSitemap';

describe('getSitemap utlity', () => {
  it('returns an empty object on empty input', () => {
    const result = getSitemap();
    expect(result).toEqual({});
  });

  it('returns a structure of links', () => {
    // Mock is a result of the executed query in src/pages/sitemap
    const data = require('./stubs/sitemap/data');
    const locale = 'en';
    const result = getSitemap({ data, locale });
    expect(result).toMatchSnapshot();
  });
});
