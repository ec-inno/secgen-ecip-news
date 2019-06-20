import React from 'react';
import { ContextProviderWithReducer } from './src/Context';

export const wrapRootElement = ({ element }) => {
  return <ContextProviderWithReducer>{element}</ContextProviderWithReducer>;
};
