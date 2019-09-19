import React, { useContext } from 'react';

const I18nContext = React.createContext();

const useI18nContext = () => useContext(I18nContext);

export { useI18nContext, I18nContext as default };
