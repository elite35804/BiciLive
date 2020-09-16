import React, {useState, useEffect} from 'react';
import { TextInput, View, Image, TouchableOpacity, Text, Platform, ScrollView } from 'react-native';
import Images from 'res/Images';
import styled from 'styled-components/native';
import { themeProp }  from '../../utils/CssUtil';
import {get} from 'lodash';
import Colors from 'res/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const BaseTextInput= (props) => (
  <View style={{flex: 1, flexDirection: 'row'}}>
    <LineView {...props}/>
  <InputView>
    <Input placeholder={props.placeholder} autoCapitalize = 'none' placeholderTextColor={'#c9c3c5'} onEndEditing={f => props.onChange(f.nativeEvent.text)}/>
    <Image width={20} height={20} source={Images.icons.keyboard} />
  </InputView>
  </View>
);

const PasswordInput = props => {
  const [isShown, setIsShown] = useState(false);
  return (
  <View style={{flex: 1, flexDirection: 'row'}}>
    <LineView {...props}/>
    <InputView>
      <Input secureTextEntry={!isShown} placeholder={props.placeholder}
             placeholderTextColor={'#c9c3c5'} onEndEditing={f => props.onChange(f.nativeEvent.text)}/>
      <TouchableOpacity onPress={() => setIsShown(isShown => !isShown)}>
        {isShown || <Icon name="eye" size={20} color="#000"/>}
        {isShown && <Icon name="eye-slash" size={20} color="#000"/>}
      </TouchableOpacity>
    </InputView>
  </View>
  )
};

const BaseTextFilter= (props) => (
  <FilterView>
    <Input onEndEditing={f => props.onEndEditing(f.nativeEvent.text)} placeholder={props.placeholder} placeholderTextColor={'#c9c3c5'}/>
    <Image width={20} height={20} source={Images.icons.filter} />
  </FilterView>
);

const BaseSelect = (props) => (
  <View style={{flex: 1, flexDirection: 'row'}}>
    <LineView {...props}/>
  <SelectView width={'95%'} {...props}>
    <SelectText isValue={props.value}>{props.value || props.text}</SelectText>
    <Image width={18} height={18} source={Images.icons.arrow_down} />
  </SelectView>
  </View>
);

const CustomSelect = (props) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(null);
  const onPress = (val) => {
    setValue(val);
    setOpened(false);
  };
  return (
    <SelectContainer>
      <SelectView width={'100%'} onPress={() => setOpened(!opened)}>
        <SelectText isValue={value}>{value || props.text}</SelectText>
        <Image width={18} height={18} source={Images.icons.arrow_down}/>
      </SelectView>
      {opened && <SelectList>
        {get(props, 'data', []).map(item => {
          return <SelectItem key={item} value={item} onPress={() => onPress(item)}>
            <SelectText size={'24px'}>{item}</SelectText>
          </SelectItem>
        })}
      </SelectList>
      }
    </SelectContainer>
  );
};

const LineView = styled(View)`
    height: 47px;
    width: 7px;
    background-color: ${props => props.required ? '#7cd9d0' : Colors.description};
`;
const SelectView = styled(TouchableOpacity)`
    width: ${props => props.width}
    height: 47px;
    border-left-width: 0;
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
    font-size: ${props => props.size ? props.size : themeProp('szTextDefault')};
    margin-top: ${Platform.OS === "ios" ? '10px' : "0"}
`;

const InputView = styled(View)`
    width: 95%;
    height: 47px;
    border-left-width: 0;
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
    flex: 1;
`;

const SelectContainer = styled(View)`
    width: 96%;
    height: 47px;
    margin-bottom: 17px;
`;

const SelectList = styled(ScrollView)`
    position: absolute;
    background-color: #ffffff
    width: 100%;
    max-height: 200px;
    border-width: 1px;
    border-color: #c9c3c5;
    z-index: 200000000;
    flex: 1;
    margin-top: 47px
    padding-horizontal: ${Platform.OS === 'ios' ? '15px' : '19px'};
    padding-vertical: 5px
`;

const SelectItem = styled(TouchableOpacity)`
    
`;
export {BaseTextInput, PasswordInput, BaseSelect, BaseTextFilter, CustomSelect};
