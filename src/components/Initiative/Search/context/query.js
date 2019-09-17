import React from 'react';

import { defaultLangKey } from '../../../../../languages';

const queryInit = {
  filters: {},
  status: 'ALL',
  language: defaultLangKey,
  pagination: '0/10',
};

const queryReducer = (state, action) => {
  switch (action.type) {
    case 'paginate': {
      return {
        ...state,
        pagination: action.pagination,
      };
    }

    case 'changeStatus': {
      return {
        ...state,
        pagination: queryInit.pagination,
        status: action.status,
      };
    }

    case 'changeLanguage': {
      return {
        ...state,
        pagination: queryInit.pagination,
        language: action.language,
      };
    }

    case 'changeFilter': {
      return {
        ...state,
        pagination: queryInit.pagination,
        filters: {
          ...state.filters,
          [action.filter]: action.filterValue,
        },
      };
    }

    case 'setFilters': {
      return {
        ...state,
        pagination: queryInit.pagination,
        filters: {
          ...state.filters,
          ...action.filters,
        },
      };
    }

    case 'removeFilter': {
      const { filters } = state;
      delete filters[action.filter];

      return {
        ...state,
        pagination: queryInit.pagination,
        filters: {
          ...filters,
        },
      };
    }

    case 'reset':
    default: {
      return queryInit;
    }
  }
};

const Context = React.createContext();

export { queryInit, queryReducer, Context as default };
