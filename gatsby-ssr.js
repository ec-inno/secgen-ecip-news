import React from 'react';
import { renderToString } from 'react-dom/server';

import i18n from './i18n/config';
import { ContextProviderWithReducer } from './src/context/Overlay';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  i18n.loadNamespaces(['translation'], () => {
    const App = () => (
      <ContextProviderWithReducer>{bodyComponent}</ContextProviderWithReducer>
    );

    replaceBodyHTMLString(renderToString(<App />));
  });
};
