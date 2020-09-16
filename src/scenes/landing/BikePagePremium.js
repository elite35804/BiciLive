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
  Modal,
  Alert, Dimensions,
} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import ShareTooltip from 'components/controls/ShareTooltip';
import StepIndicator from 'react-native-step-indicator';
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
  AdvResumeBig,
  ErrorView,
  LoginModal,
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {UniSansBold, UniSansBook} from '../../utils/fontFamily';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import Tooltip from 'rn-tooltip';
import CustomTooltip from 'components/controls/CustomTooltip';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RNInstallReferrer from 'react-native-install-referrer';
import config from '../../config/Config';
import Share from "react-native-share";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';

const shareFacebook = (url, share_url) => {
  console.log('share url========', url, share_url);
  const content = `${share_url}?data=${url}`;
  console.log('facebook shar url=====', content);
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
  // const shareURL = `${share_url}?data=${url}`
  // const emailURL = `mailto:support@example.com?subject=Bicilive&body=${shareURL}`;
  // Linking.canOpenURL(emailURL).then(supported => {
  //   console.log('supported======', supported);
  //   if (!supported) {
  //     console.log('Can\'t handle url: ' + emailURL);
  //   } else {
  //     return Linking.openURL(emailURL);
  //   }
  // }).catch(err => console.error('An error occurred', err));
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
const BrandLogo = props => {
  const navigation = useNavigation();
  const {brandData, bikeData, auth} = useStores();
  const goToBrand = (url) => {
    brandData.clearData();
    brandData.getData(url, bikeData.url, auth.token);
    navigation.navigate('Brand');
  };
  return (
    <View>
      <TouchableOpacity onPress={() => goToBrand(props.data.url)}>
        <TitleView>
          <Image style={{width: '35%', height: '100%'}} source={{uri: props.data.img}}/>

          <TitleView>
            <View style={{marginRight: 10}}>
              <Text style={{
                color: themeProp('colorDescription'),
                fontSize: moderateScale(14, 0.2),
                fontFamily: UniSansBook,
              }}>TUTTE LE EBIKE</Text>
              <SubTitleView>
                <Text style={{
                  color: themeProp('colorDescription'),
                  fontSize: moderateScale(14, 0.2),
                  fontFamily: UniSansBook,
                }}>DI</Text>
                <Text style={{
                  color: themeProp('colorDescription'),
                  fontSize: moderateScale(14, 0.2),
                  fontFamily: UniSansBold,
                }}> {get(props, 'data.brand', '')}</Text>
              </SubTitleView>
            </View>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_right} style={{marginRight: 10}}/>
            <BadgeView>
              <Title size={props.data.count > 99 ? 25 : 30} color={themeProp('colorSecondary')}
                     width={moderateScale(15)}>{props.data.count}</Title>
            </BadgeView>
          </TitleView>
        </TitleView>
      </TouchableOpacity>
      <Divider size={-10}/>
      <DivideLine/>
      <Divider size={-10}/>
    </View>
  );
};

const ShareBlock = observer(props => {
  const navigation = useNavigation();
  const {auth, bikeData} = useStores();
  const fetchData = async () => {
    auth.loginState || navigation.navigate('Login');
    try {
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
          bikeData.setIsLike(res.data.status)
        }
      });
    } catch (e) {
      console.log(e);
    }
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
      console.log('e========', e);
    });
  };

  useEffect(() => {
    console.log('starred=======', props.data.starred);
    bikeData.setIsLike(props.data.starred)
  }, []);

  return <View><ShareView>
    <TouchableOpacity onPress={() => fetchData()}><Image style={{width: ratio < 1.5 ? 70 : 40, height: ratio < 1.5 ? 70 : 40, resizeMode: 'contain'}} source={bikeData.isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
    <ShareTooltip onWhatsapp={() => shareWhatsapp(bikeData.url, props.data.share_url)} onFB={() => shareFacebook(bikeData.url, props.data.share_url)} onEmail={() => shareEmail(bikeData.url, props.data.share_url)} onTwitter={() => shareTwitter(bikeData.url, props.data.share_url)} onLinkedin={() => shareLinkedin(bikeData.url, props.data.share_url)}/>
  </ShareView>
    <Divider size={15}/>
  </View>
});

const IconDescriptionGroup = props => {
  return (
    <SwipeView>
      <ItemView>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 5,
          paddingTop: 5,
          backgroundColor: get(props, 'data.bg_color1', ''),
        }}>
          <CustomTooltip tooltipText={get(props, 'data.infobox1', '')}/>

        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color1', ''),
        }}>
          <Image resizeMode="contain" source={{uri: get(props, 'data.icona1', '')}}
                 style={{width: 100, height: 70, marginBottom: 20}}/>
          {/*<Image resizeMode="contain" source={props.order === 1 ? Images.icons.ic_light : Images.icons.ic_volt}*/}
          {/*style={{width: 100, height: 70, marginBottom: 20}}/>*/}
          <ItemText color={get(props, 'data.color1', '#000000')}>{get(props, 'data.titolo1')}</ItemText>
          <View style={{marginTop: verticalScale(-7)}}/>
          <ItemSymbol color={get(props, 'data.color1', '#000000')}>{get(props, 'data.subtitolo1')}</ItemSymbol>
        </View>
      </ItemView>
      <ItemView>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 5,
          paddingTop: 5,
          backgroundColor: get(props, 'data.bg_color2', ''),
        }}>
          <CustomTooltip tooltipText={get(props, 'data.infobox2', '')}/>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color2', ''),
        }}>
          <Image source={{uri: get(props, 'data.icona2', '')}}
                 style={{width: 100, height: 70, marginBottom: 20, resizeMode: 'contain'}}/>
          {/*<Image width={'100%'} height={'100%'} resizeMode="contain" source={props.order === 1 ? Images.icons.ic_graph_lg : Images.icons.ic_battery_lg}*/}
          {/*style={{marginBottom: 20, height: 70}}/>*/}
          <ItemText color={get(props, 'data.color2', '#000000')}>{get(props, 'data.titolo2')}</ItemText>
          <View style={{marginTop: -7}}/>
          <ItemSymbol color={get(props, 'data.color2', '#000000')}>{get(props, 'data.subtitolo2')}</ItemSymbol>
        </View>
      </ItemView>
      <ItemView>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 5,
          paddingTop: 5,
          backgroundColor: get(props, 'data.bg_color3', ''),
          marginTop: -1,
        }}>
          <CustomTooltip tooltipText={get(props, 'data.infobox3', '')}/>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color3', ''),
        }}>
          <Image source={{uri: get(props, 'data.icona3', '')}}
                 style={{width: 100, height: 70, marginBottom: 20, resizeMode: 'contain'}}/>
          <ItemText color={get(props, 'data.color3', '#000000')}>{get(props, 'data.titolo3')}</ItemText>
          <View style={{marginTop: -7}}/>
          <ItemSymbol color={get(props, 'data.color3', '#000000')}>{get(props, 'data.subtitolo3')}</ItemSymbol>
        </View>
      </ItemView>
    </SwipeView>
  );
};
const setAnalytics = (url) => {
  analytics().logEvent('related_product', {url: url})
    .then(res=>{
      console.log('result============', res);
    })
    .catch(error => {
      console.log("---------------------------------------Error occured-------------------", error);
    });
};
const RelatedElements = (item, index) => {
  const navigation = useNavigation();
  const {bikeData, auth} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url, bikeData.url, auth.token);
    navigation.navigate('Product', {url: url});
  };
  return (
    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
      {item.map((item0, index) =>
        <View key={index} style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
          <TouchableOpacity onPress={() => {setAnalytics(item0.url);goToBike(item0.url)}}><Image
            style={{width: '100%', height: ratio < 1.5 ? 100 : 60, resizeMode: 'contain'}}
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
          }}
                numberOfLines={2}
          >{item0.modello}</Text>
        </View>,
      )}
    </View>
  );
};
const Stepper = observer(props => {
  const {swiperState} = useStores();
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
    currentPosition={swiperState.position}
    label={label}
    onPress={p => swiperState.position !== p && props.onPress(p - swiperState.position)}
  />;
});
const RelatedGroup = props => {
  const {data} = props;
  const {swiperState} = useStores();
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
      <View style={{height: ratio < 1.5 ? 210 : 180}}>
        <Swiper ref={_swiper} showsPagination={false} index={swiperState.position} autoplay={true}
                autoplayTimeout={4}
                onIndexChanged={(index) => swiperState.setPosition(index)}>
          {groupedArray.map((item, index) => RelatedElements(item, index))}
        </Swiper>
        <View style={{width: '115%', alignSelf: 'center'}}>
          <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
        </View>
      </View>
    </View>
  );

};

const openUrl = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Don\'t know how to open URI: ' + this.props.url);
    }
  });
};

const AdBlock = props => {
  const navigation = useNavigation();
  const {web} = useStores();
  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer');
  };
  return <View><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image
    style={{width: Dimensions.get('window').width - scale(20), height: (Dimensions.get('window').width - scale(20))/3, resizeMode: 'contain'}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>;
};

const TitleContainer = props => {
  return <View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Title color={get(props, 'data.colore')}>{props.data.titolo}</Title>
      {props.data.infobox && <CustomTooltip from="category" tooltipText={get(props, 'data.infobox', 'No Info')}/>}
    </View>
    <SubTitle1 color={get(props, 'data.sub_color', '#ffffff')}>{props.data.sub}</SubTitle1><Divider size={-25}/>
  </View>
};

const RenderElements = props => {
  // console.log(props);
  const {auth, bikeData} = useStores();
  const uiData = props.uiData;
  const items = [];
  let i = 0;
  uiData.forEach((item, index) => {
    if (item.id === 'BRAND_LOGO_SMALL') {
      items.push(<BrandLogo key={`key${index}`} data={item}/>);
    }
    if (item.id === 'ADV_RESUME_BIG') {
      items.push(<View><AdvResumeBig isBack={true} productIf={true} style={{marginTop: '20px'}} key={`key${index}`}
                                     data={item} referer={bikeData.url}/><Divider size={-40}/></View>);
    }
    if (item.id === 'TITLE') {
      items.push(<TitleContainer key={`key${index}`} data={item}/>)
    }
    if (item.id === 'TITLED_TEXT') {
      items.push(<DetailMore key={index} data={item}/>);
    }
    if (item.id === 'WHEEL_DETAIL_GROUP') {
      items.push(<View><Divider size={-18}/><SwipeView>
        <View style={{width: '48%'}}>
          <View style={{
            backgroundColor: item.bg_color,
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
            paddingTop: 5,
          }}>
            <Text style={{
              fontSize: ratio < 1.5 ? 20 : 15,
              color: 'white',
              fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
              marginHorizontal: 10,
            }}>ANTERIORE</Text>
          </View>
          <View style={{
            backgroundColor: '#333333',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0,
            paddingVertical: 5,
          }}>
            <Text
              style={{
                fontSize: 60,
                color: 'white',
                fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold',
              }}>{item.ant_diametro}
            </Text>
            <Text style={{
              fontSize: 17,
              color: 'white',
              fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
              marginTop: -10,
            }}>POLLICI</Text>
          </View>
          <View style={{
            backgroundColor: '#F2F2F2',
            alignItems: 'center',
            height : 200,
            paddingBottom: 10,
            paddingTop: 15,
            paddingHorizontal: 5,
          }}>
            <Text style={{
              fontSize: 16,
              color: item.bg_color,
              fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
              marginTop: 3,
            }}>RUOTA</Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
                marginTop: 7,
                textAlign: 'center',
              }} numberOfLines={2}>{item.ant_ruota}</Text>
            <Text style={{
              fontSize: 16,
              color: item.bg_color,
              fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
              marginTop: 10,
            }}>GOMMA</Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
                marginTop: 7,
                textAlign: 'center',
              }}>{item.ant_gomma}</Text>
          </View>
        </View>
        <View style={{width: '48%'}}>
          <View style={{
            backgroundColor: item.bg_color,
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
            paddingTop: 5,
          }}>
            <Text style={{
              fontSize: ratio < 1.5 ? 20 : 15,
              color: 'white',
              fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
              marginHorizontal: 10,
            }}>POSTERIORE</Text>
          </View>
          <View style={{
            backgroundColor: '#333333',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0,
            paddingVertical: 5,
          }}>
            <Text
              style={{
                fontSize: 60,
                color: 'white',
                fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold',
              }}>{item.post_diametro}</Text>
            <Text style={{
              fontSize: 17,
              color: 'white',
              fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
              marginTop: -10,
            }}>POLLICI</Text>
          </View>
          <View style={{
            backgroundColor: '#F2F2F2',
            alignItems: 'center',
            height : 200,
            paddingBottom: 10,
            paddingTop: 15,
            paddingHorizontal: 5,
          }}>
            <Text style={{
              fontSize: 16,
              color: item.bg_color,
              fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
              marginTop: 3,
            }}>RUOTA</Text>
            <Text style={{
              fontSize: 20,
              color: 'black',
              fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
              marginTop: 7,
              textAlign: 'center',
            }} numberOfLines={2}>{item.post_ruota}</Text>
            <Text style={{
              fontSize: 16,
              color: item.bg_color,
              fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
              marginTop: 10,
            }}>GOMMA</Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
                marginTop: 7,
                textAlign: 'center',
              }}>{item.post_gomma}</Text>
          </View>
        </View>
      </SwipeView><Divider size={-30}/></View>);
    }
    if (item.id === 'SHARE_BLOCK') {
      items.push(
        <View>
          <ShareBlock key={`key${index}`} data={item}/>
        </View>,
      );
    }
    if (item.id === 'ICON_DESCRIPTION_GROUP') {
      items.push(<IconDescriptionGroup key={`key${index}`} data={item}/>);
    }
    if (item.id === 'RELATED_GROUP') {
      items.push(<RelatedGroup key={`key${index}`} data={item}/>);
    }
    if (item.id === 'AD_BANNER_ENGAGE') {
      items.push(<View><Divider size={23}/><AdBlock data={item}/></View>);
    }
    if (item.id === 'SIGN_IN_PLACEHOLDER') {
      items.push(<LoginModal data={item} referer={bikeData.url}/>);
    }
    items.push(<Divider key={`divider${index}`} size={20}/>);
  });
  return items;
};

const BikePagePremium = props => {
  const navigation = useNavigation();
  const {bikeData, brandData, hud} = useStores();

  const navigate = url => {
    console.log('bike deep link==========', url);
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

  useEffect(() => {
    if (props.route.params){
      const {url} = props.route.params;
      // console.log('url-[-----', url.split('?')[0].substring(7));
      analytics().setCurrentScreen(url.split('?')[0].substring(7));
    }
  });

  if (bikeData.isLoading) {
    hud.show()
  } else {
    if (bikeData.errorIf) {
      return <ErrorView/>;
    } else {
      hud.hide();
      const uiData = toJS(bikeData.data);
      return (
        <View style={{flex: 1}}>
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
              <Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight: ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}>SCHEDA BICI</Text>
            </TouchableOpacity>
          </Header>

          <Container>
            <RenderElements uiData={uiData}/>
          </Container>
        </View>
      );

    }
  }
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-bottom: 10px;
    paddingHorizontal: ${scale(8)}
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(50)}
    paddingTop: ${verticalScale(10)}
`;

const BadgeView = styled(View)`
  width: ${moderateScale(44, 0.4)}
  height: ${moderateScale(44, 0.4)}
  border-radius: ${moderateScale(22, 0.4)}
  justify-content: center
  align-items: center
  background-color: red
  margin-left : -3px
`;

const TitleView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`;
const SubTitleView = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center
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
  margin-top: -10px
  font-size: ${moderateScale(43)};
  color: ${props => props.color}
  font-family: ${themeProp('fontUniSemiBold')}
`;

const ItemSymbol = styled(Text)`
  font-size: ${moderateScale(19)};
  color: ${props => props.color}
  font-family: ${themeProp('fontUniBook')}
  margin-bottom: 10px
`;

const ItemView = styled(View)`
  border-top-width: 7px;
  border-top-color: ${themeProp('colorText')};
  background-color: #F2F2F2;
  width: 32%
`;

const SwipeView = styled(View)`
  margin-top: 12px
  flex-direction: row;
  justify-content: space-between
`;

const DescText = styled(Text)`
  font-size: 23px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniBook')};
`;

const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
`;

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
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`;

const Title = styled(Text)`
  margin-top: ${isIOS ? ratio < 1.5 ? '15px' : '10px' : '0px'}
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: ${props => props.size ? moderateScale(props.size) : moderateScale(30)}
`;

const SubTitle1 = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniRegular')}
  font-size: 20px;
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


export default observer(BikePagePremium);
