import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, Linking} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {Header} from 'components/controls/BaseUtils'
import {BaseTextInput, BaseSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {toJS} from 'mobx';
import { get } from 'lodash';
import {scale, verticalScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const BikeFinder = props => {
  const navigation = useNavigation();
  const {staticData, category, bikeSearch, bikeData, brandData} = useStores();
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
  }, [])
  const goToCategory = (id, title, color) => {
    bikeSearch.clearRequest();
    console.log('id====', id);
    switch (true) {
      case (id === 2):
        navigation.navigate('BikeFinderAZ');
        break;
      case (id>=4 && id<=10):
        category.setId(id, title, color);
        navigation.navigate('BikeFinderCategory');
        break;
      default:
    }
  };
  return (
    <View>
      <Header>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
          <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                 style={{
                   position: 'absolute',
                   left: 0,
                   width: scale(37),
                   height: verticalScale(23),
                   resizeMode: 'contain',
                   marginTop: verticalScale(14),
                 }}/>
          <Text style={{textAlign: 'center', fontSize: 19, lineHeight: 49}}>EBIKE FINDER</Text>
        </TouchableOpacity>
      </Header>
      <Container>
        <Divider size={25}/>
        {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
        {get(staticData, 'data.search_landing', []).map((item, i) => {
          if (i === 1 || i === 3) return <View><Divider size={15}/><Title size={'0'} color={item.colore}>{item.titolo}</Title></View>
          return (<View>
            <TouchableOpacity key={i} onPress={() => goToCategory(i, item.titolo, item.colore)}><Title size={'0'} color={item.colore}>{item.titolo}</Title></TouchableOpacity>
          </View>)
        })}
      </Container>
      <Bottom onPress={() => navigation.navigate('Home')}>
        <Image width={50} height={50} source={Images.icons.ic_close} />
      </Bottom>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-left: 13px;
    marginTop: ${verticalScale(50)}
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
