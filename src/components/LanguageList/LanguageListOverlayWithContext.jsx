import React from 'react';

import { useOverlayContext } from '@eci/context/Overlay';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  const { overlayIsHidden, setOverlayIsHidden } = useOverlayContext();

  return (
    <LanguageListOverlay
      hidden={overlayIsHidden}
      closeHandler={() => setOverlayIsHidden(true)}
      {...props}
    />
  );
};

export default LanguageListOverlayWithContext;
