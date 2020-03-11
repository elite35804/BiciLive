import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Dimensions, Platform} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import {Step, Divider, CheckBox, Price, Slider, MainBikeInfo, ListBikeInfo, DivideLine} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';

const isIOS = Platform.OS === "ios";

const Result = props => {
  return (
    <View style={{flex: 1}}>
      <Container>
        <TitleView>
          <Title size={'15px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>
          <BadgeView>
            <Title size={isIOS ? '8px' : '0'} color={themeProp('colorSecondary')} width={'20px'}>1065</Title>
          </BadgeView>
        </TitleView>
        <Title size={'0'} color={themeProp('colorBorder')} width={'35px'}>TUTTII MODELLI</Title>
        <SortView>
          <SortItem color={'black'}>
            <Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>PREZZO</Text>
            <Image width={7} height={7} source={Images.icons.ic_triangle_down} />
          </SortItem>
          <SortItem color={'#53DCD0'}>
            <Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold', color: '#53DCD0' }}>COPPIA</Text>
            <Image width={7} height={7} source={Images.icons.ic_triangle_up} />
          </SortItem>
          <SortItem color={'black'}>
            <Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>BATTERIA</Text>
            <Image width={7} height={7} source={Images.icons.ic_triangle_down} />
          </SortItem>
          <SortItem color={'black'}>
            <Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>2020</Text>
            <Image width={7} height={7} source={Images.icons.ic_triangle_down} />
          </SortItem>
        </SortView>
        <MainBikeInfo/>
        <DivideLine/>
        <ListBikeInfo/>
        <DivideLine/>
        <ListBikeInfo/>
        <DivideLine/>
        <MainBikeInfo/>
        <DivideLine/>
        <ListBikeInfo/>
        <DivideLine/>
        <ListBikeInfo/>
      </Container>
      <Bottom>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_plus_circle} />
      </Bottom>
    </View>

  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
    padding-horizontal: 10px;
`;

const TitleView = styled(View)`
  flex-direction: row; 
  justify-content: space-between;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 10px;
`;

const Bottom = styled(TouchableOpacity)`
  margin-top: 10px;
  margin-bottom: 31px;
  align-items: center;
  justify-content: center;
`;

const BadgeView = styled(View)`
  width: 56px
  height: 56px
  border-radius: 28px
  justify-content: center
  align-items: center
  background-color: red
`;

const SortView = styled(View)`
  flex-direction: row
  justify-content: space-between;
  margin-bottom: 20px
`;

const SortItem = styled(View)`
  flex-direction: row;
  justify-content: space-between
  align-items: center
  border-bottom-color: ${props => props.color} 
  border-bottom-width: 2px 
  width: 20%
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;

export default Result;
