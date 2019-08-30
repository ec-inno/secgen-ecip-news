import React from 'react';
import { ContextProviderWithReducer } from './src/context/Overlay';

export const wrapRootElement = ({ element }) => {
  return <ContextProviderWithReducer>{element}</ContextProviderWithReducer>;
};
