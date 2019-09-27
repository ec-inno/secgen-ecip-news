import React from 'react';
import { render } from '@testing-library/react';

import * as QueryContext from '@eci/context/Query';
import PaginationImpl from './PaginationImpl';

describe('PaginationImpl', () => {
  it('does not render on missing input', () => {
    const { container } = render(<PaginationImpl />);
    expect(container).toMatchSnapshot();
  });

  it('does not render anything on input of zero results', () => {
    const { container } = render(<PaginationImpl itemsNumber={0} />);
    expect(container).toMatchSnapshot();
  });

  it('shows one page when less than 10', () => {
    jest.spyOn(QueryContext, 'useQueryContext').mockImplementation(() => ({
      query: {
        filters: {},
        status: 'ALL',
        language: 'en',
        pagination: '0/10',
      },
      dispachQuery: jest.fn(() => {}),
    }));

    const { container } = render(<PaginationImpl itemsNumber={9} />);
    expect(container).toMatchSnapshot();
  });

  it('shows two pages with Next button when more than 10', () => {
    jest.spyOn(QueryContext, 'useQueryContext').mockImplementation(() => ({
      query: {
        filters: {},
        status: 'ALL',
        language: 'en',
        pagination: '0/10',
      },
      dispachQuery: jest.fn(() => {}),
    }));

    const { container } = render(<PaginationImpl itemsNumber={11} />);
    expect(container).toMatchSnapshot();
  });
});
