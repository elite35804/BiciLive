import React from 'react';
import { Text, Platform } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Colors from '../../res/Colors';
import { themeProp } from '../../utils/CssUtil';

function textButtonFactory(ContainerComp, TextComp) {
    return props => (
        <ContainerComp {...props}>
            <TextComp>{props.children}</TextComp>
        </ContainerComp>
    );
}

const isIOS = Platform.OS === "ios";

const BaseButtonContainer = styled(TouchableOpacity)`
    height: ${themeProp('szButton')};
    border-width: 2px;
    border-color: ${themeProp('colorSecondary')};
    align-items: center;
    justify-content:center;
    width:95%;
`;

const GreenBtnTitle = styled(Text)`
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-size: 35px;
    color: ${themeProp('colorSecondary')}
`;

const GreenBtnContainer = styled(BaseButtonContainer)`
    background-color: ${themeProp('colorThird')};
    width: 100%
`;

// Default BlueButton
const BlueBtnContainer = styled(BaseButtonContainer)`
    background-color: ${themeProp('colorSecondary')};
`;

const WhiteBtnContainer = styled(BaseButtonContainer)`
    background-color: ${themeProp('colorPrimary')};
`;

const BlueBtnTitle = styled(Text)`
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-size: 35px;
    color: ${themeProp('colorPrimary')}
`;

const WhiteBtnTitle = styled(Text)`
    margin-top: ${Platform.OS === 'ios' ? '15px' : '0'};
    font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
    font-size: 35px;
    color: ${themeProp('colorSecondary')}
`;

const BlueButton = textButtonFactory(BlueBtnContainer, BlueBtnTitle);

const WhiteButton = textButtonFactory(WhiteBtnContainer, WhiteBtnTitle);

const GreenButton = textButtonFactory(GreenBtnContainer, GreenBtnTitle);


//export default StyledButton;
export { BaseButtonContainer, BlueButton, WhiteButton, GreenButton };
