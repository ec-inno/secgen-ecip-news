import React from 'react';

const initialState = {
  hideOverlay: true,
  currentLanguage: 'en',
  translations: [],
};

const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_TRANSLATIONS = 'SET_TRANSLATIONS';
const SET_LANGUAGE_OVERLAY_VISIBILITY = 'SET_LANGUAGE_OVERLAY_VISIBILITY';

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case SET_LANGUAGE: {
      return {
        currentLanguage: action.currentLanguage,
        ...state,
      };
    }

    case SET_TRANSLATIONS: {
      return {
        translations: action.translations,
        ...state,
      };
    }

    case SET_LANGUAGE_OVERLAY_VISIBILITY: {
      return {
        hideOverlay: action.hideOverlay,
        ...state,
      };
    }

    default: {
      return initialState;
    }
  }
};

const Context = React.createContext(null);

const ContextProviderWithReducer = ({ children }) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};

export { ContextProviderWithReducer, Context as default };
