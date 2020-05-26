import React from 'react';
import Router from './src/Router';
import Themes from './src/res/Themes';
import {ThemeProvider} from 'styled-components/native';
import {StoreProvider} from './src/StoresContext';
import DropDownAlert from './src/components/DropDownAlert';
import LoadingHud from './src/components/hud';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

const App = () => (
  <ThemeProvider theme={Themes.base}>
    <ActionSheetProvider>
    <StoreProvider>

        <Router/>
        <LoadingHud/>
        <DropDownAlert/>

    </StoreProvider>
    </ActionSheetProvider>
  </ThemeProvider>
);

export default App;
