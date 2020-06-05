import StepIndicator from 'react-native-step-indicator';
import React from 'react';
import {themeProp} from 'utils/CssUtil';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import {Dimensions, Image, Text, TouchableOpacity, View, Platform, Button} from 'react-native';
import Images from 'res/Images';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {get} from 'lodash';
import {useStores} from 'hooks/Utils';
import ImageView from "react-native-image-viewing";
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const isIOS = Platform.OS === 'ios';

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
  <SelectView onPress={props.onPress}>
    {props.checked ? <SelectBoxUnchecked><SelectDot/></SelectBoxUnchecked> : <SelectBoxUnchecked/>}
    <SelectText>{props.text}</SelectText>
  </SelectView>
);

const MainBikeInfo = (props) => {
  const {bikeData} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url);
    Actions.BikePagePremium();
  };
  return (
      <MainInfo>
        <TouchableOpacity onPress={() => goToBike(get(props, 'data.url', ''))}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {props.data && <Image resizeMode="contain"
                                source={{uri: `http://biciapp.sepisolutions.com${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
                                style={{width: '95%', height: 230}}/>}
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
            <Divider size={moderateScale(-11)}/>
            <Sort size={'23px'}>{get(props, 'data.brand', 'ASKOLL')}</Sort>
            <Divider size={moderateScale(-10)}/>
            <NameView>
              <Name numberOfLines={1} color={'#' + get(props, 'data.color', 'D75A2B')}
                    size={'38px'}>{get(props, 'data.modello', 'EB4')}</Name>
              <Image width={20} height={20} source={Images.icons.arrow_right}/>
            </NameView>
            <Sort style={{marginTop: moderateScale(-15)}} size={moderateScale(21)}>{get(props, 'data.prezzo', '1390')}€</Sort>
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
  const {bikeData} = useStores();
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url);
    Actions.BikePagePremium();
  };
  return (
    <MainInfo>
      <TouchableOpacity onPress={() => goToBike(get(props, 'data.url', ''))}>
      <View style={{flexDirection: 'row'}}>
        <Image
               source={{uri: `http://biciapp.sepisolutions.com${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
               style={{width: '45%', height: 80, resizeMode: 'contain'}}/>
        {/*<Image*/}
          {/*source={Images.background.bike_logo1} style={{width: '45%', height: 80, resizeMode: 'contain'}}/>*/}
        <View width={'55%'}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -8, width: '100%'}}>
            <View style={{marginTop: 8}}>
              <TypeView bg_color={'#'+get(props, 'data.color', 'D75A2B')}><Type size={'10px'}>{get(props, 'data.categoria', 'eCity')}</Type></TypeView>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: isIOS ? 15 : 0, position: 'absolute', top: 0, right: 0}}>
              <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: moderateScale(5, 0.9)}}/>
              <Sort size={moderateScale(20)}>2020</Sort>
            </View>
          </View>
          <View style={{marginTop: isIOS ? -1 : -3}}>
            <Sort size={'14px'}>{get(props, 'data.brand', 'HIBIKER')}</Sort>
          </View>
          <NameView>
            <Name color={'#'+get(props, 'data.color', 'D75A2B')} numberOfLines={1} size={'23px'}>{get(props, 'data.modello', 'XDURO NDURO 3.5')}</Name>
            <Image width={10} height={10} source={Images.icons.arrow_right} style={{width: 5, height: 9}}/>
          </NameView>
          <View style={{marginTop: isIOS ? -11 : -15}}/>
          <Sort size={'23px'}>{get(props, 'data.prezzo', '1390')}€</Sort>
        </View>
      </View>
      <View style={{paddingLeft: 5, marginTop: isIOS ? 5 : 0}}>
        <Text
          style={{color: '#' + get(props, 'data.color', 'D75A2B'), fontFamily: oswald_bold, fontSize: 11}}>MOTORE</Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: -5}}>
          <Text style={{
            color: '#909090',
            fontFamily: oswald_bold,
            fontSize: 13,
          }}>{get(props, 'data.motore', 'Bosh, Performance CX')}</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <View style={{marginTop: 10, marginRight: 3}}>
                <Image style={{width: 15, height: 20, resizeMode: 'contain'}}
                       source={{uri: get(props, 'data.img_nm', '')}}/>
                {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>*/}
              </View>
              <Sort size={'23px'}>{get(props, 'data.coppia', '75')}</Sort>
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

const AdvResumeBig = (props) => {
  const {bikeData} = useStores();
  const [isVisible, setIsVisible] = React.useState(false);
  const goToBike = url => {
    bikeData.clearData();
    bikeData.getData(url);
    Actions.BikePagePremium();
  };
  const images = [{
    uri : 'http://biciapp.sepisolutions.com' + get(props, "data.immagine", "/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg"),
  }];
  return (
    <View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        style={{height: 800}}
      />
      <MainInfo>
        <TouchableOpacity onPress={() => !props.productIf ? goToBike(props.data.url) : {}}
                          style={{justifyContent: 'center', alignItems: 'center'}}>
          {props.data && <Image resizeMode="contain"
                                source={{uri: `http://biciapp.sepisolutions.com${get(props, 'data.immagine', '/z-content/images/ebike/askoll/RZO7ZxEegAPHou369k2kKL1wHAv0SX3W.jpg')}`}}
                                style={{width: '95%', height: 230}}/>}
          {!props.data &&
          <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.background.bike_logo1}
                 style={{width: '95%', height: 230}}/>}
          {!props.isBack ? <Image resizeMode="stretch" source={Images.icons.ic_badge_empty}
                                  style={{position: 'absolute', right: 0, top: 0, width: 50, height: 50}}/> : <View/>
          }
        </TouchableOpacity>
        {props.productIf ? <TouchableOpacity style={{position: 'absolute', right: 0, top: 200}} onPress={() => setIsVisible(true)}><Image style={{height:moderateScale(27, 0.8), width: moderateScale(27, 0.8), resizeMode: 'contain'}} source={Images.icons.ic_zoom_in}/></TouchableOpacity> : <View/>}
        <View style={{marginLeft: 5}}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <TypeView bg_color={'#' + get(props, 'data.color', 'D75A2B')}><Type
              size={moderateScale(13)}>{get(props, 'data.categoria', 'eCity')}</Type></TypeView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
              <Sort size={moderateScale(22)}>{get(props, 'data.anno', '2020')}</Sort>
            </View>
          </View>
          <Divider size={moderateScale(-11)}/>
          <Sort size={moderateScale(22)}>{get(props, 'data.brand', 'ASKOLL')}</Sort>
          <Divider size={moderateScale(-10)}/>
          <NameView>
            <Name color={'#' + get(props, 'data.color', 'D75A2B')}
                  size={moderateScale(35)}>{get(props, 'data.modello', 'EB4')}</Name>
            <Image width={20} height={20} source={Images.icons.arrow_right}/>
          </NameView>
          <Sort style={{marginTop: moderateScale(-15)}} size={moderateScale(22)}>{get(props, 'data.prezzo', '1390')}€</Sort>
        </View>
      </MainInfo>
    </View>
  );
};

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
  margin-top: -5px
`;

const Name = styled(Text)`
  color: ${props => props.color ? props.color : '#D75A2B'};
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
  margin-top: ${isIOS ? '-2px' : '-5px'};
  margin-right: 5px;
`;

const SelectView = styled(TouchableOpacity)`
    width: 95%;
    height: 47px;
    flexDirection: row;
    padding-horizontal: 13px;
    align-items: center
`;

const SelectBoxUnchecked = styled(View)`
    width: 26px;
    height: 26px;
    border-width: 1px;
    border-color: #c9c3c5;
    justify-content: center;
    align-items: center;
`;

const SelectDot = styled(View)`
    background-color: #53DCD0
    width: 16px;
    height: 16px;
`;

const SelectText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: #909090;
    font-size: 18px;
    margin-left: 10px;
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
  background-color: #f7f7f7
  flex: 1;
  position: absolute;
  width: 100%;
  top:0
  height: ${verticalScale(50)}
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
      onValuesChangeFinish={(value) => props.onChange(value)}
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
  <View style={{marginTop: -20, marginBottom: 4}}>
    <Text style={{
      fontSize: 16,
      color: props.title_color,
      fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
      marginTop: 3,
    }}>{props.title}</Text>
    <Text style={{
      fontSize: 24,
      color: props.text_color,
      fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',
    }}>{props.desc}</Text>
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
};
