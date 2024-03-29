import React, { useContext } from 'react';

import { defaultLangKey } from '../../languages';

const queryInit = {
  filters: {},
  section: 'ALL',
  language: defaultLangKey,
  pagination: '0/10',
};

const queryReducer = (state, action) => {
  switch (action.type) {
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

    case 'unsetFilter': {
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

    case 'changeSection': {
      return {
        ...state,
        pagination: queryInit.pagination,
        section: action.section,
      };
    }

    case 'changeLanguage': {
      return {
        ...state,
        pagination: queryInit.pagination,
        language: action.language,
      };
    }

    case 'paginate': {
      return {
        ...state,
        pagination: action.pagination,
      };
    }

    case 'reset':
    default: {
      return queryInit;
    }
  }
};

const Context = React.createContext();

const useQueryContext = () => useContext(Context);

export { queryInit, queryReducer, Context as default, useQueryContext };
