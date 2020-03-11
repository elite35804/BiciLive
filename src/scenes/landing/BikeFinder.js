import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';


const BikeFinder = props => {
  return (
    <View style={{flex:1}}>
      <Container>
        <Title size={'40px'} color={themeProp('colorThird')}>EBIKE FINDER</Title>
        <Divider size={'15px'}/>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <TouchableOpacity onPress={() => Actions.BikeFinderAZ()}><Title size={'0'} color={themeProp('colorThird')}>A-Z</Title></TouchableOpacity>
        <Divider size={'15px'}/>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#D75A2B'}>eMTB</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#E08330'}>eCITY</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#509F48'}>eTREKKING</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#85B73F'}>eSTRADA</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#3968AE'}>ePIEGHEVOLI</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#1884ae'}>eCARGO</Title></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.BikeFinderCategory()}><Title size={'0'} color={'#78ae6a'}>eBAMBINO</Title></TouchableOpacity>
        <Divider size={'15px'}/>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <BaseTextInput placeholder="MARCA, MODELLO"/>
      </Container>
      <Bottom onPress={() => Actions.Home()}>
        <Image width={50} height={50} source={Images.icons.ic_close} />
      </Bottom>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-left: 13px;
`;

const Bottom = styled(TouchableOpacity)`
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 16px;
  margin-bottom: 30px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;


const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
`;

const Title = styled(Text)`
  font-size: 35px;
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;


export default BikeFinder;
