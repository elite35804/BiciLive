import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform, Linking} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import axios from 'axios';
import {toJS} from 'mobx';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Divider} from '../../components/controls/BaseUtils';

const isIOS = Platform.OS === 'ios';
const Stepper = observer(props => {
  const {homeData} = useStores();
  const label = ['', '', '', '', ''];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
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
  return <StepIndicator

    customStyles={customStyles}
    stepCount={props.total}
    currentPosition={homeData.position}
    label={label}
    onPress={p => homeData.position !== p && props.onPress(p - homeData.position)}
  />;
});

const PageElement = props => {
  const {bikeData} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url);
    Actions.BikePagePremium();
  };
  return (
    <View>
      <LogoView onPress={() => goToBike(get(props, 'data.url', ''))}>
        <Logo width={'100%'} height={'100%'}
              source={{uri: 'http://biciapp.sepisolutions.com' + get(props, 'data.immagine', '')}}
              style={{width: '100%', height: Platform.OS === 'ios' ? 260 : 230}}/>
      </LogoView>
      <Content>
        <TypeView
          bg_color={'#' + get(props, 'data.color', themeProp('colorType'))}><Type>{get(props, 'data.categoria', '')}</Type></TypeView>
        <Sort>{get(props, 'data.brand', '')}</Sort>
        <NameView>
          <Name numberOfLines={1} color={'#' + get(props, 'data.color', themeProp('colorType'))}>{get(props, 'data.modello', '')}</Name>
          <Image width={20} height={20} source={Images.icons.arrow_right}/>
        </NameView>
      </Content>
    </View>
  );
};
const PageSlider = (props) => {
  const {homeData} = useStores();
  let _swiper = React.useRef(null);
  const total = props.data.content.length;

  return (
    <SwiperContainer>
      <Swiper
        ref={_swiper}
        containerStyle={{height: isIOS ? moderateScale(320) : moderateScale(300)}}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout = {4}
        index={homeData.position}
        onIndexChanged={(index) => homeData.setPosition(index)}
      >
        {props.data.content.map((item, index) => {
          return <PageElement key={index} data={item}/>;
        })}
      </Swiper>
      {isIOS && <Divider size={20}/>}
      <View style={{width: '115%', alignSelf: 'center'}}>
        <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
      </View>
    </SwiperContainer>
  );
};


const ImageReel = (props) => {
  const {brandData} = useStores();
  const goToBrand = (url) => {
    brandData.clearData();
    brandData.getData(url);
    Actions.replace('BrandPagePremium');
  };
  return (
    <View>
      <CategoryView>
        <TouchableOpacity key="1" onPress={() => {
          goToBrand(get(props, 'data.url1', ''));
        }}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img1', '')}}/></TouchableOpacity>
        <TouchableOpacity key="2" onPress={() => goToBrand(get(props, 'data.url2', ''))}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img2', '')}}/></TouchableOpacity>
        <TouchableOpacity key="3" onPress={() => goToBrand(get(props, 'data.url3', ''))}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img3', '')}}/></TouchableOpacity>
      </CategoryView>
      <CategoryView>
        <TouchableOpacity key="4" onPress={() => goToBrand(get(props, 'data.url4', ''))}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img4', '')}}/></TouchableOpacity>
        <TouchableOpacity key="5" onPress={() => goToBrand(get(props, 'data.url5', ''))}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img5', '')}}/></TouchableOpacity>
        {props.data.url6 && <TouchableOpacity key="6" onPress={() => goToBrand(get(props, 'data.url6', ''))}><Image
          style={{width: scale(110), height: verticalScale(110), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img6', '')}}/></TouchableOpacity>}
      </CategoryView>
    </View>
  );
};

const Finder = () => {
  return (
    <FinderView>
      <Title color={themeProp('colorThird')}>EBIKE FINDER</Title>
      <SubTitle>Cerca la tua bici ideale</SubTitle>
      <TouchableOpacity onPress={() => {
        Actions.BikeFinder();
      }}>
        <Image style={{width: 170, height: 170, resizeMode: 'contain',marginTop: 14}} source={Images.btn.btn_finder_animated}/></TouchableOpacity>
        {/*<Image width={92} height={92} source={Images.btn.bike_finder} style={{marginTop: 14}}/></TouchableOpacity>*/}
    </FinderView>
  );
};

const openUrl = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + this.props.url);
    }
  });
};

const HomeElements = (props) => {
  const uiData = props.data;
  const items = [];
  uiData.forEach((item, index) => {
    if (item.id === 'PAGED_SLIDER' && Object.keys(item.content).length) {
      items.push(<View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>);
    }
    if (item.id === 'TITLE') {
      items.push(<View><Title key={`key${index}`} color={item.colore}>{item.titolo}</Title></View>);
    }
    if (item.id === 'IMAGE_REEL') {
      items.push(<View><Divider size={-20}/><ImageReel key={`key${index}`} data={item}/></View>);
    }
    if (item.id === 'EBIKE_FINDER') {
      items.push(<View><Divider size={-20}/><Finder key={`key${index}`}/></View>);
    }
    if (item.id === 'AD_BANNER_ENGAGE') {
      items.push(<View><TouchableOpacity onPress={() => openUrl(item.url)}><Image style={{width: '100%', height: 130}} source={{uri: item.img}}/></TouchableOpacity><Divider size={20}/></View>)
    }
    items.push(<Divider key={`divider${index}`} size={25}/>);
  });
  return items;
};

const Home = (props) => {
  const {homeData} = useStores();
  if (!homeData.data.content) {
    return <View><Text>There is no data to display</Text></View>;
  }
  const uiData = toJS(get(homeData, 'data.content', []));
  console.log('homeData====', uiData);
  homeData.setPosition(0);
  return (
    <Container>
      <HomeElements data={uiData}/>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-horizontal: 14px;
`;

const Date = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 12px;
`;

const Description = styled(Text)`
  color: #5C5C5C;
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 18px;
`;

const Desc = styled(Text)`
  color: #5C5C5C;
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 15px;
`;

const LogoView = styled(TouchableOpacity)`
  width: 100%;
`;

const Logo = styled(Image)`
  resize-mode: contain;
`;

const Content = styled(View)`
  padding-horizontal: 14px;
  margin-left: -15px;
`;

const TypeView = styled(View)`
  background-color: ${props => props.bg_color}
  padding-horizontal: 5px;
  position: absolute;
  left: 15;
`;

const Type = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: ${moderateScale(12)};
`;

const Sort = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: ${moderateScale(18)};
  margin-bottom: -10px;
  margin-top: ${moderateScale(16)};
`;

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
`;

const Name = styled(Text)`
  color: ${props => props.color ? props.color: themeProp('colorType')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: ${moderateScale(28)};
  margin-top: ${isIOS ? 0 : moderateScale(-5)};
  margin-right: 5px;
`;

// const Divider = styled(View)`
//   margin-top: ${props => props.size}
// `;

const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
`;

const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const FinderView = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

const NewsFinderView = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: ${moderateScale(34)};
`;

const SubTitle = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniBook')}
  font-size: 14px;
`;

const NewsView = styled(View)`
  margin-top: 32px;
  margin-bottom: 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DescView = styled(View)`
 background-color: #333333;
 padding-horizontal: 5px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 height: 25px;
`;

const DescTitle = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 13px;
`;

const SwiperContainer = styled(View)`
  width: 100%;
  flex: 1;
`;

export default observer(Home);
