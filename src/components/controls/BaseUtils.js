import StepIndicator from 'react-native-step-indicator';
import React, {useEffect, useState, useRef} from 'react';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import HTML from 'react-native-render-html';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  Image as DefaultImage, ImageBackground, TextProps as ellipsizeMode,
} from 'react-native';
import Images from 'res/Images';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {get} from 'lodash';
import {useStores} from 'hooks/Utils';
import ImageView from 'react-native-image-viewing';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CustomTooltip from './CustomTooltip';
import config from '../../config/Config';
import ZoomableImage from './ZoomableImage';
import analytics from '@react-native-firebase/analytics';
import Colors from '../../res/Colors';
import {openLink} from '../../utils/NumberUtil';
// import ImageZoom from 'react-native-image-pan-zoom';
// import ZoomableImage from 'components/controls/ZoomableImage';
// import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const oswald_bold = isIOS ? 'Oswald-Bold' : 'oswald_bold';
const label = ['', '', '', '', ''];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  stepIndicatorCurrentColor: themeProp('colorText'),
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 13,
  stepStrokeCurrentColor: themeProp('colorBorder'),
  stepStrokeWidth: 13,
  stepStrokeFinishedColor: '#c9c3c5',
  stepStrokeUnFinishedColor: '#c9c3c5',
  separatorFinishedColor: themeProp('colorBorder'),
  separatorUnFinishedColor: '#c9c3c5',
};

const Step = (props) => <View style={{width: '115%', alignSelf: 'center'}}><StepIndicator customStyles={customStyles}
                                                                                          currentPosition={3}
                                                                                          labels={label}/></View>;

const Divider = (props) => <View style={{marginBottom: props.size}}/>;

const CheckBox = (props) => (
  <SelectView height={get(props, 'height', '47px')} onPress={props.onPress}>
    {props.checked ? <SelectBoxUnchecked borderColor={get(props, 'borderColor', '#c9c3c5')}><SelectDot
        color={get(props, 'color', '#53DCD0')}/></SelectBoxUnchecked> :
      <SelectBoxUnchecked borderColor={get(props, 'borderColor', '#c9c3c5')}/>}
    {/*<SelectText color={get(props, 'textColor', '#909090')}>{props.text}</SelectText>*/}
    <HTML onLinkPress={openLink} html={props.text} containerStyle={{marginLeft: 10, marginTop: isIOS ? 8 : 1}}
          baseFontStyle={{color: get(props, 'textColor', '#909090'), fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', fontSize:18}}/>
  </SelectView>
);

const MainBikeInfo = (props) => {
  const navigation = useNavigation();
  const {bikeData, auth} = useStores();
  const goToBike = url => {
    props.setAnalytics && props.setAnalytics();
    bikeData.clearData();
    bikeData.getData(url, get(props, 'referer', ''), auth.token);
    navigation.navigate('Product', {url: url});
  };
  return (
    <MainInfo>
      <TouchableOpacity onPress={() => goToBike(get(props, 'data.url', ''))}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {props.data && <Image resizeMode="contain"
                                source={{uri: `${config.server}${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
                                style={{width: '95%', height: ratio < 1.5 ? 400 :230}}/>}
          {!props.data &&
          <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.background.bike_logo1}
                 style={{width: '95%', height: 230}}/>}
          {!props.isBack ? <Image resizeMode="stretch" source={Images.icons.ic_badge_empty}
                                  style={{position: 'absolute', right: 0, top: 0, width: 50, height: 50}}/> : <View/>
          }
        </View>
        <View style={{marginLeft: 5}}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <TypeView bg_color={'#' + get(props, 'data.color', 'D75A2B')}><Type
              size={moderateScale(14)}>{get(props, 'data.categoria', 'eCity')}</Type></TypeView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
              <Sort size={moderateScale(21)}>{get(props, 'data.anno', '2020')}</Sort>
            </View>
          </View>
          <Divider size={isIOS ? ratio < 1.5 ? moderateScale(-3) : moderateScale(-8) : moderateScale(-11)}/>
          <Sort size={'23px'}>{get(props, 'data.brand', 'ASKOLL')}</Sort>
          <Divider size={ratio < 1.5 ? moderateScale(-20) : moderateScale(-10)}/>
          <NameView>
            {/*<Name numberOfLines={1} color={'#' + get(props, 'data.color', 'D75A2B')}*/}
                  {/*size={'38px'}>{get(props, 'data.modello', 'EB4')}</Name>*/}
            <HTML onLinkPress={openLink} html={`<p>${get(props, 'data.modello', 'EB4')}</p>`}
                  renderers={{p: (_, children)=><Text numberOfLines={1}>{children}</Text>}}
                  containerStyle={{marginTop: isIOS ? -2 : -5, marginRight: 5,}}
                  baseFontStyle={{fontFamily: oswald_bold, color: '#' + get(props, 'data.color', 'D75A2B'), fontSize: 38, lineHeight: ratio < 1.5 ? 80 : 42}}/>
            {/*<Image width={20} height={20} source={Images.icons.arrow_right}/>*/}
          </NameView>
          <Sort style={{marginTop: isIOS ? moderateScale(-12) : moderateScale(-15)}}
                size={moderateScale(21)}>{get(props, 'data.prezzo', '1390')}</Sort>
          <Text style={{
            marginTop: 3,
            color: '#' + get(props, 'data.color', 'D75A2B'),
            fontFamily: oswald_bold,
            fontSize: 11,
          }}>MOTORE</Text>
          <View style={{marginTop: -5, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{
              color: '#909090',
              fontFamily: oswald_bold,
              fontSize: 13,
            }}>{get(props, 'data.motore', 'BAFANG, G20 250D')}</Text>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', marginRight: 20}}>
                <View style={{marginTop: 10, marginRight: 3}}>
                  <Image style={{width: 15, height: 20, resizeMode: 'contain'}}
                         source={{uri: get(props, 'data.img_nm', '')}}/>
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>*/}
                </View>
                <Sort size={'23px'}>{get(props, 'data.coppia', '40')}</Sort>
                <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Nm</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 10, marginRight: 3}}>
                  <Image style={{width: 15, height: 20, resizeMode: 'contain'}}
                         source={{uri: get(props, 'data.img_wh', '')}}/>
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_battery}/>*/}
                </View>
                <Sort size={'23px'}>{get(props, 'data.batteria', '625')}</Sort>
                <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Wh</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    </MainInfo>
  );
};

const ListBikeInfo = (props) => {
  const navigation = useNavigation();
  const {bikeData, auth} = useStores();
  const goToBike = url => {
    props.setAnalytics && props.setAnalytics();
    bikeData.clearData();
    bikeData.getData(url, get(props, 'referer', ''), auth.token);
    navigation.navigate('Product', {url: url});
  };
  return (
    <MainInfo>
      <TouchableOpacity onPress={() => goToBike(get(props, 'data.url', ''))}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: `${config.server}${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
            style={{width: '45%', height: ratio < 1.5 ? 200 : 80, resizeMode: 'contain'}}/>
          {/*<Image*/}
          {/*source={Images.background.bike_logo1} style={{width: '45%', height: 80, resizeMode: 'contain'}}/>*/}
          <View width={'55%'}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -8, width: '100%'}}>
              <View style={{marginTop: 8}}>
                <TypeView bg_color={'#' + get(props, 'data.color', 'D75A2B')}><Type
                  size={ratio < 1.5 ? '20px' : '10px'}>{get(props, 'data.categoria', 'eCity')}</Type></TypeView>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: isIOS ? 15 : 5,
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
                <Image width={40} height={40} source={Images.icons.ic_calendar}
                       style={{marginRight: moderateScale(5, 0.9)}}/>
                <Sort size={moderateScale(20)}>2020</Sort>
              </View>
            </View>
            <View style={{marginTop: isIOS ? -1 : -3, marginBottom: isIOS ? 3 : 0}}>
              <Sort size={ratio < 1.5 ? '25px' : '14px'}>{get(props, 'data.brand', 'HIBIKER')}</Sort>
            </View>
            <Divider size={ratio < 1.5 ? -50 : -23}/>
            <NameView>
              <Name color={'#' + get(props, 'data.color', 'D75A2B')} numberOfLines={1}
                    size={'23px'}>{get(props, 'data.modello', 'XDURO NDURO 3.5')}</Name>
              <Image width={10} height={10} source={Images.icons.arrow_right} style={{width: 5, height: 9}}/>
            </NameView>
            <View style={{marginTop: isIOS ? ratio < 1.5 ? -30 : -11 : -15}}/>
            <Sort size={'23px'}>{get(props, 'data.prezzo', '1390')}</Sort>
          </View>
        </View>
        <View style={{paddingLeft: 5, marginTop: isIOS ? 5 : 0}}>
          <Text
            style={{
              color: '#' + get(props, 'data.color', 'D75A2B'),
              fontFamily: oswald_bold,
              fontSize: ratio < 1.5 ? 20 :11,
            }}>MOTORE</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: -5}}>
            <Text style={{
              color: '#909090',
              fontFamily: oswald_bold,
              fontSize: ratio < 1.5 ? 23 : 13,
            }}>{get(props, 'data.motore', 'Bosh, Performance CX')}</Text>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 5}}>
              <View style={{flexDirection: 'row', marginRight: 20}}>
                <View style={{marginTop: 10, marginRight: 3}}>
                  <Image style={{width: ratio < 1.5 ? 25 : 15, height: ratio < 1.5 ? 30 : 20, resizeMode: 'contain'}}
                         source={{uri: get(props, 'data.img_nm', '')}}/>
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>*/}
                </View>
                <Sort size={ratio < 1.5 ? '30px' : '23px'}>{get(props, 'data.coppia', '75')}</Sort>
                <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: ratio < 1.5 ? 25 : 15, marginTop: ratio < 1.5 ? 5 : 10}}>Nm</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 10, marginRight: 3}}>
                  <Image style={{width: ratio < 1.5 ? 25 : 15, height: ratio < 1.5 ? 30 : 20, resizeMode: 'contain'}}
                         source={{uri: get(props, 'data.img_wh', '')}}/>
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_battery}/>*/}
                </View>
                <Sort size={ratio < 1.5 ? '30px' : '23px'}>{get(props, 'data.batteria', '625')}</Sort>
                <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: ratio < 1.5 ? 25 : 15, marginTop: ratio < 1.5 ? 5 : 10}}>Wh</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MainInfo>
  );
};

const AdvResumeBig = (props) => {
  const navigation = useNavigation();
  const {bikeData, auth} = useStores();
  const [isVisible, setIsVisible] = React.useState(false);
  const [scale, setScale] = useState(1);
  const goToBike = url => {
    props.setAnalytics && props.setAnalytics();
    bikeData.clearData();
    bikeData.getData(url, get(props, 'referer', ''), auth.token);
    navigation.navigate('Product', {url: url});
  };
  useEffect(() => {
    Image.getSize(config.server + get(props, 'data.immagine_zoom', ''), (w, h) => {
      setScale((height * w / (width * h)).toFixed(1))
    });
  }, []);
  return (
    <View>
      <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="fullScreen"
      onRequestClose={() => {
        setIsVisible(false);
      }}
      >
        <ZoomableImage onClose={() => setIsVisible(false)} scale={scale} imageUrl={get(props, 'data.immagine_zoom', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}/>
      </Modal>

      <MainInfo>
        <TouchableOpacity onPress={() => !props.productIf ? goToBike(props.data.url) : {}}
                          style={{justifyContent: 'center', alignItems: 'center'}}>
          {props.data && <Image resizeMode="contain"
                                source={{uri: `${config.server}${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
                                style={{width: '95%', height: ratio < 1.5 ? 400 : 230}}/>}
          {!props.data &&
          <Image  resizeMode="contain" source={Images.background.bike_logo1}
                 style={{width: '95%', height: 230}}/>}
          {!props.isBack ? <Image resizeMode="stretch" source={Images.icons.ic_badge_empty}
                                  style={{position: 'absolute', right: 0, top: 0, width: 50, height: 50}}/> : <View/>
          }
        </TouchableOpacity>
        {props.productIf ?
          <TouchableOpacity style={{position: 'absolute', right: 0, top: ratio < 1.5 ? 300 : 200}} onPress={() => setIsVisible(true)}><Image
            style={{height: moderateScale(27, 0.8), width: moderateScale(27, 0.8), resizeMode: 'contain'}}
            source={Images.icons.ic_zoom_in}/></TouchableOpacity> : <View/>}
        <View style={{marginLeft: 5}}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <TypeView bg_color={'#' + get(props, 'data.color', 'D75A2B')}>
              <HTML onLinkPress={openLink} html={get(props, 'data.categoria', 'eCity')} baseFontStyle={{fontSize: moderateScale(13), color: '#FFFFFF', fontFamily: oswald_bold}}/>
            </TypeView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
              <HTML onLinkPress={openLink} html={get(props, 'data.anno', '2020')} baseFontStyle={{fontSize: moderateScale(22), color: '#909090', fontFamily: oswald_bold}}/>
            </View>
          </View>
          <Divider size={moderateScale(-11)}/>
          <HTML onLinkPress={openLink} html={get(props, 'data.brand', 'ASKOLL')} baseFontStyle={{fontSize: moderateScale(22), color: '#909090', fontFamily: oswald_bold}}/>
          <Divider size={moderateScale(-24)}/>
          <NameView>
            <HTML onLinkPress={openLink} html={`<p>${get(props, 'data.modello', 'EB4')}</p>`}
                  renderers={{p: (_, children)=><Text numberOfLines={1}>{children}</Text>}}
                  baseFontStyle={{fontFamily: oswald_bold, color: '#' + get(props, 'data.color', 'D75A2B'), fontSize: moderateScale(35)}}/>
          </NameView>
          <Sort style={{marginTop: isIOS ? moderateScale(-12) :moderateScale(-15)}}
                size={moderateScale(22)}>{get(props, 'data.prezzo', '1390')}</Sort>
        </View>
      </MainInfo>
    </View>
  );
};

const ErrorView = props => {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><DefaultImage
    style={{width: moderateScale(200), height: moderateScale(200), resizeMode: 'contain', marginTop: 14}}
    source={Images.icons.ic_oops}/>
    <Text style={{marginTop: 10, fontSize: 17}}>Connessione dati assente</Text>
  </View>;
};

const LoginModal = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {bikeData, auth} = useStores();
  let timer = undefined
  useEffect(() => {
    analytics().setCurrentScreen('Login Modal');
    timer = setTimeout(() => {
      setVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearTimeout(timer)
      };
    },[])
  );

  return <Modal
    animationType="slide"
    visible={visible}
    presentationStyle="fullScreen"
    onRequestClose={() => {
      // Alert.alert("Modal has been closed.");
      navigation.goBack();
    }}
  >
    <View style={{flex: 1}}>
      <LoginBackgroud source={Images.background.guest_blur_img}>
        {/*<TouchableOpacity onPress={() => setVisible(false)}><Text>Close</Text></TouchableOpacity>*/}
        <LoginView>
          <LoginText>Stai utilizzando BiciLive APP come ospite, crea e naviga con il tuo account e scopri tutto di
            questa bici!</LoginText>
          <Divider size={20}/>
          <BlueButton borderColor='#00c6e5' textColor={'#00c6e5'} onPress={() => {
            setVisible(false);
            bikeData.clearData();
            auth.referer= get(props, 'referer', '');
            navigation.replace('Login');
          }}>LOGIN</BlueButton>
          <Divider size={10}/>
          <WhiteButton backgroudColor={'#00c6e5'} onPress={() => {
            setVisible(false);
            auth.referer= get(props, 'referer', '');
            navigation.replace('Register');
          }}>REGISTRATI</WhiteButton>
        </LoginView>
      </LoginBackgroud>
    </View>
  </Modal>;
};

const SingleSelectBox = props => {
  const [value, setValue] = useState(0);
  const onPress = (v) => {
    setValue(v);
    props.onChange(v);
  };
  useEffect(() => {
    setValue(0);
  }, [props.reset]);
  return <View>
    <Divider size={30}/>
    <SubTitle color={'#323232'} size={'10px'}>{props.data.text}</SubTitle>
    <Divider size={10}/>
    {props.data.options.map(item => {
      return <View><Divider size={5}/><CheckBox height={'35px'} textColor='#323232' borderColor={'black'} color={'grey'}
                       checked={value === item.option_value} onPress={() => onPress(item.option_value)}
                             text={item.option_text}/></View>;
    })}
  </View>;
};

const MultiSelectBox = props => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    const temp = [];
    props.data.options.map(item => {
      temp.push({value: item.option_value, text: item.option_text, selected: false});
    });
    setValue(temp);
  }, []);
  useEffect(() => {
    const temp = [];
    props.data.options.map(item => {
      temp.push({value: item.option_value, text: item.option_text, selected: false});
    });
    setValue(temp);
  }, [props.reset]);
  const onPress = data => {
    value.map(v => {
      if (v.value === data) {
        v.selected = !v.selected;
      }
    });
    setValue([...value]);
    const temp = [];
    [...value].map(item => {
      if (item.selected) temp.push(item.value);
    });
    props.onChange(temp);
  };
  return <View>
    <Divider size={30}/>
    <SubTitle color={'#323232'} size={'10px'}>{props.data.text}</SubTitle>
    <Divider size={10}/>
    {value.map(v => (
      <View><Divider size={5}/>
      <CheckBox height={'35px'} textColor='#323232' borderColor={'black'} color={'grey'} checked={v.selected}
                onPress={() => onPress(v.value)} text={v.text}/>
      </View>
    ))}
  </View>;
};

const SubTitle = styled(Text)`
  font-size: 25px;
  color: ${props => props.color};
  font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
  margin-top: ${props => props.size}
  padding-left: 8px;
`;
const MainInfo = styled(View)`
  background-color: #FFFFFF;
  border-left-width: 7px;
  border-left-color: #D8D8D8;
  width: 100%;
`;

const TypeView = styled(View)`
  background-color: ${props => props.bg_color}
  padding-horizontal: 5px;
`;

const Type = styled(Text)`
  color: #FFFFFF;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
`;

const Sort = styled(Text)`
  color: #909090;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
`;

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
  margin-top: ${isIOS ? (ratio < 1.5 ? '20px' : '10px') : '15px'}
`;

const Name = styled(Text)`
  color: ${props => props.color ? props.color : '#D75A2B'};
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
  margin-top: ${isIOS ? '-2px' : '-5px'};
  margin-right: 5px;
  line-height: ${ratio < 1.5 ? '80px' : '42px'}
`;

const SelectView = styled(TouchableOpacity)`
    width: 95%;
    height: ${props => props.height};
    flexDirection: row;
    padding-horizontal: 13px;
    align-items: center
`;

const SelectBoxUnchecked = styled(View)`
    width: 26px;
    height: 26px;
    border-width: 1px;
    border-color: ${props => props.borderColor};
    justify-content: center;
    align-items: center;
`;

const SelectDot = styled(View)`
    background-color: ${props => props.color}
    width: 16px;
    height: 16px;
`;

const SelectText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: ${props => props.color};
    font-size: 18px;
    margin-left: 10px;
    margin-top: ${isIOS ? '8px' : '1px'}
`;

const PriceView = styled(Text)`
  font-size: 40px;
  color: #909090;
  font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
`;

const SymbolView = styled(Text)`
  font-size: 28px;
  color: #909090;
  font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
  margin-top: 8px;
`;

const Header = styled(View)`
  background-color: #f2f2f2;
  position: absolute;
  width: 100%;
  top:0
  height: ${verticalScale(50)}
  margin-top: ${isIOS && ratio > 1.5 ? '30px' : '0px'}
`;

const LoginBackgroud = styled(ImageBackground)`
  flex: 1;
  resize-mode: contain;
  justify-content : center;
`;

const LoginView = styled(View)`
  width: 80%;
  height: 50%;
  background-color: #fff
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20;
  padding: 10px
  shadow-color: #000;
  shadow-offset:{ width:1, height:10};
  shadow-opacity: 0.5;
  shadow-radius: 20;
  elevation: 10;
`;

const LoginText = styled(Text)`
  text-align: center;
  font-size: 18px
  color: #00c6e5
  padding-horizontal: 20px
`;

const Slider = (props) => (
  <View style={{marginHorizontal: 25}}>
    <MultiSlider
      isMarkersSeparated={true}
      enalbeOne={true}
      enalbeTwo={true}
      values={props.values}
      min={props.min}
      max={props.max}
      step={props.step}
      onValuesChange={(value) => props.onChange(value)}
      onValuesChangeFinish={(value) => props.onChangeFinish(value)}
      style={{color: themeProp('colorBorder')}}
      customMarkerLeft={() => (<Image width={'100%'} height={'100%'} source={Images.icons.ic_minus}/>)}
      customMarkerRight={() => (<Image width={'100%'} height={'100%'} source={Images.icons.ic_plus}/>)}
      sliderLength={Dimensions.get('window').width - 70}
    />
  </View>
);

const Price = (props) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
    <View style={{flexDirection: 'row'}}>
      <PriceView>{props.left}</PriceView>
      <SymbolView>{props.symbol}</SymbolView>
    </View>
    <View style={{flexDirection: 'row'}}>
      <PriceView>{props.right}</PriceView>
      <SymbolView>{props.symbol}</SymbolView>
    </View>
  </View>
);

const DivideLine = (props) => (
  <Image width={'100%'} height={'100%'} source={Images.icons.ic_line} style={{width: '100%', marginVertical: 20}}/>
);

const Detail = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
    <Text style={{
      fontSize: 16,
      color: '#D75A2B',
      fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
      marginTop: 3,
    }}>{props.title}</Text>
    <Text style={{
      fontSize: 20,
      color: 'black',
      fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
      marginLeft: 5,
    }}>{props.desc}</Text>
  </View>
);

const DetailMore = (props) => (
  <View style={{marginTop: -15, marginBottom: 4}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <HTML onLinkPress={openLink} html={props.data.title} baseFontStyle={{fontSize: 16, color: props.data.title_color, fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 3,}}/>
      {props.data.infobox && <CustomTooltip setAnalytics={() => props.setAnalytics ? props.setAnalytics() : {}} from="category" tooltipText={get(props, 'data.infobox', 'No Info')}/>}
  </View>
    <HTML onLinkPress={openLink} html={props.data.text} baseFontStyle={{fontSize: 24, color: props.data.text_color, fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book'}}/>
  </View>
);

export {
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
  SingleSelectBox,
  MultiSelectBox,
};
