import React from 'react';
import { TextInput, View, Image, TouchableOpacity, Text, Platform } from 'react-native';
import Images from 'res/Images';
import styled from 'styled-components/native';
import { themeProp }  from '../../utils/CssUtil';

const BaseTextInput= (props) => (
  <InputView>
    <Input placeholder={props.placeholder} placeholderTextColor={'#c9c3c5'}/>
    <Image width={20} height={20} source={Images.icons.keyboard} />
  </InputView>
);

const BaseTextFilter= (props) => (
  <FilterView>
    <Input placeholder={props.placeholder} placeholderTextColor={'#c9c3c5'}/>
    <Image width={20} height={20} source={Images.icons.filter} />
  </FilterView>
);

const BaseSelect = (props) => (
  <SelectView {...props}>
    <SelectText isValue={props.value}>{props.value || props.text}</SelectText>
    <Image width={18} height={18} source={Images.icons.arrow_down} />
  </SelectView>
);

const SelectView = styled(TouchableOpacity)`
    width: 96%;
    height: 47px;
    border-left-width: 7px;
    border-left-color: ${themeProp('colorPrimary')};
    border-color: #c9c3c5;
    border-width: 1px;
    flexDirection: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: ${Platform.OS === "ios" ? "8px" : '12px'};
    margin-bottom: 17px;
`;

const SelectText = styled(Text)`
    font-family: ${themeProp('fontUniBook')};
    color: ${props => props.isValue ? 'black':themeProp('colorBorder')};
    font-size: ${themeProp('szTextDefault')};
    margin-top: ${Platform.OS === "ios" ? '10px' : "0"}
`;

const InputView = styled(View)`
    width: 96%;
    height: 47px;
    border-left-width: 7px;
    border-left-color: ${themeProp('colorPrimary')};
    border-color: ${themeProp('colorBorder')};
    border-width: 1px;
    flexDirection: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 8px;
    margin-bottom: 17px;
`;

const FilterView = styled(View)`
    width: 95%;
    height: 47px;
    border-left-width: 7px;
    border-left-color: ${themeProp('colorBorder')};
    border-color: ${themeProp('colorBorder')};
    border-width: 1px;
    flexDirection: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 8px;
    margin-horizontal: 10px;
    margin-bottom: 17px;
`;

const Input = styled(TextInput)`
    font-family: ${themeProp('fontUniBook')};
    color: ${themeProp('colorText')};
    font-size: ${themeProp('szTextDefault')};
    margin-top: 4px;
`;

export {BaseTextInput, BaseSelect, BaseTextFilter};
