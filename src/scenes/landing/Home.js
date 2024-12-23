import React, {useEffect, useState} from 'react';
import {Image as DefaultImage, View, TouchableOpacity, Text, ScrollView, Platform, Linking, Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {toJS} from 'mobx';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Divider, ErrorView} from '../../components/controls/BaseUtils';
import Image from 'react-native-image-progress';
import { useNavigation } from '@react-navigation/native';
import config from '../../config/Config';
import HTML from 'react-native-render-html';
import Colors from '../../res/Colors';
import Themes from '../../res/Themes';
import {openLink} from '../../utils/NumberUtil';
import analytics from '@react-native-firebase/analytics';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';

const setAnalytics = eventName => {
  analytics().logEvent(eventName)
    .then(res=>{
      console.log('analytics result============', eventName);
    })
    .catch(error => {
      console.log("---------------------------------------Error occured-------------------", error);
    });
};
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
const Stepper = observer(props => {
  const {homeData} = useStores();
  const label = ['', '', '', '', ''];
  const customStyles = {
    stepIndicatorSize: moderateScale(23, 0.7),
    currentStepIndicatorSize: moderateScale(23, 0.7),
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
  const {bikeData, homeData, auth} = useStores();
  const navigation = useNavigation();
  const goToBike = url => {
    setAnalytics('home_slider_tap');
    bikeData.clearData();
    bikeData.getData(url, homeData.url, auth.token);
    navigation.navigate('Product', {url: url});
  };
  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer')
  };
  return (
    <View>
      <LogoView onPress={() => props.data.url_type === 'API' ? goToBike(get(props, 'data.url', '')) : openWebViewer(get(props, 'data.url', ''))}>
        <DefaultImage source={{uri: config.server + get(props, 'data.immagine', '')}}
              style={{width: Dimensions.get('window').width * 0.95, height: isIOS ? (ratio < 1.5 ? 500 : 260) : 230, resizeMode: 'contain'}}/>
      </LogoView>
      <Content>
        <TypeView
          bg_color={'#' + get(props, 'data.color', themeProp('colorType'))}>
          <HTML
            onLinkPress={openLink}
            html={get(props, 'data.categoria', '')}
            baseFontStyle={{fontSize: moderateScale(13), color: Colors.secondary, fontFamily: Themes.base.fontPrimaryBold}}
          />
        </TypeView>
        <HTML html={get(props, 'data.brand', '')} onLinkPress={openLink}
          baseFontStyle={{color: Colors.description, fontFamily: Themes.base.fontPrimaryBold, fontSize: moderateScale(22)}}
          containerStyle={{marginTop: moderateScale(20), marginBottom: -10}}
        />

        <NameView>
          <HTML onLinkPress={openLink} html={`<p>${get(props, 'data.modello', '')}</p>`}
            containerStyle={{marginTop: isIOS ? 0 : moderateScale(-5), marginRight: 5}}
                renderers={{p: (_, children)=><Text numberOfLines={1}>{children}</Text>}}
            baseFontStyle={{color: '#' + get(props, 'data.color', Themes.base.colorType), fontSize: moderateScale(34), fontFamily: Themes.base.fontPrimaryBold}}
          />
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
        containerStyle={{height: isIOS ? moderateScale(390) : moderateScale(335, 0.1)}}
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
      <Divider size={isIOS ? -50 : 10}/>
      <View style={{width: '108%', alignSelf: 'center'}}>
        <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
      </View>
    </SwiperContainer>
  );
};


const ImageReel = (props) => {
  const {brandData, homeData, auth} = useStores();
  const navigation = useNavigation();
  const goToBrand = (url) => {
    setAnalytics(`home_${getRandomInt(2) ? 'ebike' : 'motori'}_evindenza`);
    brandData.clearData();
    brandData.getData(url, homeData.url, auth.token);
    navigation.navigate('Brand', {url: url})
  };
  return (
    <View>
      <CategoryView>
        {props.data.img1 && <TouchableOpacity key="1" onPress={() => {
          goToBrand(get(props, 'data.url1', ''));
        }}><CategoryImage
          source={{uri: get(props, 'data.img1', '')}}/></TouchableOpacity>}
        {props.data.img2 && <TouchableOpacity key="2" onPress={() => goToBrand(get(props, 'data.url2', ''))}><CategoryImage
          source={{uri: get(props, 'data.img2', '')}}/></TouchableOpacity>}
        {props.data.img3 &&  <TouchableOpacity key="3" onPress={() => goToBrand(get(props, 'data.url3', ''))}><CategoryImage
          source={{uri: get(props, 'data.img3', '')}}/></TouchableOpacity>}
      </CategoryView>
      {props.data.img4 &&<CategoryView>
        {props.data.img4 && <TouchableOpacity key="4" onPress={() => goToBrand(get(props, 'data.url4', ''))}><CategoryImage
          source={{uri: get(props, 'data.img4', '')}}/></TouchableOpacity>}
        {props.data.img5 && <TouchableOpacity key="5" onPress={() => goToBrand(get(props, 'data.url5', ''))}><CategoryImage
          source={{uri: get(props, 'data.img5', '')}}/></TouchableOpacity>}
        {props.data.img6 && <TouchableOpacity key="6" onPress={() => goToBrand(get(props, 'data.url6', ''))}><CategoryImage
          source={{uri: get(props, 'data.img6', '')}}/></TouchableOpacity>}
      </CategoryView>}
    </View>
  );
};

const Finder = () => {
  const navigation = useNavigation();
  return (
    <FinderView>
      <Title color={themeProp('colorThird')}>EBIKE FINDER</Title>
      <SubTitle>Cerca la tua bici ideale</SubTitle>
      <TouchableOpacity onPress={() => {
        setAnalytics('home_ebike_finder');
        navigation.navigate('BikeFinder');
      }}>
        <DefaultImage style={{width: ratio < 1.5 ? 220 : 170, height: ratio < 1.5 ? 220 : 170, resizeMode: 'contain',marginTop: 14}} source={Images.btn.btn_finder_animated}/></TouchableOpacity>
        {/*<Image width={92} height={92} source={Images.btn.bike_finder} style={{marginTop: 14}}/></TouchableOpacity>*/}
    </FinderView>
  );
};
const AdBlock = props => {
  const navigation = useNavigation();
  const {web} = useStores();
  const openWebViewer = (url) => {
    setAnalytics('home_ad_banner');
    web.url = url;
    navigation.navigate('WebViewer')
  };
  return <View><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image style={{width: Dimensions.get('window').width - scale(20), height: (Dimensions.get('window').width - scale(20))/3, resizeMode: 'contain'}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>
};

const HomeElements = (props) => {
  const uiData = props.data;
  // console.log('HOME UI DATA:::', uiData);
  const items = [];
  uiData.forEach((item, index) => {
    if (item.id === 'PAGED_SLIDER' && Object.keys(item.content).length) {
      items.push(<View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>);
    }
    if (item.id === 'TITLE') {
      items.push(<View><Divider size={ratio < 1.5 ? 50 : 0}/><HTML onLinkPress={openLink} html={item.titolo} baseFontStyle={{fontSize: scale(30), color: item.colore, fontFamily: Themes.base.fontUniHeavy}}/></View>);
    }
    if (item.id === 'IMAGE_REEL') {
      items.push(<View><Divider size={-20}/><ImageReel key={`key${index}`} data={item}/></View>);
    }
    if (item.id === 'EBIKE_FINDER') {
      items.push(<View><Divider size={-20}/><Finder key={`key${index}`}/></View>);
    }
    if (item.id === 'AD_BANNER_ENGAGE') {
      items.push(<AdBlock data={item}/>)
    }
    items.push(<Divider key={`divider${index}`} size={25}/>);
  });
  return items;
};



const Home = (props) => {
  const {hud} = useStores();
  const {homeData} = useStores();
  if (homeData.isLoading) {
    hud.show()
  } else {
    if (homeData.errorIf) {
      return <ErrorView/>
    } else {
      hud.hide();
      const uiData = toJS(get(homeData, 'data', []));
      homeData.setPosition(0);

      return (
        <Container showsVerticalScrollIndicator={false}>
          <HomeElements data={uiData}/>
        </Container>
      );
    }
  }

};

const Container = styled(ScrollView)`
    flex: 1;
    background-color:${themeProp('colorSecondary')};
    padding-horizontal: ${scale(10)};
    padding-vertical: ${isIOS ? verticalScale(20) : 0}
`;

const LogoView = styled(TouchableOpacity)`
  width: 100%;
  text-align: center
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

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
  margin-top: ${verticalScale(-3)}
`;


const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  
`;

const FinderView = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: ${ratio < 1.5 ? '80px' : '48px'};
`;

const Title = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: ${scale(30)};
`;

const SubTitle = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniBook')}
  font-size: ${ratio < 1.5 ? '25px' : '14px'};
`;

const SwiperContainer = styled(View)`
  width: 100%;
  flex: 1;
`;

const CategoryImage = styled(Image)`
  margin-top: 20px
  width: ${ratio < 1.5 ? moderateScale(150)  : moderateScale(105)}; 
  height: ${moderateScale(95)}; 
  resize-mode: contain; 
  border-width: 1; 
  border-color: #ebebeb
`;

export default observer(Home);
