import React, { useContext } from 'react';

import OverlayContext from '../../context/Overlay';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  const { overlayIsHidden, setOverlayIsHidden } = useContext(OverlayContext);

  return (
    <LanguageListOverlay
      hidden={overlayIsHidden}
      closeHandler={() => setOverlayIsHidden(true)}
      {...props}
    />
  );
};

export default LanguageListOverlayWithContext;
