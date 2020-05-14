import React from 'react';
import { AlertStore, HudStore, StaticStore, HomeStore } from './stores';
// Import stores here.

const store = {
    alert : new AlertStore(),
    hud : new HudStore(),
    staticData: new StaticStore(),
    homeData: new HomeStore(),
};

const StoresContext = React.createContext(store);

export default StoresContext;

// Also write provider for older components
export const StoreProvider = ({children}) => {
    return (
        <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
    );
};
