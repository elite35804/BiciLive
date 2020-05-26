import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Dimensions} from 'react-native';
import Tooltip from 'rn-tooltip';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import {Step, Divider, CheckBox, Price, Slider} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {toJS} from 'mobx';
import {get} from 'lodash';
import {observer} from 'mobx-react';


const FinderItem = props => {
  const [checked, setChecked] = useState(false);
  const [range, setRange] = useState([props.data.min_val, props.data.max_val]);
  return (
    <View>
      <CheckBox checked={checked} onPress={() => setChecked(!checked)} text={get(props, 'data.title','').toUpperCase()}/>
      {
        checked &&
        <View style={{marginLeft: 10}}>
          <Price left={range[0]} right={range[1]} symbol={props.data.um}/>
          <Slider min={props.data.min_val} max={props.data.max_val} values={range} step={props.data.step}
                  onChange={setRange}/>
        </View>
      }
      <Divider size={10}/>
    </View>
  );
};
const BikeFinderCategory = props => {
  const {staticData, category} = useStores();
  console.log('currentid=====', toJS(category.currentId));
  const uiData = toJS(staticData.data.search_forms[category.currentId]);
  // console.log('data=======', toJS(staticData.data.search_forms[category.currentId]));
  // console.log('uiData===', uiData);
  const {showActionSheetWithOptions} = useActionSheet();
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [collapse, setCollapsed] = useState(false);


  const processSelectData = (id) => {
    const predata = uiData[id];
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
      if (key.includes('value')) {
        values.push(value);
      }
    });
    return {title, texts, values};
  };

  const _onOpenActionSheet = (id, cb) => {
    const {title, texts, values} = processSelectData(id);
    console.log('textes: ', texts);
    const options = [...texts, 'Cancel'];
    const cancelButtonIndex = texts.length;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        console.log('index=====', values[buttonIndex], texts[buttonIndex]);
        console.log('cb', cb);
        cb(texts[buttonIndex]);
        // Do something here depending on the button index selected
      },
    );
  };


  const SelectElement = (props) => {
    const preData = props.data;
    const [brand, setBrand] = useState();
    return <BaseSelect text={get(preData, 'title', '').toUpperCase()} value={brand}
                       onPress={() => _onOpenActionSheet(0, setBrand)}/>;
  };
  const SliderElement = (props) => {
    const preData = uiData[props.dataId];
    // console.log('predaa======', props.dataId, preData);
    const [range, setRange] = useState([preData.min_val, preData.max_val]);
    return (
      <View style={{marginRight: 10}}>
        <Price left={range[0]} right={range[1]} symbol={preData.um}/>
        <Slider min={preData.min_val} max={preData.max_val} values={range} step={preData.step} onChange={setRange}/>
      </View>
    );
  };

  const CategoryElements = () => {
    const items = [];
    uiData.forEach((item, index) => {
      if (item.id === 'FORM_INPUT_SELECT') {
        items.push(<SelectElement dataId={index} key={index}/>);
      }
      if (item.id === 'FORM_INPUT_SLIDER') {
        items.push(<SliderElement dataId={index} key={index}/>);
      }
    });
    return items;
  };

  const CheckBoxItem = props => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckBox checked={checked} onPress={() => setChecked(!checked)} text={props.text}/>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Container>
        <View style={{paddingHorizontal: 10}}>
          <Title size={'40px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>
          <Title size={'0'} color='#D75A2B' width={'50px'}>{toJS(category.title)}</Title>
          <MainInfo>
            <TouchableOpacity onPress={() => Actions.BikePagePremium()}
                              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.background.bike_logo1}
                     style={{width: '95%', height: 230}}/>
              <Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}
                     style={{position: 'absolute', right: 0, top: 0, width: 50, height: 50}}/>
            </TouchableOpacity>
            <View style={{marginLeft: 5}}>
              <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <TypeView><Type>eMTB</Type></TypeView>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
                  <Sort>2020</Sort>
                </View>
              </View>
              <Divider size={-10}/>
              <Sort>HAIBIKE</Sort>
              <Divider size={-10}/>
              <NameView>
                <Name>XDURO NDURO 3.5</Name>
                <Image width={20} height={20} source={Images.icons.arrow_right}/>
              </NameView>
              <Divider size={-10}/>
              <Sort>5.499€</Sort>
            </View>
          </MainInfo>
          <Divider size={20}/>
          <Step/>
          <Divider size={0}/>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Title1 size={'10px'} color={themeProp('colorThird')} width={'35px'}>CERCA</Title1>
            <SubTitle>*obbigatorio</SubTitle>
          </View>
        </View>

        <View style={{paddingLeft: 13}}>
          <Divider size={13}/>
          {/*<CategoryElements/>*/}

          {/*<SelectElement dataId="0" dataName="brand" dataTitle="Marca"/>*/}
          {/*<SliderElement/>*/}
          {/*<BaseSelect text="ANNO*"/>*/}
          <BaseTextInput placeholder="MARCA, MODELLO"/>
          <Divider size={5}/>
          {/*<BaseSelect text="MARCA EBIKE"/>*/}
          {/*<BaseSelect text="MARCE MOTORE"/>*/}
          {uiData.map((item,index) => {
            if (item.id === "FORM_INPUT_SELECT" && item.title === "Marca") {
              item.title = "Marca Ebike";
              return <View><SelectElement data={item} key={index}/><Divider size={5}/></View>;
            }
            if (item.id === "FORM_INPUT_SELECT" && item.title === "Marca motore"){
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
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10}}>
                    <View/>
                    <Tooltip
                      width={275}
                      height={140}
                      overlayColor={'rgba(0,0,0,0'}
                      popover={<Text style={{color: 'white', fontSize: 18, fontFamily: 'UniSansRegular'}}>Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim </Text>}
                      backgroundColor={'black'}
                    >
                      <Image width={30} height={30} source={Images.icons.ic_info_green}/>
                    </Tooltip>
                  </View>
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
          <Divider size={-10}/>
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
            return  <GreenButton bg_color={item.bg_color} txt_color= {item.txt_color} onPress={() => Actions.Result()}>CERCA</GreenButton>
          }
        })}
        {/*<GreenButton bg_color='green' onPress={() => Actions.Result()}>CERCA</GreenButton>*/}
      </Bottom>
    </View>
  );
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

const MainInfo = styled(View)`
  border-left-width: 7px;
  border-left-color: #D8D8D8;
  width: 100%;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  color: ${themeProp('colorThird')};
  font-family: ${themeProp('fontUniBook')};
  margin-top: 17px;
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

const TypeView = styled(View)`
  background-color: ${themeProp('colorType')}
  padding-horizontal: 5px;
  width: 44px;
`;

const Type = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 15px;
`;

const Sort = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 23px;
`;

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
`;

const Name = styled(Text)`
  color: ${themeProp('colorType')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 38px;
  margin-top: -5px;
  margin-right: 5px;
`;


export default observer(BikeFinderCategory);
