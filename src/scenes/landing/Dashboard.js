import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Linking} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const Dashboard = props => {
  const navigation = useNavigation();
  const {auth, likeBrand, likeProduct, account, bikeData, brandData} = useStores();
  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const routeName = url.split('://')[1];
    if (routeName.includes('??')) {
      const type = routeName.split('??')[0];
      const data = routeName.split('??')[1].split('==')[1];
      console.log('data===========', data);
      if (type === 'Product') {
        bikeData.clearData()
        bikeData.getData(data);
      }
      if (type === 'Brand') {
        brandData.clearData()
        brandData.getData(data);
      }
      navigation.navigate(type, {url: url});
    } else {
      navigation.navigate(routeName);
    }
  };
  useEffect(() => {
    Linking.addEventListener('url', event => navigate(event.url))
    return () => Linking.removeEventListener('url', event => navigate(event.url));
  }, []);
  return (
      <Container>
        <Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>DASHBOARD</Title>
        <Divider size={20}/>
        <ItemView onPress={() => {likeBrand.getData(auth.token); navigation.navigate('LikeBrand')}}>
          <Image width={'100%'} height={'100%'} style={{marginTop: 10}} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>BRAND</Title>
        </ItemView>
        <ItemView onPress={() => {likeProduct.getData(auth.token); navigation.navigate('LikeProduct')}}>
          <Image width={'100%'} height={'100%'} style={{marginTop: 10}} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>EBIKE</Title>
        </ItemView>
        <ItemView onPress={() => {account.getData(auth.token); navigation.navigate('Account')}}>
          <Image width={'100%'} height={'100%'} style={{marginTop: 10}} source={Images.icons.ic_user_sm}/>
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
