import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  Linking,
  Image as DefaultImage,
  Alert, Dimensions,
  FlatList
} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import ShareTooltip from 'components/controls/ShareTooltip';
import {
  Header,
  Step,
  Divider,
  CheckBox,
  Price,
  Slider,
  MainBikeInfo,
  ListBikeInfo,
  DivideLine,
  Detail,
  DetailMore,
  ErrorView
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {Oswald, UniSansBold, UniSansBook} from '../../utils/fontFamily';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import { SwipeListView } from 'react-native-swipe-list-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const isIOS = Platform.OS === "ios";
import analytics from '@react-native-firebase/analytics';
import RNInstallReferrer from 'react-native-install-referrer';
import {ShareDialog} from 'react-native-fbsdk';
import config from '../../config/Config';
import Share from 'react-native-share';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const RelatedElements = (item, index) => {
  const navigation = useNavigation();
  const {bikeData, brandData, auth} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url, brandData.url, auth.token);
    navigation.navigate('Product', {url: url});
  };
  return (
    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
      {item.map((item0, index) =>
        <View key={index} style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
          <TouchableOpacity onPress={() => goToBike(item0.url)}><Image style={{width: '100%', height: 60, resizeMode: 'contain'}}
                                                                       source={{uri: item0.img_url}}/></TouchableOpacity>
          <Text style={{
            color: '#909090',
            fontSize: 15,
            fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
            marginTop: 10,
          }}>{item0.brand}</Text>
          <Text style={{
            color: item0.color,
            fontSize: 15,
            fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
            marginTop: -5,
          }}>{item0.modello}</Text>
        </View>,
      )}
    </View>
  );
};
const RelatedGroup = props => {
  const {data} = props;
  const {brandData} = useStores();
  let _swiper = React.useRef(null);
  let elementArray = [];
  Object.entries(data).forEach(([index, value]) => {
    if (index.includes('img_url')) {
      let number = index.substring(7);
      let elementData = {
        key: index,
        img_url: data[`img_url${number}`],
        img_date: data[`img_date${number}`],
        brand: data[`brand${number}`],
        modello: data[`modello${number}`],
        url: data[`url${number}`],
        color: data[`color${number}`],
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
  return (
    <View>
      <View style={{
        backgroundColor: '#333333',
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 8,
      }}>
        <Text style={{
          fontSize: 16,
          color: '#53dcd0',
          fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
          marginTop: 4,
        }}>{get(props, 'data.titolo', '')}</Text>
        {/*<TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_close_sm}/></TouchableOpacity>*/}
      </View>
      <View style={{height: 180}}>
        <Swiper ref={_swiper} showsPagination={false} index={brandData.position} autoplay={true}
                autoplayTimeout={4}
                onIndexChanged={(index) => brandData.setPosition(index)}>
          {groupedArray.map((item, index) => RelatedElements(item, index))}
        </Swiper>
        <View style={{width: '115%', alignSelf: 'center'}}>
          <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
        </View>
      </View>
    </View>
  );

};
const Expandible_Wrapper = props => {

  const [isCollapse, setCollapse] = useState(false);
  const {brandData} = useStores();
  return <View>
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse(!isCollapse)}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image width={'100%'} height={'100%'} source={isCollapse ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
        <Title size={'0'} color={'#'+get(props, 'data.color', 'D75A2B')} width={'35px'}>{get(props, 'data.title', 'eCity')}</Title>
      </View>
      <Badge><BadgeCount size={get(props, 'data.count', '34') > 99 ? '13px' : '15px'}>{get(props, 'data.count', '34')}</BadgeCount></Badge>
    </TouchableOpacity>
    {isCollapse &&<View style={{marginTop: 25, marginBottom: 10}}>
      {<FlatList
        data={props.data.content}
        keyExtractor={(item,index) => index}
        initialNumToRender = {10}
        renderItem={({item, index}) => {
          if (item.id === "BIKE_RESUME_SMALL")
            return <View>
              <SwipeListView
                data={[""]}
                renderItem={(data, rowMap) => (<View><ListBikeInfo key={index} data={item} referer={brandData.url}/></View>)}
                renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                  <LikeBlock data={item}/>
                </View>)}
                leftOpenValue={0}
                rightOpenValue={-80}
              />
              <DivideLine/></View>
          if (item.id === "BIKE_RESUME_BIG")
            return <View>
              <SwipeListView
                data={[""]}
                renderItem={(data, rowMap) => (<View><MainBikeInfo data={item} referer={brandData.url}/></View>)}
                renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                  <LikeBlock data={item}/>
                  {/*<TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '30%', justifyContent: 'center'}}>*/}
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />*/}
                  {/*</TouchableOpacity>*/}
                </View>)}
                leftOpenValue={0}
                rightOpenValue={-80}
              />
              <DivideLine/></View>
          if (item.id === 'RELATED_GROUP') {
            return <View><RelatedGroup key={`key${index}`} data={item}/><Divider size={10}/><DivideLine/></View>
          }
        }
        }/>}
    </View>
    }
  </View>
};

const ImageReel = (props) => {
  const navigation = useNavigation();
  const {brandData, auth} = useStores();
  const goToBrand = (url) => {
    console.log('url=====', url);
    brandData.clearData();
    brandData.getData(url, brandData.url, auth.token);
    navigation.navigate('Brand', {url: url});
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
        containerStyle={{height: isIOS ? ratio < 1.5 ? 650 : 400 : 420}}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout = {4}
        index={brandData.position}
        onIndexChanged={(index) => brandData.setPosition(index)}
      >
        {props.data.content.map((item, index) => {
          return <MainBikeInfo key={index} data={item} referer={brandData.url}/>;
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

const shareFacebook = (url, share_url) => {
  const content = `${share_url}?data=${url}`;
  const options = {
    title: 'Bicklive',
    message: 'Bicilive',
    social: Share.Social.FACEBOOK,
    url: content,
  };
  Share.shareSingle(options).then(res => {
    console.log('res=====', res);
  }).catch(e => {
    console.log('e========', e);
  });
};

const shareLinkedin = (url, share_url) => {
  const content = `${share_url}?data=${url}`;
  const options = {
    title: 'Bicklive',
    message: 'Bicilive',
    social: Share.Social.LINKEDIN,
    url: content,
  }
  Share.shareSingle(options).then(res => {
    console.log('res=====', res);
  }).catch(e => {
    console.log('e========'.e);
  });
};

const LikeBlock = props => {
  const {auth} = useStores();
  const [isLike, setIsLike] = useState(false);
  const setStatus = async () => {
    try {
      if (auth.loginState) {
        console.log('set============', auth.token);
        axios.get(
          `${config.server}${props.data.like_url}`,
          {
            headers: {
              'Authorization' : `Bearer ${auth.token}`
            }
          }
        ).then(res => {
          console.log('======', res.data);
          if (res.data.err_code === "ERR_OK") {
            setIsLike(res.data.status)
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setIsLike(props.data.starred)
  }, []);
  return <View>
    <TouchableOpacity style={{
      backgroundColor: 'red',
      alignItems: 'center',
      width: 70,
      height: 70,
      justifyContent: 'center',
    }}
                      onPress={() => setStatus()}
    >
      <Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_white_full : Images.icons.ic_heart_white}/>
    </TouchableOpacity>
  </View>
}

const ShareBlock = props => {
  const navigation = useNavigation();
  const {auth, brandData} = useStores();
  const [isLike, setLike] = useState(false);
  const fetchData = async () => {
    auth.loginState || navigation.navigate('Login');
    try {
      console.log('getshardata=========');
      axios.get(
        `${config.server}${props.data.like_url}`,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
          },
        },
      ).then(res => {
        console.log('======', res.data);
        if (res.data.err_code === 'ERR_OK') {
          setLike(res.data.status);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLike(props.data.starred)
  }, []);
  return (
    <View>
      <ShareView>
        <ShareIcon>
          <TouchableOpacity onPress={() => fetchData()}><Image style={{width: ratio < 1.5 ? 70 : 40, height: ratio < 1.5 ? 70 : 40, resizeMode: 'contain'}}
                                                               source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart}/></TouchableOpacity>
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare} style={{marginLeft: 25}}/>*/}
        </ShareIcon>
        <ShareTooltip onWhatsapp={() => shareWhatsapp(brandData.url, props.data.share_url)} onFB={() => shareFacebook(brandData.url, props.data.share_url)} onEmail={() => shareEmail(brandData.url, props.data.share_url)} onTwitter={() => shareTwitter(brandData.url, props.data.share_url)} onLinkedin={() => shareLinkedin(brandData.url, props.data.share_url)}/>
      </ShareView>
    </View>
  );
};

const shareWhatsapp = (shareurl, share_url) => {
  const content = `${share_url}?data=${shareurl}`;
  const phoneNumber = '8618240331746';
  const downloadUrl = isIOS ? 'https://apps.apple.com/it/app/whatsapp-messenger/id310633997' : 'https://play.google.com/store/apps/details?id=com.whatsapp&hl=it';
  // Linking.openURL(`whatsapp://send?text=${text}`)
  const url = `whatsapp://send?text=${content}`;
  if (isIOS) {
    Linking.openURL(url).catch(e => {
      Alert.alert(
        'Your phone does not have whatsapp',
        'Do you want to install whatsapp?',
        [
          {
            text: 'Install Whatsapp',
            onPress: () => Linking.openURL(downloadUrl),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    });
  } else {
    Linking.canOpenURL(url).then(supported => {
      console.log('supported======', supported);
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
        Alert.alert(
          'Your phone does not have whatsapp',
          'Do you want to install whatsapp?',
          [
            {
              text: 'Install Whatsapp',
              onPress: () => Linking.openURL(downloadUrl),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  // const content = `${share_url}?data=${shareurl}`;
  // const options = {
  //   title: 'Bicklive',
  //   message: 'Bicilive',
  //   social: Share.Social.WHATSAPP,
  //   url: content,
  // }
  // Share.shareSingle(options).then(res => {
  //   console.log('res=====', res);
  // }).catch(e => {
  //   console.log('e========'.e);
  // });

};

const shareEmail = (url, share_url) => {
  const content = `${share_url}?data=${url}`;
  const options = {
    title: 'Bicklive',
    message: 'Bicilive',
    social: Share.Social.EMAIL,
    url: content,
  }
  Share.shareSingle(options).then(res => {
    console.log('res=====', res);
  }).catch(e => {
    console.log('e========', e);
  });
};

const shareTwitter = (url, share_url) => {
  const content = `${share_url}?data=${url}`;
  const options = {
    title: 'Bicklive',
    message: 'Bicilive',
    social: Share.Social.TWITTER,
    url: content,
  };
  Share.shareSingle(options).then(res => {
    console.log('res=====', res);
  }).catch(e => {
    console.log('e========', e);
  });
};

const AdBlock = props => {
  const navigation = useNavigation();
  const {web} = useStores();
  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer');
  };
  return <View><Divider size={30}/><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image style={{width: Dimensions.get('window').width - scale(20), height: (Dimensions.get('window').width - scale(20))/3, resizeMode: 'contain'}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>
};
const BrandPagePremium = props => {
  const navigation = useNavigation();
  const {brandData, bikeData, hud, auth} = useStores();


  useEffect(() => {
    if (props.route.params){
      const {url} = props.route.params;
      // console.log('url-[-----', url.split('?')[0].substring(7));
      analytics().setCurrentScreen(url.split('?')[0].substring(7));
    }

  });

  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url, brandData.url, auth.token);
    navigation.navigate('Bike',{url: url});
  }

  if (brandData.isLoading) {
    hud.show()
  } else {
    if (brandData.errorIf) {
      return <ErrorView/>
    } else {
      hud.hide()
      const uiData = toJS(brandData.data);
      let titleData = {};
      if (uiData[0].id === "TITLE") {
        titleData = uiData.shift();
      }
      return (
        <View style={{backgroundColor: themeProp('colorSecondary'), flex: 1}}>
          <Header>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
              <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                     style={{
                       position: 'absolute',
                       left: 0,
                       width: isIOS ? scale(35) : scale(37),
                       height: isIOS ? verticalScale(19) : verticalScale(23),
                       resizeMode: 'contain',
                       marginTop: verticalScale(14),
                     }}/>
              <Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight : ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}>BRAND PAGE</Text>
            </TouchableOpacity>
          </Header>
        <Container>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            {Object.keys(titleData).length !== 0 && <TitleText color={get(titleData, 'colore', '#000000')}>{get(titleData, 'titolo', 'KOGA')}</TitleText>}
            {uiData.map((item, index) => {
              if (item.id === "TITLE") return  <View><Divider size={-10}/><CategoryText color={item.colore}>{item.titolo}</CategoryText></View>
              if (item.id === "SHARE_BLOCK") return <ShareBlock data={item}/>
              if (item.id === "EXPANDIBLE_WRAPPER_BADGE") return <View><Expandible_Wrapper key={index} data={item}/><Divider size={5}/></View>
              if (item.id === "IMAGE_REEL") return <ImageReel key={`key${index}`} data={item}/>
              if (item.id === "BIKE_RESUME_SMALL") return <View><ListBikeInfo key={index} data={item} goToBike={goToBike} referer={brandData.url}/></View>
              if (item.id === "BIKE_RESUME_BIG") return <View><Divider size={30}/><MainBikeInfo key={index} data={item} goToBike={goToBike} referer={brandData.url}/><Divider size={60}/></View>
              if (item.id === "BRAND_LOGO_BIG")
                return <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{width: 200, height: 200, resizeMode: 'contain', marginTop: -30}}
                    source={{uri: get(item, 'img', 'http://')}}/>
                  {/*<Image width={'100%'} height={'100%'} source={Images.background.haibike_lg} />*/}
                  <Text style={{color: themeProp('colorDescription'), fontSize: 15, marginTop: -30, fontFamily: UniSansBook,lineHeight: 20}}>
                    {item.text}
                  </Text>
                </View>
              if (item.id === 'AD_BANNER_ENGAGE') {
                return <AdBlock data={item}/>
              }
              if (item.id === 'PAGED_SLIDER') {
                return <View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>
              }
            })}
            <Divider size={30} />
          </View>
        </Container>
        </View>
      );
    }
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(50)}
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
  font-size: ${props => props.size}
  font-family: ${themeProp('fontUniHeavy')}
  margin-top: ${isIOS ? '5px' : 0}
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

const CategoryImage = styled(Image)`
  margin-top: 20px
  width: ${moderateScale(105)};
  height: ${moderateScale(95)};
  resize-mode: contain;
  border-width: 1;
  border-color: #ebebeb
`;

export default observer(BrandPagePremium);
