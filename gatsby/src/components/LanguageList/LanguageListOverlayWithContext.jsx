import React, { useContext } from 'react';

import Context, { SET_LANGUAGE_OVERLAY_VISIBILITY } from '../../Context';

import LanguageListOverlay from './LanguageListOverlay';

const LanguageListOverlayWithContext = props => {
  const { dispatch, store } = useContext(Context);
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
