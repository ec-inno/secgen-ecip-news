import React from 'react';

import ContextConsumer from '../../Context';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  return (
    <ContextConsumer>
      {({ data }) => {
        const { LanguageListOverlayIsHidden } = data;

        return (
          <LanguageListOverlay
            hidden={LanguageListOverlayIsHidden}
            {...props}
          />
        );
      }}
    </ContextConsumer>
  );
};

export default LanguageListOverlayWithContext;
