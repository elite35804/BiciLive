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
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
  LoginModal
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

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const shareLinkWithShareDialog = () => {
  const shareLinkContent = {
    contentType: 'link',
    contentUrl: 'http://biciapp.sepisolutions.com/z-content/images/ebike/r-raymon/wfmXeuPBAWf1QiZijXxa4UlqdtnKgNeG_320.jpg',
    contentDescription: 'Facebook sharing is easy!'
  };
  ShareDialog.canShow(shareLinkContent).then(
    function(canShow) {
      if (canShow) {
        return ShareDialog.show(shareLinkContent);
      }
    }
  ).then(
    function(result) {
      if (result.isCancelled) {
        alert('Share cancelled');
      } else {
        alert('Share success with postId: ' + result.postId);
      }
    },
    function(error) {
      alert('Share fail with error: ' + error);
    }
  );
}
const BrandLogo = props => {
  const {brandData} = useStores();
  const goToBrand = (url) => {
    brandData.clearData();
    brandData.getData(url);
    Actions.BrandPagePremium();
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

const ShareBlock = props => {
  const [isLike, setLike] = useState(false);
  return (
    <View>
      <ShareView>
        <ShareIcon>
          <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'}
                                                                    source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart}/></TouchableOpacity>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare} style={{marginLeft: 25}}/>
        </ShareIcon>
        <ShareTooltip onFB={() => shareLinkWithShareDialog()}/>
      </ShareView>
    </View>
  );
};

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
          marginTop: -1,
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
          marginTop: -1,
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

const RelatedElements = (item, index) => {
  const {bikeData} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url);
    Actions.BikePagePremium();
  };
  return (
    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
      {item.map((item0, index) =>
        <View key={index} style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
          <TouchableOpacity onPress={() => goToBike(item0.url)}><Image style={{width: '100%', height: 60}}
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
      <View style={{height: 180}}>
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
  const {web} = useStores();
  const openWebViewer = (url) => {
    web.url = url;
    Actions.WebViewer();
  };
  return <View><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image style={{width: '100%', height: 130}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>
};

const RenderElements = props => {
  // console.log(props);
  const {auth} = useStores();
  const uiData = props.uiData;
  const items = [];
  let i = 0;
  uiData.forEach((item, index) => {
    if (item.id === 'BRAND_LOGO_SMALL') {
      items.push(<BrandLogo key={`key${index}`} data={item}/>);
    }
    if (item.id === 'ADV_RESUME_BIG') {
      items.push(<View><AdvResumeBig isBack={true} productIf={true} style={{marginTop: '20px'}} key={`key${index}`}
                                     data={item}/><Divider size={-40}/></View>);
    }
    if (item.id === 'TITLE') {
      items.push(<View><Title key={`key${index}`} color={get(item, 'colore')}>{item.titolo}</Title><SubTitle1
        color={get(item, 'sub_color', '#ffffff')}>{item.sub}</SubTitle1><Divider size={-25}/></View>);
    }
    if (item.id === 'TITLED_TEXT') {
      items.push(<DetailMore key={index} title={item.title} desc={item.text} title_color={item.title_color}
                             text_color={item.text_color}/>);
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
              fontSize: 15,
              color: 'white',
              fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
              marginHorizontal: 10,
            }}>ANTERIORE</Text>
          </View>
          <View style={{
            backgroundColor: '#333333',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            paddingTop: 5,
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
          <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 200, paddingTop: 15, paddingHorizontal: 5}}>
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
              }}>{item.ant_ruota}</Text>
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
              fontSize: 15,
              color: 'white',
              fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
              marginHorizontal: 10,
            }}>POSTERIORE</Text>
          </View>
          <View style={{
            backgroundColor: '#333333',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            paddingTop: 5,
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
          <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 200, paddingTop: 15, paddingHorizontal: 5}}>
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
              }}>{item.post_gomma}</Text>
          </View>
        </View>
      </SwipeView><Divider size={-30}/></View>);
    }
    if (item.id === 'SHARE_BLOCK') {
      i++;
      if (i === 2) {
        items.push(
          <View>
            <ShareBlock key={`key${index}`} data={item}/>
          </View>,
        );
      } else {
        items.push(<ShareBlock key={`key${index}`} data={item}/>);
      }

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
    if (item.id === 'SIGN_IN_PLACEHOLDER' && !auth.loginState) {
      items.push(<LoginModal data={item}/>);
    }
    items.push(<Divider key={`divider${index}`} size={20}/>);
  });
  return items;
};

const BikePagePremium = props => {
  const {bikeData} = useStores();


  if (bikeData.isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><DefaultImage
      style={{width: moderateScale(70), height: moderateScale(70), resizeMode: 'contain', marginTop: 14}}
      source={Images.icons.ic_loading}/></View>;
  } else {
    if (bikeData.errorIf) {
      return <ErrorView/>
    } else {
      const uiData = toJS(bikeData.data);
      return (
        <View>
          <Header>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => Actions.pop()}>
              <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                     style={{
                       position: 'absolute',
                       left: 0,
                       width: scale(37),
                       height: verticalScale(23),
                       resizeMode: 'contain',
                       marginTop: verticalScale(14),
                     }}/>
              <Text style={{textAlign: 'center', fontSize: 19, lineHeight: 49}}>SCHEDA BICI</Text>
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
    margin-bottom: 10px;
    paddingHorizontal: ${scale(8)} 
    marginTop: ${verticalScale(50)}
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
