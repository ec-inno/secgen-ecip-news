import React, { useContext } from 'react';

const Context = React.createContext();

const useOverlayContext = () => useContext(Context);

export { useOverlayContext, Context as default };
