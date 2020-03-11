import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect } from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';

const Welcome = props => {
  useEffect(() => {
    setTimeout(() => Actions.Home(), 3000)
  });
  return (
    <Container>
      <Title size={'40px'} color={themeProp('colorPrimary')}>CIAO NOME</Title>
      <Divider size={'15px'}/>
      <Content>Lorem ipsum dolor sit amet,{'\n'}consectetur adipiscing elit,{'\n'}sed do eiusmod tempor{'\n'}incididunt ut labore et dolore{'\n'}magna aliqua. Ut enim ad{'\n'}minim veniam</Content>
      <Title size={'40px'} color={themeProp('colorPrimary')}>CHE BIKER SEI?</Title>
      <Divider size={'10px'} />
      <Title size={'0'} color={'#D75A2B'}>eMTB</Title>
      <Title size={'0'} color={'#E08330'}>eCITY</Title>
      <Title size={'0'} color={'#509F48'}>eTREKKING</Title>
      <Title size={'0'} color={'#85B73F'}>eSTRADA</Title>
      <Title size={'0'} color={'#3968AE'}>ePIEGHEVOLI</Title>
      <View style={{marginBottom: 30}}/>
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
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
  padding-left: 8px;
`;

const Content = styled(Text)`
  font-size: 25px;
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniBook')};
  padding-left: 8px;
`;

export default Welcome;
