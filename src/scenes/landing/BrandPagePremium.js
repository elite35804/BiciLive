import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import ShareTooltip from 'components/controls/ShareTooltip';
import {
  Step,
  Divider,
  CheckBox,
  Price,
  Slider,
  MainBikeInfo,
  ListBikeInfo,
  DivideLine,
  Detail,
  DetailMore
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {Oswald, UniSansBold, UniSansBook} from '../../utils/fontFamily';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import { SwipeListView } from 'react-native-swipe-list-view';
import {moderateScale} from 'react-native-size-matters';
const isIOS = Platform.OS === "ios";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const Expandible_Wrapper = props => {
  const [isCollapse, setCollapse] = useState(false);
  return <View>
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse(!isCollapse)}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image width={'100%'} height={'100%'} source={isCollapse ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
        <Title size={'0'} color={'#'+get(props, 'data.color', 'D75A2B')} width={'35px'}>{get(props, 'data.title', 'eCity')}</Title>
      </View>
      <Badge><BadgeCount>{get(props, 'data.count', '34')}</BadgeCount></Badge>
    </TouchableOpacity>
    {isCollapse &&<View style={{marginTop: 25, marginBottom: 10}}>
      {props.data.content.map((item, index) => {
        if (item.id === "BIKE_RESUME_SMALL")
          return <View>
            <SwipeListView
              data={[""]}
              renderItem={(data, rowMap) => (<View><ListBikeInfo key={index} data={item}/></View>)}
              renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                  <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                  <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
                </TouchableOpacity>
              </View>)}
              leftOpenValue={0}
              rightOpenValue={-80}
            /><DivideLine/></View>
        if (item.id === "BIKE_RESUME_BIG")
          return <View>
            <SwipeListView
              data={[""]}
              renderItem={(data, rowMap) => (<View><MainBikeInfo data={item}/></View>)}
              renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', width: 70,height: '30%', justifyContent: 'center'}}>
                  <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '30%', justifyContent: 'center'}}>
                  <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
                </TouchableOpacity>
              </View>)}
              leftOpenValue={0}
              rightOpenValue={-80}
            />
            <DivideLine/></View>
      })}
    </View>
    }
  </View>
};

const ImageReel = (props) => {
  const {brandData} = useStores();
  const goToBrand = (url) => {
    console.log('url=====', url);
    brandData.clearData();
    brandData.getData(url);
    Actions.BrandPagePremium();
  };
  return (
    <View>
    <CategoryView>
      <TouchableOpacity key="1" onPress={() => {
        goToBrand(get(props, 'data.url1', ''));
      }}><Image
        style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img1', '')}}/></TouchableOpacity>
      <TouchableOpacity key="2" onPress={() => goToBrand(get(props, 'data.url2', ''))}><Image
        style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img2', '')}}/></TouchableOpacity>
      <TouchableOpacity key="3" onPress={() => goToBrand(get(props, 'data.url3', ''))}><Image
        style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img3', '')}}/></TouchableOpacity>
    </CategoryView>
      <CategoryView>
        <TouchableOpacity key="4" onPress={() => goToBrand(get(props, 'data.url4', ''))}><Image
          style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img4', '')}}/></TouchableOpacity>
        <TouchableOpacity key="5" onPress={() => goToBrand(get(props, 'data.url5', ''))}><Image
          style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img5', '')}}/></TouchableOpacity>
        <TouchableOpacity key="6" onPress={() => goToBrand(get(props, 'data.url6', ''))}><Image
          style={{width: moderateScale(105), height: moderateScale(105), resizeMode: 'contain'}}
          source={{uri: get(props, 'data.img6', '')}}/></TouchableOpacity>
      </CategoryView>
    </View>
  );
};
const Stepper = observer(props => {
  const {brandData} = useStores();
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
    currentPosition={brandData.position}
    label={label}
    onPress={p => brandData.position !== p && props.onPress(p - brandData.position)}
  />;
});
const PageSlider = (props) => {
  const {brandData} = useStores();
  let _swiper = React.useRef(null);
  const total = props.data.content.length;

  return (
    <View>
      <Divider size={10}/>
    <SwiperContainer>
      <Swiper
        ref={_swiper}
        containerStyle={{height: isIOS ? 400 : 420}}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout = {4}
        index={brandData.position}
        onIndexChanged={(index) => brandData.setPosition(index)}
      >
        {props.data.content.map((item, index) => {
          return <MainBikeInfo key={index} data={item}/>;
        })}
      </Swiper>
      <Divider size={20}/>
      <View style={{width: '115%', alignSelf: 'center'}}>
        <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
      </View>
    </SwiperContainer>
    </View>
  );
};
const BrandPagePremium = props => {
  const {brandData} = useStores();
  // const [titleData, setTitleData] = useState({});
  const uiData = toJS(brandData.data);
  const [isLike, setLike] = useState(false);
  const {bikeData} = useStores();
  if (Object.keys(uiData).length !== 0) {
    let titleData = {};
    console.log('111111==========', uiData);
    if (uiData[0].id === "TITLE") {
      titleData = uiData.shift();
    }
    // setTitleData(uiData.shift());
    console.log('==========', uiData, titleData);
    const goToBike = url => {
      bikeData.clearData();
      bikeData.getData(url);
      Actions.BikePagePremium();
    }
    const openUrl = (url) => {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    };
    return (
      <Container>
        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          {Object.keys(titleData).length !== 0 && <TitleText color={get(titleData, 'colore', '#000000')}>{get(titleData, 'titolo', 'KOGA')}</TitleText>}
          {uiData.map((item, index) => {
            if (item.id === "TITLE") return  <View><Divider size={-10}/><CategoryText color={item.colore}>{item.titolo}</CategoryText></View>
            if (item.id === "SHARE_BLOCK") return <View><ShareView>
              <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
              <ShareTooltip/>
            </ShareView>
              <Divider size={15}/>
            </View>
            if (item.id === "EXPANDIBLE_WRAPPER_BADGE") return <View><Expandible_Wrapper key={index} data={item}/><Divider size={5}/></View>
            if (item.id === "IMAGE_REEL") return <ImageReel key={`key${index}`} data={item}/>
            if (item.id === "BIKE_RESUME_SMALL") return <View><ListBikeInfo key={index} data={item} goToBike={goToBike}/></View>
            if (item.id === "BIKE_RESUME_BIG") return <View><Divider size={30}/><MainBikeInfo key={index} data={item} goToBike={goToBike}/><Divider size={60}/></View>
            if (item.id === "BRAND_LOGO_BIG")
              return <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{width: 200, height: 200, resizeMode: 'contain', marginTop: -30}}
                  source={{uri: get(item, 'img', '')}}/>
                {/*<Image width={'100%'} height={'100%'} source={Images.background.haibike_lg} />*/}
                <Text style={{color: themeProp('colorDescription'), fontSize: 15, marginTop: -30, fontFamily: UniSansBook,lineHeight: 20}}>
                  {item.text}
                </Text>
              </View>
            if (item.id === 'AD_BANNER_ENGAGE') {
              return <View><Divider size={40}/><TouchableOpacity onPress={() => openUrl(item.url)}><Image style={{width: '100%', height: 130}} source={{uri: item.img}}/></TouchableOpacity><Divider size={20}/></View>
            }
            if (item.id === 'PAGED_SLIDER') {
              return <View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>
            }
          })}
          <Divider size={30} />
        </View>
      </Container>
    );
  } else {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Image style={{width: 70, height: 70, resizeMode: 'contain',marginTop: 14}} source={Images.icons.ic_loading}/></View>
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
`;

const Badge = styled(View)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const BadgeCount = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-size: 15px;
  font-family: ${themeProp('fontUniHeavy')}
  margin-top: ${isIOS ? 5 : 0}
`;

const Desc = styled(Text)`
  color: #5C5C5C;
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 15px;
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


const ItemText = styled(Text)`
  font-size: 45px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniSemiBold')}
`;

const ItemSymbol = styled(Text)`
  font-size: 20px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniBook')}
`;

const ItemView = styled(View)`
  border-top-width: 7px;
  border-top-color: ${themeProp('colorText')};
  background-color: #F2F2F2;
  width: 32%
`;

const SwipeView = styled(View)`
  flex-direction: row;
  justify-content: space-between
`;

const DescText = styled(Text)`
  font-size: 23px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniBook')};
  margin-bottom: 10px
`;

const CategoryText = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: ${moderateScale(32)};
  margin-top: 31px;
`;

const TitleText = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
  text-align: center
`

const SubTitle = styled(Text)`
  color: #F0F0F0;
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
`;

const ShareIcon = styled(View)`
  flex-direction: row;
`;

const ShareView = styled(View)`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
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
 height: 25px
`;

const DescTitle = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 13px;
`;

const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const SwiperContainer = styled(View)`
  width: 100%;
`;


export default observer(BrandPagePremium);
