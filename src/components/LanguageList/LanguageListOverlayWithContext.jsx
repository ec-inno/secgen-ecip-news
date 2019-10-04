import React from 'react';
import FocusLock from 'react-focus-lock';

import { useOverlayContext } from '@eci/context/Overlay';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  const { overlayIsHidden, setOverlayIsHidden } = useOverlayContext();

  return (
    <>
      <FocusLock>
        <LanguageListOverlay
          onKeyDown={e => {
            // Listen to Esc key.
            if (e.keyCode === 27) {
              setOverlayIsHidden(true);
            }
          }}
          hidden={overlayIsHidden}
          closeHandler={() => setOverlayIsHidden(true)}
          {...props}
        />
      </FocusLock>
    </>
  );
};

export default LanguageListOverlayWithContext;
