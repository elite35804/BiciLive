import React, {useState} from 'react';
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, GreenButton, WhiteButton} from 'components/controls/Button';
import {AdvResumeBig, CheckBox, Divider, Price, Slider, Step} from 'components/controls/BaseUtils';
import {BaseSelect, BaseTextFilter, BaseTextInput} from 'components/controls/BaseTextInput';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {toJS} from 'mobx';
import {get} from 'lodash';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import CustomTooltip from 'components/controls/CustomTooltip';

const isIOS = Platform.OS === 'ios';


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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10}}>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} text={get(props, 'data.title','').toUpperCase()}/>
        {/*<Tooltip*/}
          {/*width={275}*/}
          {/*height={140}*/}
          {/*overlayColor={'rgba(0,0,0,0'}*/}
          {/*popover={<Text numberOfLines={5} style={{color: 'white', fontSize: 18, fontFamily: 'UniSansRegular'}}>{get(props, 'data.infotext', 'No Info')}</Text>}*/}
          {/*backgroundColor={'black'}*/}
        {/*>*/}
          {/*<Image width={30} height={30} source={Images.icons.ic_info_green}/>*/}
        {/*</Tooltip>*/}
        <CustomTooltip from="category" tooltipText={get(props, 'data.infotext', 'No Info')}/>
      </View>
      {
        checked &&
        <View style={{marginLeft: 10}}>
          <Price left={range[0]} right={range[1]} symbol={props.data.um}/>
          <Slider min={props.data.min_val} max={props.data.max_val} values={range} step={props.data.step}
                  onChange={(e) => onChange(e)}/>
        </View>
      }
      <Divider size={10}/>
    </View>
  );
};
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
        containerStyle={{height: isIOS ? 350 : 380}}
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
    if (key.includes('text')) {
      texts.push(value);
    }
    if (key.includes('value') && !key.includes('values')) {
      values.push(value);
    }
  });
  return {title, texts, values};
};
const BikeFinderCategory = props => {
  const {staticData, category, bikeSearch} = useStores();
  // console.log('static_Data========', toJS(staticData.data.search_forms))
  console.log('currentid=====111111', toJS(category.currentId));
  const uiData = toJS(staticData.data.search_forms[category.currentId]);
  // console.log('data=======', toJS(staticData.data.search_forms[category.currentId]));
  // console.log('uiData===', uiData);
  // bikeSearch.clearRequest();
  const {showActionSheetWithOptions} = useActionSheet();
  const [collapse, setCollapsed] = useState(false);

  const SelectElement = (props) => {

    const preData = props.data;
    const [brand, setBrand] = useState();
    const _onOpenActionSheet = (id, cb) => {
      const {title, texts, values} = processSelectData(preData);
      // const options = [...texts, 'Cancel'];
      showActionSheetWithOptions(
        {
          options: texts
        },
        buttonIndex => {
          bikeSearch.setRequest(get(preData, 'name', ''), values[buttonIndex]);
          cb(texts[buttonIndex]);
          // Do something here depending on the button index selected
        },
      );
    };
    return <BaseSelect text={get(preData, 'title', '').toUpperCase()} value={brand}
                       onPress={() => _onOpenActionSheet(0, setBrand)}/>;
  };

  const goToResult = (url) => {
    bikeSearch.clearResult();
    bikeSearch.getData(url);
    Actions.Result();
  };

  if (Object.keys(uiData).length !== 0) {
    return (
      <View style={{flex: 1}}>
        <Container>
          {/*<View style={{paddingHorizontal: 10}}>*/}
          {/**/}
          {/*</View>*/}

          <View style={{paddingLeft: 13,paddingHorizontal: 10}}>
            <Title size={'40px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>
            <Title size={'0'} color={toJS(category.color)} width={'50px'}>{toJS(category.title)}</Title>
            {uiData.map((item,index) => {
              if (item.id === 'PAGED_SLIDER' && Object.keys(item.content).length) {
                return <View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>
              }
            })}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Title1 size={'10px'} color={themeProp('colorThird')} width={'35px'}>CERCA</Title1>
            </View>
            <Divider size={13}/>
            {/*<CategoryElements/>*/}

            {/*<SelectElement dataId="0" dataName="brand" dataTitle="Marca"/>*/}
            {/*<SliderElement/>*/}
            {/*<BaseSelect text="ANNO*"/>*/}
            {/*<BaseTextInput placeholder="MARCA, MODELLO"/>*/}
            <Divider size={5}/>
            {/*<BaseSelect text="MARCA EBIKE"/>*/}
            {/*<BaseSelect text="MARCE MOTORE"/>*/}
            {uiData.map((item,index) => {
              if (item.id === "FORM_INPUT_SELECT" && item.name === "brand"){
                return <SelectElement data={item} key={index}/>;
              }
              if (item.id === "FORM_INPUT_SELECT" && item.title === "Marca") {
                item.title = "Marca Ebike";
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
              item.title = "Capacita Batteria";
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
          {collapse && <View>
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

            <Divider size={30}/>
            <Title size={'0'} color={themeProp('colorThird')} width={'28px'}
                   style={{paddingHorizontal: 10}}>COMPONENTI</Title>
            <View style={{paddingLeft: 13, marginBottom: 30, marginTop: 10}}>
              {uiData.map((item,index) => {
                if (item.id === "FORM_INPUT_SELECT" && item.name === "tipo_ammortizzatore") {
                  return <SelectElement data={item} key={index}/>;
                }
              })}
            </View>
            <Divider size={-25}/>
            {uiData.map((item,index) => {
              if (item.id === "FORM_INPUT_SLIDER" && item.name === "ruota_anteriore"){
                return <FinderItem data={item} key={index}/>
              }
              if (item.id === "FORM_INPUT_SLIDER" && item.name === "ruota_posteriore"){
                return <View><Divider size={-10}/><FinderItem data={item} key={index}/></View>
              }
            })}
          </View>}

        </Container>
        <Bottom>
          {uiData.map((item,index) => {
            if (item.id === "FORM_INPUT_BUTTON" && item.action === "CERCA"){
              return  <GreenButton bg_color={item.bg_color} txt_color= {item.txt_color} onPress={() => goToResult(item.url)}>CERCA</GreenButton>
            }
          })}
          {/*<GreenButton bg_color='green' onPress={() => Actions.Result()}>CERCA</GreenButton>*/}
        </Bottom>
      </View>
    );
  } else {
    return <View><Text>There is no data to display</Text></View>
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
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
