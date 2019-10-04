import { queryInit, queryReducer } from '../Query';

describe('QueryContext', () => {
  it('exports initial state', () => {
    expect(queryInit).toMatchSnapshot();
  });

  it('filters can be set through the reducer', () => {
    const state = queryReducer(queryInit, {
      type: 'setFilters',
      filters: { foo: 'bar' },
    });
    expect(state).toMatchSnapshot();
  });

  it('filter can be removed through the reducer', () => {
    const stateFiltersAdded = queryReducer(queryInit, {
      type: 'setFilters',
      filters: { foo: 'bar', baz: 'bar' },
    });

    expect(stateFiltersAdded.filters.foo).toBe('bar');
    expect(stateFiltersAdded.filters.baz).toBe('bar');

    const stateFiltersRemoved = queryReducer(stateFiltersAdded, {
      type: 'unsetFilter',
      filter: 'foo',
    });

    expect(stateFiltersRemoved.filters.foo).toBe(undefined);
    expect(stateFiltersRemoved.filters.baz).toBe('bar');
  });

  it('section can be changed through the reducer', () => {
    const state = queryReducer(queryInit, {
      type: 'changeSection',
      section: 'LATEST',
    });
    expect(state).toMatchSnapshot();
  });

  it('language can be changed through the reducer', () => {
    const state = queryReducer(queryInit, {
      type: 'changeLanguage',
      language: 'bg',
    });
    expect(state).toMatchSnapshot();
  });

  it('pagination is possible through the reducer', () => {
    const state = queryReducer(queryInit, {
      type: 'paginate',
      pagination: '11/20',
    });
    expect(state).toMatchSnapshot();
  });

  it('state can be reset through the reducer', () => {
    const stateFiltersAdded = queryReducer(queryInit, {
      type: 'setFilters',
      filters: { foo: 'bar', baz: 'bar' },
    });

    expect(stateFiltersAdded.filters.foo).toBe('bar');
    expect(stateFiltersAdded.filters.baz).toBe('bar');

    const stateReset = queryReducer(stateFiltersAdded, {
      type: 'reset',
    });

    expect(stateReset).toEqual(queryInit);
  });
});
