import React from 'react';
import { TextInput, View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Images from 'res/Images';
import styled from 'styled-components/native';
import { themeProp }  from '../../utils/CssUtil';

const BaseSelectBox = (props) => (
  <SelectView onPress={props.onPress}>
    {props.checked ? <SelectBoxUnchecked/> : <SelectBoxUnchecked><SelectDot /></SelectBoxUnchecked>}
    <SelectText numberOfLines={3}>{props.text}</SelectText>
  </SelectView>
);

const SelectView = styled(TouchableOpacity)`
    width: 95%;
    height: 47px;
    flexDirection: row;
    padding-horizontal: 13px;
`;

const SelectBoxUnchecked = styled(View)`
    width: 26px;
    height: 26px;
    border-width: 1px;
    border-color: ${themeProp('colorBorder')};
    justify-content: center;
    align-items: center;
`;

const SelectDot = styled(View)`
    background-color: ${themeProp('colorThird')}
    width: 16px;
    height: 16px;
`;

const SelectText = styled(Text)`
    font-family: ${themeProp('fontUniBook')};
    color: ${themeProp('colorDescription')};
    font-size: ${themeProp('szTextDescription')};
    margin-left: 10px;
`;

export default BaseSelectBox;
