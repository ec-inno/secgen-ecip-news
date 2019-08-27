import React from 'react';
import { ContextProviderWithReducer } from './src/context/Context';

export const wrapRootElement = ({ element }) => {
  return <ContextProviderWithReducer>{element}</ContextProviderWithReducer>;
};
