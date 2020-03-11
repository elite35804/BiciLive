import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import { themeProp as theme } from '../../utils/CssUtil';

Feather.loadFont();

// Icon Button Component Factory
/**
 * defaultName : Default Button Name
 * Returns Feather Icon Button with props.name icon or if name prop does not exist, just use defaultName.
 * @param  {[String]} defaultName [description]
 * @return {[Component]}             [description]
 */
function iconButtonComponentFactory(defaultName) {
    return ({iconSize, color, name, ...otherProps}) => {
        const theme = otherProps.theme || useTheme();
        // Parsing other props enable to use styled-components
        return (
            <Button {...otherProps} >
                <Feather name={ name || defaultName } size={ iconSize || theme.szIconButton } color={ color || theme.colorControl }/>
            </Button>
        );
    };
}

const CloseButton = iconButtonComponentFactory('x');

const Button = styled.TouchableOpacity`
    padding: ${theme('szIconButtonPadding')};
`;

export { CloseButton, iconButtonComponentFactory };
