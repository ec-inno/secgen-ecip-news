import React, { useContext } from 'react';

const Context = React.createContext();

const useI18nContext = () => useContext(Context);

export { useI18nContext, Context as default };
