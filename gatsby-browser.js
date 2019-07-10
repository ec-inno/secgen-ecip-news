import React from 'react';
import { ContextProviderWithReducer } from './src/Context';

export const wrapRootElement = ({ element }) => {
  return <ContextProviderWithReducer>{element}</ContextProviderWithReducer>;
};

export const onClientEntry = () => {
  // @see https://www.gatsbyjs.org/packages/gatsby-background-image/#important
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
