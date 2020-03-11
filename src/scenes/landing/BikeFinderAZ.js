import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';


const BikeFinderAZ = props => {
  const data = [
    {name: 'ABUS', count: 34},
    {name: 'ADRIATICA', count: 34},
    {name: 'AL-KO SAWIKO', count: 34},
    {name: 'ALPEK', count: 34},
    {name: 'ALPINA', count: 34},
    {name: 'ARLIX', count: 34},
  ];
  return (
    <View style={{flex:1}}>
      <Container>
        <Title size={'40px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>
        <Divider size={'5px'}/>
        <BaseTextFilter placeholder="MARCA, MODELLO"/>
        <Divider size={'30px'}/>
        <CategoryText>TUTTIIMODELL</CategoryText>
        <Divider size={'10px'} />
        <TouchableOpacity><Title size={'0'} color={themeProp('colorThird')} width={'50px'}>A</Title></TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `company_${index}`}
          renderItem={({ item, index }) => {
            return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
               paddingHorizontal: 13, paddingVertical: 3, backgroundColor: (index % 2 === 0) && '#F7F7F7' }}>
              <ListText>{item.name}</ListText>
              <Badge>
                <BadgeCount>{item.count}</BadgeCount>
              </Badge>
            </View>
          )}}
        />
        <Divider size={'10px'} />
        <TouchableOpacity><Title size={'0'} color={themeProp('colorThird')} width={'50px'}>B</Title></TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `company_${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                paddingHorizontal: 13, paddingVertical: 3, backgroundColor: (index % 2 === 0) && '#F7F7F7' }}>
                <ListText>{item.name}</ListText>
                <Badge>
                  <BadgeCount>{item.count}</BadgeCount>
                </Badge>
              </View>
            )}}
        />
      </Container>
      <Bottom>
        <TouchableOpacity onPress={() => Actions.BikeFinder()}><Image width={50} height={50} source={Images.icons.ic_arrow_left} /></TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.Home()}><Image width={50} height={50} source={Images.icons.ic_close} /></TouchableOpacity>
      </Bottom>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
`;

const Bottom = styled(View)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-bottom: 30px;
  margin-top: 10px;
`;

const ListText = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 25px;
  padding-top: 10px;
`;

const Badge = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const BadgeCount = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-size: 13px;
  font-family: ${themeProp('fontUniHeavy')}
  margin-top: 5px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;


const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
  padding-horizontal: 10px; 
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}   
  padding-horizontal: 10px; 
`;


export default BikeFinderAZ;
