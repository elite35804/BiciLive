import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { themeProp }  from '../../utils/CssUtil';
import { Text } from 'react-native';

const PrimaryText = styled.Text`
    font-family: ${themeProp('fontPrimary')};
    color: ${themeProp('colorText')};
    font-size: ${themeProp('szTextDefault')};
`;

// const SecondaryText = styled(PrimaryText)`
//     font-family: ${props => props.theme.fontUniBold};
// `;

/**
 * Define most commonly used components here.
 */

export default PrimaryText;
// export { SecondaryText };
