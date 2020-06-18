import React from 'react';
import { Text, Platform } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Colors from '../../res/Colors';
import { themeProp } from '../../utils/CssUtil';
import {get} from 'lodash';

function textButtonFactory(ContainerComp, TextComp) {
    return props => (
        <ContainerComp {...props}>
            <TextComp {...props}>{props.children}</TextComp>
        </ContainerComp>
    );
}

const isIOS = Platform.OS === "ios";

const BaseButtonContainer = styled(TouchableOpacity)`
    height: ${props => get(props, 'height', '70px')};
    border-width: 2px;
    border-color: ${props => get(props, 'borderColor', themeProp('colorSecondary'))};
    align-items: center;
    justify-content:center;
    width: ${props => get(props, 'width', '98%')}
`;

const GreenBtnTitle = styled(Text)`
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-size: 35px;
    color: ${props => props.txt_color}
`;

const GreenBtnContainer = styled(BaseButtonContainer)`
    background-color: ${props => props.bg_color};
    width: 100%
`;

// Default BlueButton
const BlueBtnContainer = styled(BaseButtonContainer)`
    background-color: ${themeProp('colorSecondary')};
`;

const WhiteBtnContainer = styled(BaseButtonContainer)`
    background-color: ${props => get(props, 'backgroudColor', '#7cd9d0')};
`;

const BlueBtnTitle = styled(Text)`
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-size: ${props => get(props, 'fontSize', '35px')}
    color: ${props => get(props, 'textColor', '#333333')}
`;

const WhiteBtnTitle = styled(Text)`
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    font-size: ${props => get(props, 'fontSize', '35px')}
    color: ${props => get(props, 'textColor', themeProp('colorSecondary'))}
`;

const BlueButton = textButtonFactory(BlueBtnContainer, BlueBtnTitle);

const WhiteButton = textButtonFactory(WhiteBtnContainer, WhiteBtnTitle);

const GreenButton = textButtonFactory(GreenBtnContainer, GreenBtnTitle);


//export default StyledButton;
export { BaseButtonContainer, BlueButton, WhiteButton, GreenButton };
