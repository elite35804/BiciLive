import React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import Images from 'res/Images';
import {get} from 'lodash';
import Swiper from '../../scenes/landing/BikePagePremium';
import {observer} from 'mobx-react'
import {useStores} from '../../hooks/Utils';
import StepIndicator from 'react-native-step-indicator';

const isIOS = Platform.OS === 'ios';

const RelatedElements = (item, index) => {
  return (
    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
      <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
        <Image style={{width: '100%', height: 60}} source={{uri: item[0].img_url}}/>
        <Text style={{
          color: '#909090',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: 10,
        }}>{item[0].brand}</Text>
        <Text style={{
          color: '#D75A2B',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: -5,
        }}>{item[0].modello}</Text>
      </View>
      <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
        <Image style={{width: '100%', height: 60}} source={{uri: item[1].img_url}}/>
        <Text style={{
          color: '#909090',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: 10,
        }}>{item[1].brand}</Text>
        <Text style={{
          color: '#D75A2B',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: -5,
        }}>{item[1].modello}</Text>
      </View>
      <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
        <Image style={{width: '100%', height: 60}} source={{uri: item[2].img_url}}/>
        <Text style={{
          color: '#909090',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: 10,
        }}>{item[2].brand}</Text>
        <Text style={{
          color: '#D75A2B',
          fontSize: 15,
          fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
          marginTop: -5,
        }}>{item[2].modello}</Text>
      </View>
    </View>
  );
};
const RelatedGroup = props => {
  const {data} = props;
  const {swiperState} = useStores();
  let elementArray = [];
  Object.entries(data).forEach(([index, value]) => {
    if (index.includes('img_url')) {
      let number = index.charAt(index.length - 1);
      let elementData = {
        key: index,
        img_url: data[`img_url${number}`],
        img_date: data[`img_date${number}`],
        brand: data[`brand${number}`],
        modello: data[`modello${number}`],
      };
      elementArray.push(elementData);
    }
  });
  let groupedArray = [];
  let tempArray = [];
  elementArray.forEach((item, index) => {
    tempArray.push(item);
    if (index % 3 === 2 || index === elementArray.length - 1) {
      groupedArray.push(tempArray);
      tempArray = [];
    }
  });
  const total = groupedArray.length;
  const label = ['', '', '', '', ''];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:25,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#000000',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#c9c3c5',
    stepStrokeUnFinishedColor: '#c9c3c5',
    separatorFinishedColor: '#c9c3c5',
    separatorUnFinishedColor: '#c9c3c5',
    stepIndicatorFinishedColor: '#c9c3c5',
    stepIndicatorUnFinishedColor: '#c9c3c5',
    stepIndicatorCurrentColor: '#000000',
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelFinishedColor: '#c9c3c5',
    stepIndicatorLabelUnFinishedColor: '#c9c3c5',
    labelColor: '#c9c3c5',
  };

  return (
    <View>
      <View style={{
        backgroundColor: '#333333',
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 8,
      }}>
        <Text style={{
          fontSize: 16,
          color: '#D75A2B',
          fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
          marginTop: 5,
        }}>{get(props, 'data.titolo', '')}</Text>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_close_sm}/></TouchableOpacity>
      </View>
      <View style={{height: 180}}>
        <Swiper showsPagination={false} onIndexChanged={(index) => {swiperState.setPosition(index); console.log('postiion=====', swiperState.position)}}>
          {groupedArray.map((item, index) => RelatedElements(item, index))}
        </Swiper>
      </View>
      <StepIndicator customStyles={customStyles} stepCount={total} currentPosition={swiperState.position} label={label}/>
    </View>
  );

};

export default observer(RelatedGroup);
