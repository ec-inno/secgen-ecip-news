import getStatuses from '../getStatuses';

describe('getStatuses utlity', () => {
  it('returns a list of values', () => {
    const t = s => s; // mocks https://www.i18next.com/overview/api#t
    const statuses = getStatuses(t);
    expect(statuses).toMatchSnapshot();
  });
});
