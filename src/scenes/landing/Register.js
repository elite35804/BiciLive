import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect } from 'components/controls/BaseTextInput';
import BaseSelectBox from 'components/controls/BaseSelectBox';
import {BlueButton, WhiteButton} from 'components/controls/Button';

const Register = props => {

  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  return (
    <Container>
      <Title>REGISRAZIONE</Title>
      <View style={{alignItems: 'center'}}>
        <BaseTextInput placeholder="EMAIL"/>
        <BaseTextInput placeholder="EMAIL"/>
        <BaseTextInput placeholder="EMAIL"/>
        <BaseTextInput placeholder="EMAIL"/>
        <BaseSelect text="EMAIL"/>
        <BaseSelect text="EMAIL"/>
        <BaseSelect text="EMAIL"/>
      </View>
      <Divider size="60px" />
      <BaseSelectBox checked={checked} onPress={() => setChecked(!checked)} text="
      Lorem Ipsum dolor sit amet, consecteur adipiscing eUt,  sed do elusmod tempor
      "/>
      <BaseSelectBox checked={checked1} onPress={() => setChecked1(!checked1)} text="
      Lorem Ipsum dolor sit amet, consecteur adipiscing eUt,  sed do elusmod tempor
      "/>
      <Bottom>
        <WhiteButton onPress={() => Actions.Welcome()}>REGISTRATI</WhiteButton>
      </Bottom>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    flex: 1;
    padding-horizontal: 5px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const Title = styled(Text)`
  font-size: 35px;
  color: ${themeProp('colorPrimary')};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: 40px;
  padding-left: 8px;
`;

const Bottom = styled(TouchableOpacity)`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
`;

export default Register;
