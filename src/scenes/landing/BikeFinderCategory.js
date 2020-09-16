import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, GreenButton, WhiteButton} from 'components/controls/Button';
import {Header,AdvResumeBig, CheckBox, Divider, Price, Slider, Step, ErrorView} from 'components/controls/BaseUtils';
import {BaseSelect, BaseTextFilter, BaseTextInput} from 'components/controls/BaseTextInput';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {toJS} from 'mobx';
import {get} from 'lodash';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import CustomTooltip from 'components/controls/CustomTooltip';
import {scale, verticalScale} from 'react-native-size-matters';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const {height, width} = Dimensions.get('window');
const ratio = height/width;
const isIOS = Platform.OS === 'ios';



const Stepper = observer(props => {
  const {category} = useStores();
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
    currentPosition={category.position}
    label={label}
    onPress={p => category.position !== p && props.onPress(p - category.position)}
  />;
});
const PageSlider = (props) => {
  const {category} = useStores();
  let _swiper = React.useRef(null);
  const total = props.data.content.length;

  return (
    <SwiperContainer>
      <Swiper
        ref={_swiper}
        containerStyle={{height: isIOS ? ratio < 1.5 ? 650 : 350 : 380}}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout = {4}
        index={category.position}
        onIndexChanged={(index) => category.setPosition(index)}
      >
        {props.data.content.map((item, index) => {
          return <AdvResumeBig key={index} data={item} productIf={false}/>;
        })}
      </Swiper>
      <Divider size={20}/>
      <View style={{width: '115%', alignSelf: 'center'}}>
        <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
      </View>
    </SwiperContainer>
  );
};
const processSelectData = (predata) => {
  let title = '';
  let texts = [];
  let values = [];
  Object.entries(predata).forEach(([key, value]) => {
    if (key === 'title') {
      title = value;
    }
    if (key.toString().includes('text')) {
      texts.push(value.toString());
    }
    if (key.includes('value') && !key.includes('values')) {
      values.push(value);
    }
  });
  return {title, texts, values};
};
const SelectElement = (props) => {
  const {bikeSearch} = useStores();
  const {showActionSheetWithOptions} = useActionSheet();
  const preData = props.data;
  const [brand, setBrand] = useState();
  const _onOpenActionSheet = (id, cb) => {
    const {title, texts, values} = processSelectData(preData);
    const options = ['QUALSIASI', ...texts];
    const cancelButtonIndex = 0;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        if  (buttonIndex !== 0) {
          bikeSearch.setRequest(get(preData, 'name', ''), values[buttonIndex - 1]);
          cb(texts[buttonIndex - 1]);
          // Do something here depending on the button index selected
        } else {
          cb('');
          bikeSearch.removeRequest(get(preData, 'name', ''));
        }

      },
    );
  };
  return <BaseSelect text={get(preData, 'title', '').toUpperCase()} value={brand}
                     onPress={() => _onOpenActionSheet(0, setBrand)}/>;
};

const FinderItem = props => {
  const {bikeSearch} = useStores();
  const [checked, setChecked] = useState(false);
  const min = props.data.min_val < props.data.max_val ? props.data.min_val : props.data.max_val;
  const max = props.data.min_val > props.data.max_val ? props.data.min_val : props.data.max_val;
  const [range, setRange] = useState([min, max]);
  const onChange = (e) => {
    let request = `${e[0].toString()}#${e[1].toString()}`;
    bikeSearch.setRequest(get(props, 'data.name', ''), request);
    setRange(e);
  };
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20}}>
        <CheckBox checked={checked} onPress={() => setChecked(!checked)} text={get(props, 'data.title','').toUpperCase()}/>
        <CustomTooltip from="category" tooltipText={get(props, 'data.infotext', 'No Info')}/>
      </View>
      {
        checked &&
        <View style={{marginLeft: 10}}>
          <Price left={range[0]} right={range[1]} symbol={props.data.um}/>
          <Slider min={props.data.min_val} max={props.data.max_val} values={range} step={props.data.step}
                  onChangeFinish={(e) => onChange(e)} onChange={(e) => setRange(e)}/>
        </View>
      }
      <Divider size={10}/>
    </View>
  );
};

const ExtraSearch = props => {
  const {uiData} = props;
  return <View>
    <Title size={'0'} color={themeProp('colorThird')} width={'30px'}
           style={{paddingHorizontal: 10}}>MOTORE</Title>
    {uiData.map((item,index) => {
      if (item.id === "FORM_INPUT_SLIDER" && item.name === "potenza_motore") {
        return (
          <View>
            <FinderItem data={item} key={index}/>
            <Divider size={20}/>
          </View>

        );
      }
      if (item.id === "FORM_INPUT_SLIDER" && item.name === "coppia_motore"){
        return (
          <View>
            <Divider size={-30}/>
            <FinderItem data={item} key={index}/>
          </View>
        )
      }
    })}
    <Divider size={30}/>
    <Title size={'0'} color={themeProp('colorThird')} width={'30px'}
           style={{paddingHorizontal: 10}}>SPECIFICHE</Title>
    {uiData.map((item,index) => {
      if (item.id === "FORM_INPUT_SLIDER" && item.name === "peso"){
        return <FinderItem data={item} key={index}/>
      }
    })}
    <View style={{paddingLeft: 13}}>
      {uiData.map((item,index) => {
        if (item.id === "FORM_INPUT_SELECT" && item.name === "materiale_telaio") {
          return <SelectElement data={item} key={index}/>;
        }
      })}
    </View>

    <Divider size={35}/>
    <Title size={'0'} color={themeProp('colorThird')} width={'28px'}
           style={{paddingHorizontal: 10}}>COMPONENTI</Title>
    <View style={{paddingLeft: 13, marginBottom: 30, marginTop: 10}}>
      {uiData.map((item,index) => {
        if (item.id === "FORM_INPUT_SELECT" && item.name === "tipo_ammortizzatore") {
          return <SelectElement data={item} key={index}/>;
        }
        if (item.id === "FORM_INPUT_SELECT" && item.name === "ruota_anteriore"){
          return <SelectElement data={item} key={index}/>
        }
        if (item.id === "FORM_INPUT_SELECT" && item.name === "ruota_posteriore"){
          return <View><SelectElement data={item} key={index}/></View>
        }
      })}
    </View>
    {/*<Divider size={-25}/>*/}
    {/*{uiData.map((item,index) => {*/}
    {/*if (item.id === "FORM_INPUT_SELECT" && item.name === "ruota_anteriore"){*/}
    {/*return <SelectElement data={item} key={index}/>*/}
    {/*}*/}
    {/*if (item.id === "FORM_INPUT_SELECT" && item.name === "ruota_posteriore"){*/}
    {/*return <View><Divider size={-10}/><SelectElement data={item} key={index}/></View>*/}
    {/*}*/}
    {/*})}*/}
  </View>
};
const BikeFinderCategory = props => {
  const navigation = useNavigation();
  const {staticData, category, bikeSearch} = useStores();
  console.log('currentid=====111111', toJS(category.currentId));
  const uiData = toJS(staticData.data.search_forms[category.currentId]);

  const [collapse, setCollapsed] = useState(false);
  const [counter, setCounter] = useState(0);
  const _container = useRef(null);


  const goToResult = (url) => {
    bikeSearch.clearResult();
    bikeSearch.getData(url);
    navigation.replace('Result');
  };

  useEffect(() => {
    if (collapse) {
      setTimeout(() => {
        _container.current.scrollTo({y: 650, animated: true})
      }, 100)
    }

  },[collapse]);

  // useFocusEffect(
  //   useCallback(() => {
  //     category.setPosition(category.position + 1);
  //     console.log('category counter increment');
  //     setCounter(counter + 1);
  //     setCounter(false);
  //     return () => {
  //
  //     }
  //
  //   }, [])
  // )

  if (Object.keys(uiData).length !== 0) {
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
            <Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight: ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}>EBIKE FINDER</Text>
          </TouchableOpacity>
        </Header>
        <Container ref={_container}>
          <View style={{paddingHorizontal: 10, paddingTop: isIOS ? 10 : 0}}>
            {/*<Title size={'30px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>*/}
            <Title size={5} color={toJS(category.color)} width={'50px'}>{toJS(category.title)}</Title>
            {uiData.map((item,index) => {
              if (item.id === 'PAGED_SLIDER' && Object.keys(item.content).length) {
                return <View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>
              }
            })}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Title1 size={'10px'} color={themeProp('colorThird')} width={'35px'}>CERCA</Title1>
            </View>
            <Divider size={13}/>
            <Divider size={5}/>
            {uiData.map((item,index) => {
              if (item.id === "FORM_INPUT_SELECT" && item.name === "brand"){
                return <SelectElement data={item} key={index}/>;
              }
              if (item.id === "FORM_INPUT_SELECT" && item.title === "Marca") {
                return <View><SelectElement data={item} key={index}/><Divider size={5}/></View>;
              }
              if (item.id === "FORM_INPUT_SELECT" && item.name === "brand_motore"){
                return <SelectElement data={item} key={index}/>;
              }
            })}
          </View>
          {uiData.map((item,index) => {
            if (item.id === "FORM_INPUT_SLIDER" && item.name === "prezzo") return <FinderItem data={item} key={index}/>;
            if (item.id === "FORM_INPUT_SLIDER" && item.name === "densita_energetica"){
              return <View><Divider size={-10}/><FinderItem data={item} key={index}/></View>
            }
          })}

          <Divider size={27}/>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => setCollapsed(!collapse)}>
            <ColView>Ricerca avanzata</ColView>
            <Image width={20} height={20} source={Images.icons.ic_arrow_down}/>
          </TouchableOpacity>
          <Divider size={34}/>
          {collapse && <ExtraSearch uiData={uiData}/>}

          {uiData.map((item,index) => {
            if (item.id === "FORM_INPUT_BUTTON" && item.action === "CERCA"){
              return  <View style={{marginHorizontal : 10, marginBottom: 10}}><GreenButton bg_color={item.bg_color} txt_color= {item.txt_color} onPress={() => {analytics().logEvent('search_launch');goToResult(item.url)}}>CERCA</GreenButton></View>
            }
          })}
        </Container>
        {/*<Bottom>*/}
          {/*{uiData.map((item,index) => {*/}
            {/*if (item.id === "FORM_INPUT_BUTTON" && item.action === "CERCA"){*/}
              {/*return  <GreenButton bg_color={item.bg_color} txt_color= {item.txt_color} onPress={() => goToResult(item.url)}>CERCA</GreenButton>*/}
            {/*}*/}
          {/*})}*/}
          {/*/!*<GreenButton bg_color='green' onPress={() => Actions.Result()}>CERCA</GreenButton>*!/*/}
        {/*</Bottom>*/}
      </View>
    );
  } else {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Image style={{width: 70, height: 70, resizeMode: 'contain',marginTop: 14}} source={Images.icons.ic_loading}/></View>
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-bottom: 15px;
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(50)}
`;

const Bottom = styled(View)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-bottom: 10px;
`;

const ColView = styled(Text)`
  font-size: 20px;
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniBook')};
`;


const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;

const Title1 = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;

const SwiperContainer = styled(View)`
  width: 100%;
`;


export default observer(BikeFinderCategory);
