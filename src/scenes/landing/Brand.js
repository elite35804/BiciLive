import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';


const Brand = props => {
  const data = [
    {name: 'ABUS', count: 34},
    {name: 'ADRIATICA', count: 34},
    {name: 'AL-KO SAWIKO', count: 34},
    {name: 'ALPEK', count: 34},
    {name: 'ALPINA', count: 34},
    {name: 'ARLIX', count: 34},
  ];
  return (
      <Container>
        <Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>DASHBOARD</Title>
        <Divider size={20}/>
        <ItemView>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>BRAND</Title>
        </ItemView>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `company_${index}`}
          renderItem={({ item, index }) => {
            return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
               paddingHorizontal: 13, paddingVertical: 3, backgroundColor: (index % 2 === 0) && '#F7F7F7' }}>
              <ListText>{item.name}</ListText>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_red_sm}/>
            </View>
          )}}
        />

      </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
`;

const ItemView = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
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

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}   
  padding-horizontal: 10px; 
`;


export default Brand;
