import StepIndicator from 'react-native-step-indicator';
import React from 'react';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import {Dimensions, Image, Text, TouchableOpacity, View, Platform} from 'react-native';
import Images from 'res/Images';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const isIOS = Platform.OS === "ios";

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

const Step = (props) => <StepIndicator customStyles={customStyles} currentPosition={3} labels={label}/>;

const Divider = (props) => <View style={{marginBottom: props.size}}/>;

const CheckBox = (props) => (
  <SelectView onPress={props.onPress}>
    {props.checked ? <SelectBoxUnchecked/> : <SelectBoxUnchecked><SelectDot /></SelectBoxUnchecked>}
    <SelectText>{props.text}</SelectText>
  </SelectView>
);

const MainBikeInfo = (props) => (
  <MainInfo>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.background.bike_logo1}
             style={{width: '95%', height: 230}}/>
      {!props.isBack ? <Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}
                               style={{position: 'absolute', right: 0, top: 0, width: 50, height: 50}}/>:<View/>
      }
    </View>
    <View style={{marginLeft: 5}}>
      <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        <TypeView width={'44px'}><Type size={'15px'}>eMTB</Type></TypeView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
          <Sort size={'23px'}>2020</Sort>
        </View>
      </View>
      <Sort size={'23px'}>HAIBIKE</Sort>
      <NameView>
        <Name size={'35px'}>XDURO NDURO 3.5</Name>
        <Image width={20} height={20} source={Images.icons.arrow_right}/>
      </NameView>
      <Sort size={'23px'}>5.499€</Sort>
      <Text style={{color: '#D75A2B', fontFamily: oswald_bold, fontSize: 11}}>MOTORE</Text>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 13}}>Bosh, Performance CX</Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: 20}}>
            <View style={{marginTop: 7, marginRight: 3}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>
            </View>
            <Sort size={'23px'}>75</Sort>
            <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Nm</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 7, marginRight: 3}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_battery}/>
            </View>
            <Sort size={'23px'}>625</Sort>
            <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Wh</Text>
          </View>
        </View>
      </View>
    </View>
  </MainInfo>
);

const ListBikeInfo = (props) => (
  <MainInfo>
    <View style={{flexDirection: 'row'}}>
      <Image width={'40%'} height={'50%'} resizeMode="contain" source={Images.background.bike_logo1} style={{width: '40%', height: 100}}/>
      <View width={'60%'}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -8}}>
          <View style={{marginTop: 8}}>
            <TypeView width={'33px'}><Type size={'10px'}>eMTB</Type></TypeView>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
            <Sort size={'23px'}>2020</Sort>
          </View>
        </View>
        <View style={{marginTop: -8}}>
          <Sort size={'14px'}>HAIBIKE</Sort>
        </View>
        <NameView>
          <Name size={'20px'}>XDURO NDURO 3.5</Name>
          <Image width={10} height={10} source={Images.icons.arrow_right} style={{width: 5, height: 9}}/>
        </NameView>
        <View style={{marginTop: -5}}/>
        <Sort size={'23px'}>5.499€</Sort>
      </View>
    </View>
    <View style={{paddingLeft: 5}}>
      <Text style={{color: '#D75A2B', fontFamily: oswald_bold, fontSize: 11}}>MOTORE</Text>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 13}}>Bosh, Performance CX</Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: 20}}>
            <View style={{marginTop: 7, marginRight: 3}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>
            </View>
            <Sort size={'23px'}>75</Sort>
            <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Nm</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 7, marginRight: 3}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_battery}/>
            </View>
            <Sort size={'23px'}>625</Sort>
            <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Wh</Text>
          </View>
        </View>
      </View>
    </View>
  </MainInfo>
);

const MainInfo = styled(View)`
  border-left-width: 7px;
  border-left-color: #D8D8D8;
  width: 100%;
`;

const TypeView = styled(View)`
  background-color: #D75A2B
  padding-horizontal: 5px;
  width: ${props => props.width};
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
`;

const Name = styled(Text)`
  color: #D75A2B;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
  margin-top: -5px;
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
    margin-top: 10px;
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

const Slider = (props) => (
  <View style={{marginHorizontal: 25}}>
    <MultiSlider
      isMarkersSeparated={true}
      enalbeOne={true}
      enalbeTwo={true}
      values={[20, 50]}
      min={20}
      max={50}
      style={{color: themeProp('colorBorder')}}
      customMarkerLeft={() => (<Image width={'100%'} height={'100%'} source={Images.icons.ic_minus}/>)}
      customMarkerRight={() => (<Image width={'100%'} height={'100%'} source={Images.icons.ic_plus}/>)}
      sliderLength={Dimensions.get('window').width - 50}
    />
  </View>
);

const Price = (props) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
    <View style={{flexDirection: 'row'}}>
      <PriceView>{props.left}</PriceView>
      <SymbolView>€</SymbolView>
    </View>
    <View style={{flexDirection: 'row'}}>
      <PriceView>{props.right}</PriceView>
      <SymbolView>€</SymbolView>
    </View>
  </View>
);

const DivideLine = (props) => (
  <Image width={'100%'} height={'100%'} source={Images.icons.ic_line} style={{width: '100%', marginVertical: 20}}/>
);

const Detail = (props) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
    <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 3}}>{props.title}</Text>
    <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginLeft: 5}}>{props.desc}</Text>
  </View>
);

const DetailMore = (props) => (
  <View style={{marginBottom: 4}}>
    <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 3}}>{props.title}</Text>
    <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book'}}>{props.desc}</Text>
  </View>
);



export {Step, Divider, CheckBox, Price, Slider, MainBikeInfo, ListBikeInfo, DivideLine, Detail, DetailMore};
