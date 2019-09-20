import React from 'react';

import {
  useOverlayContext,
  SET_LANGUAGE_OVERLAY_VISIBILITY,
} from '../../context/Overlay';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  const { dispatch, store } = useOverlayContext();
  const { hideOverlay } = store;

  const closeHandler = () =>
    dispatch({ type: SET_LANGUAGE_OVERLAY_VISIBILITY, hideOverlay: true });

  return (
    <LanguageListOverlay
      hidden={hideOverlay}
      closeHandler={closeHandler}
      {...props}
    />
  );
};

export default LanguageListOverlayWithContext;
