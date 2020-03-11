import React from 'react';
import { AlertStore, HudStore } from './stores';
// Import stores here.

const store = {
    alert : new AlertStore(),
    hud : new HudStore(),
};

const StoresContext = React.createContext(store);

export default StoresContext;

// Also write provider for older components
export const StoreProvider = ({children}) => {
    return (
        <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
    );
};
