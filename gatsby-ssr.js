import React from 'react';
import { renderToString } from 'react-dom/server';
import { ContextProviderWithReducer } from './src/context/Context';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const App = () => (
    <ContextProviderWithReducer>{bodyComponent}</ContextProviderWithReducer>
  );

  replaceBodyHTMLString(renderToString(<App />));
};
