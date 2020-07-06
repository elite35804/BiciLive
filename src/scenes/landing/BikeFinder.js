import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, Linking, Dimensions, Platform} from 'react-native';
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

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const BikeFinder = props => {
  const navigation = useNavigation();
  const {staticData, category, bikeSearch, bikeData, brandData} = useStores();
  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const type = url.includes('/ebike/') ? 'Product' : 'Brand';
    const data = url.split('data=')[1].replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%3D/g, '=');
    if (type === 'Product') {
      bikeData.clearData();
      bikeData.getData(data);
    } else {
      brandData.clearData();
      brandData.getData(data);
    }
    navigation.navigate(type, {url: type});
  };
  // useEffect(() => {
  //   Linking.addEventListener('url', event => navigate(event.url))
  //   return () => Linking.removeEventListener('url', event => navigate(event.url));
  // }, [])
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
    <View style={{flex: 1}}>
      {/*<Header>*/}
        {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.goBack()}>*/}
          {/*<Image resizeMode="contain" source={Images.btn.btn_back_arrow}*/}
                 {/*style={{*/}
                   {/*position: 'absolute',*/}
                   {/*left: 0,*/}
                   {/*width: isIOS ? scale(35) : scale(37),*/}
                   {/*height: isIOS ? verticalScale(19) : verticalScale(23),*/}
                   {/*resizeMode: 'contain',*/}
                   {/*marginTop: verticalScale(14),*/}
                 {/*}}/>*/}
          {/*<Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight: ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}>EBIKE FINDER</Text>*/}
        {/*</TouchableOpacity>*/}
      {/*</Header>*/}
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
    paddingTop: ${isIOS ? (ratio < 1.5 ? verticalScale(40) : (ratio < 1.8 ? verticalScale(65) : verticalScale(55))) : verticalScale(10)}
`;

const Bottom = styled(TouchableOpacity)`
  background-color:${themeProp('colorSecondary')};
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 16px;
  padding-vertical: 10px;
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
