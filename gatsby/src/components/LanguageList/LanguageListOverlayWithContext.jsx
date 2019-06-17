import React from 'react';

import ContextConsumer from '../../Context';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  return (
    <ContextConsumer>
      {({ data, set }) => {
        const { LanguageListOverlayIsHidden } = data;
        const closeHandler = () => set({ LanguageListOverlayIsHidden: true });

        return (
          <LanguageListOverlay
            hidden={LanguageListOverlayIsHidden}
            closeHandler={closeHandler}
            {...props}
          />
        );
      }}
    </ContextConsumer>
  );
};

export default LanguageListOverlayWithContext;
