import React from 'react';
import { useTheme } from 'styled-components/native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
} from 'react-native-indicators';

const comps = [
    { name: 'ball', comp: BallIndicator },
    { name: 'bar', comp: BarIndicator },
    { name: 'dot', comp: DotIndicator },
    { name: 'material', comp: MaterialIndicator },
    { name: 'pacman', comp: PacmanIndicator },
    { name: 'pulse', comp: PulseIndicator },
    { name: 'skype', comp: SkypeIndicator },
    { name: 'wave', comp: WaveIndicator },
];

export default ( props ) => {
    const theme = props.theme || useTheme();
    const Component = comps.find(comp => comp.name === theme.nameHudIndicator) || UIActivityIndicator;
    return <Component {...props} style = {theme.styleHudIndicator} />;
};
