import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {
  Divider,
} from 'components/controls/BaseUtils';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const Dashboard = props => {
  return (
      <Container>
        <Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>DASHBOARD</Title>
        <Divider size={20}/>
        <ItemView onPress={() => Actions.Brand()}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>BRAND</Title>
        </ItemView>
        <ItemView onPress={() => Actions.EBike()}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>EBIKE</Title>
        </ItemView>
        <ItemView onPress={() => Actions.User()}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_user_sm}/>
          <Title size={'10px'} color={themeProp('colorDescription')} width={'35px'}>ACCOUNT</Title>
        </ItemView>
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

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}   
  padding-horizontal: 10px; 
`;


export default Dashboard;
