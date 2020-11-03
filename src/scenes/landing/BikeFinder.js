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
import HTML from 'react-native-render-html';
import Themes from '../../res/Themes';
import {openLink} from '../../utils/NumberUtil';
import analytics from "@react-native-firebase/analytics";
const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const setAnalytics = eventName => {
  analytics().logEvent(eventName)
    .then(res=>{
      console.log('analytics result============', eventName);
    })
    .catch(error => {
      console.log("---------------------------------------Error occured-------------------", error);
    });
};
const BikeFinder = props => {
  const navigation = useNavigation();
  const {staticData, category, bikeSearch, bikeData, brandData} = useStores();

  const goToCategory = (id, title, color) => {
    bikeSearch.clearRequest();
    console.log('id====', id);
    switch (true) {
      case (id === 2):
        setAnalytics('ebike_finder_az');
        navigation.navigate('BikeFinderAZ');
        break;
      case (id>=4 && id<=10):
        setAnalytics(`ebike_finder_${title}`);
        category.setId(id, title, color);
        navigation.navigate('BikeFinderCategory');
        break;
    }
  };
  return (
    <View style={{flex: 1}}>
      <Container>
        <Divider size={25}/>
        {get(staticData, 'data.search_landing', []).map((item, i) => {
          if (i === 1 || i === 3) return <View><Divider size={15}/><Title size={'0'} color={item.colore}>{item.titolo}</Title></View>
          return (<View>
            <TouchableOpacity key={i} onPress={() => goToCategory(i, item.titolo, item.colore)}>
              <HTML onLinkPress={openLink} html={item.titolo} baseFontStyle={{color: item.colore, fontSize: 35, fontFamily: Themes.base.fontUniHeavy}} containerStyle={{marginTop: 0}}/>
              {/*<Title size={'0'} color={item.colore}>{item.titolo}</Title>*/}
            </TouchableOpacity>
          </View>)
        })}
        <Divider size={60}/>
      </Container>
      <TouchableOpacity style={{position: 'absolute', right: 10, bottom: 10}} onPress={() => navigation.navigate('Home')}><Image width={50} height={50} source={Images.icons.ic_close} /></TouchableOpacity>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-left: 13px;
    paddingTop: ${isIOS ? (ratio < 1.5 ? verticalScale(40) : (ratio < 1.8 ? verticalScale(65) : verticalScale(55))) : verticalScale(10)}
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
