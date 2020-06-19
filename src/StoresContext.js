import React from 'react';
import {
    AlertStore,
    HudStore,
    StaticStore,
    HomeStore,
    CategoryStore,
    SwiperState,
    BrandStore,
    BikeStore,
    BikeSearchStore,
    AuthStore,
    WebViewStore,
    QuestionStore,
    DashboardStore,
    LikeBrandStore,
    LikeProductStore,
    AccountStore,
} from './stores';
// Import stores here.

const store = {
    alert : new AlertStore(),
    hud : new HudStore(),
    staticData: new StaticStore(),
    homeData: new HomeStore(),
    category: new CategoryStore(),
    swiperState: new SwiperState(),
    brandData: new BrandStore(),
    bikeData: new BikeStore(),
    bikeSearch: new BikeSearchStore(),
    auth: new AuthStore(),
    web: new WebViewStore(),
    question: new QuestionStore(),
    dashboard: new DashboardStore(),
    likeBrand: new LikeBrandStore(),
    likeProduct: new LikeProductStore,
    account: new AccountStore()
};

const StoresContext = React.createContext(store);

export default StoresContext;

// Also write provider for older components
export const StoreProvider = ({children}) => {
    return (
        <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
    );
};
