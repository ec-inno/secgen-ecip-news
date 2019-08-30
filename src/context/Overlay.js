import React from 'react';

const initialState = {
  hideOverlay: true,
};

export const SET_LANGUAGE_OVERLAY_VISIBILITY =
  'SET_LANGUAGE_OVERLAY_VISIBILITY';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE_OVERLAY_VISIBILITY: {
      return Object.assign({}, state, {
        hideOverlay: action.hideOverlay,
      });
    }

    default: {
      return initialState;
    }
  }
};

const Context = React.createContext();

const ContextProviderWithReducer = ({ children }) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};

export { ContextProviderWithReducer, Context as default };
