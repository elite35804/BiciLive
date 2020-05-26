import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import ShareTooltip from 'components/controls/ShareTooltip';
import StepIndicator from 'react-native-step-indicator';
// import RelatedGroup from 'components/controls/RelatedGroup'
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
  DetailMore,
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {UniSansBold, UniSansBook} from '../../utils/fontFamily';
import axios from 'axios';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

const isIOS = Platform.OS === 'ios';

const BrandLogo = props => {
  return (
    <View>
      <TouchableOpacity onPress={() => Actions.BrandPagePremium()}
                        style={{position: 'absolute', left: 0, top: 240, zIndex: 100000000000}}>
        <Image resizeMode="stretch" source={Images.btn.btn_back}
               style={{width: 37, height: 75}}/></TouchableOpacity>
      <TitleView>
        <Image style={{width: '40%', height: '100%'}} source={{uri: props.data.img}}/>
        <TitleView>
          <View style={{marginRight: 10}}>
            <Text style={{color: themeProp('colorDescription'), fontSize: 15, fontFamily: UniSansBook}}>SCOPRI TUTTE
              LE</Text>
            <TitleView>
              <Text style={{
                color: themeProp('colorDescription'),
                fontSize: 15,
                fontFamily: UniSansBook,
              }}>{get(props, 'data.categoria', '')}</Text>
              <Text style={{
                color: themeProp('colorDescription'),
                fontSize: 15,
                fontFamily: UniSansBold,
              }}>{get(props, 'data.brand', '')}</Text>
            </TitleView>
          </View>
          <Image width={'100%'} height={'100%'} source={Images.icons.arrow_right} style={{marginRight: 10}}/>
          <BadgeView>
            <Title size={isIOS ? '8px' : '0'} color={themeProp('colorSecondary')}
                   width={'20px'}>{props.data.count}</Title>
          </BadgeView>
        </TitleView>
      </TitleView>
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
        <ShareTooltip/>
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
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black}/>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color1', ''),
          marginTop: -1,
        }}>
          <Image width={'100%'} height={'100%'} resizeMode="contain" source={props.order === 1 ? Images.icons.ic_light : Images.icons.ic_volt}
                 style={{marginBottom: 20, height: 70}}/>
          <ItemText color={get(props, 'data.color1', '#000000')}>{get(props, 'data.titolo1')}</ItemText>
          <View style={{marginTop: -7}}/>
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
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black}/>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color2', ''),
          marginTop: -1,
        }}>
          <Image width={'100%'} height={'100%'} resizeMode="contain" source={props.order === 1 ? Images.icons.ic_graph_lg : Images.icons.ic_battery_lg}
                 style={{marginBottom: 20, height: 70}}/>
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
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black}/>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: get(props, 'data.bg_color3', ''),
        }}>
          <Image width={'100%'} height={'100%'} resizeMode="contain" source={props.order === 1 ? Images.icons.ic_connect : Images.icons.ic_velocity}
                 style={{marginBottom: 20, height: 70}}/>
          <ItemText color={get(props, 'data.color3', '#000000')}>{get(props, 'data.titolo3')}</ItemText>
          <View style={{marginTop: -7}}/>
          <ItemSymbol color={get(props, 'data.color3', '#000000')}>{get(props, 'data.subtitolo3')}</ItemSymbol>
        </View>
      </ItemView>
    </SwipeView>
  );
};

const RelatedElements = (item, index) => {
  return (
    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
      {item.map((item0, index) =>
        <View key={index} style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
          <Image style={{width: '100%', height: 60}} source={{uri: item0.img_url}}/>
          <Text style={{
            color: '#909090',
            fontSize: 15,
            fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold',
            marginTop: 10,
          }}>{item0.brand}</Text>
          <Text style={{
            color: '#D75A2B',
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
      let number = index.charAt(index.length - 1);
      let elementData = {
        key: index,
        img_url: data[`img_url${number}`],
        img_date: data[`img_date${number}`],
        brand: data[`brand${number}`],
        modello: data[`modello${number}`],
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
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 8,
      }}>
        <Text style={{
          fontSize: 16,
          color: '#D75A2B',
          fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
          marginTop: 5,
        }}>{get(props, 'data.titolo', '')}</Text>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_close_sm}/></TouchableOpacity>
      </View>
      <View style={{height: 180}}>
        <Swiper ref={_swiper} showsPagination={false} index={swiperState.position}
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


const RenderElements = props => {
  console.log(props);
  const uiData = props.uiData;
  const items = [];
  let i = 0;
  let order = 0;
  uiData.forEach((item, index) => {
    if (item.id === 'BRAND_LOGO_SMALL') {
      items.push(<BrandLogo key={`key${index}`} data={item}/>);
    }
    if (item.id === 'ADV_RESUME_BIG') {
      items.push(<MainBikeInfo isBack={true} style={{marginTop: '20px'}} key={`key${index}`} data={item}/>);
    }
    if (item.id === 'TITLE') {
      items.push(<View><Title key={`key${index}`} color={get(item, 'colore')}>{item.titolo}</Title><SubTitle1 color={get(item, 'sub_color','#ffffff')}>{item.sub}</SubTitle1><Divider size={-25}/></View>);
    }
    if (item.id === "TITLED_TEXT") {
      items.push(<DetailMore key={index} title={item.title} desc={item.text} title_color={item.title_color} text_color={item.text_color}/>)
    }
    if (item.id === "WHEEL_DETAIL_GROUP") {
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
          <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>
            <Text style={{
              fontSize: 16,
              color: '#D75A2B',
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
              color: '#D75A2B',
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
          <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>
            <Text style={{
              fontSize: 16,
              color: '#D75A2B',
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
              color: '#D75A2B',
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
      </SwipeView><Divider size={-30}/></View>)
    }
    if (item.id === 'SHARE_BLOCK') {
      i++;
      if (i === 2) {
        items.push(
          <View>
            {/*<Divider size={-40}/>*/}
            {/*<CategoryText>CARATTERISTICHE</CategoryText>*/}
            {/*<Detail title="TELAIO" desc="Carbonio/Alu"/>*/}
            {/*<Detail title="PESO (KG)" desc="n.d."/>*/}
            {/*<Detail title="TAGLIE" desc="S-M-L-XL"/>*/}
            {/*<Divider size={-20}/>*/}
            {/*<SubTitle>COMPONENTI</SubTitle>*/}
            {/*<DetailMore title="FORCELLA" desc="FOX, 36 Float Factory, Aria, 180"/>*/}
            {/*<DetailMore title="AMMORTIZZATORE" desc="FOX, Float X2 Factory, Aria"/>*/}
            {/*<Detail title="ESCURSIONE POSTERIORE(MM)" desc="180"/>*/}
            {/*<Detail title="DERAGLIATORE ANTERIORE" desc="/"/>*/}
            {/*<Detail title="TRASMISSIONE" desc="SR EX1, EX1, Trigger switch, 1x8"/>*/}
            {/*<Detail title="FRENI" desc="Disco, Magura MT7, 203/203"/>*/}
            {/*<Divider size={-20}/>*/}
            {/*<SubTitle>CICLISTICA</SubTitle>*/}
            {/*<SwipeView>*/}
              {/*<View style={{width: '48%'}}>*/}
                {/*<View style={{*/}
                  {/*backgroundColor: '#D75A2B',*/}
                  {/*alignItems: 'center',*/}
                  {/*justifyContent: 'center',*/}
                  {/*height: 30,*/}
                  {/*paddingTop: 5,*/}
                {/*}}>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 15,*/}
                    {/*color: 'white',*/}
                    {/*fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',*/}
                    {/*marginHorizontal: 10,*/}
                  {/*}}>ANTERRIRE</Text>*/}
                {/*</View>*/}
                {/*<View style={{*/}
                  {/*backgroundColor: '#333333',*/}
                  {/*alignItems: 'center',*/}
                  {/*justifyContent: 'center',*/}
                  {/*height: 100,*/}
                  {/*paddingTop: 5,*/}
                {/*}}>*/}
                  {/*<Text*/}
                    {/*style={{*/}
                      {/*fontSize: 60,*/}
                      {/*color: 'white',*/}
                      {/*fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold',*/}
                    {/*}}>n.d.</Text>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 17,*/}
                    {/*color: 'white',*/}
                    {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                    {/*marginTop: -10,*/}
                  {/*}}>POLLICI</Text>*/}
                {/*</View>*/}
                {/*<View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 16,*/}
                    {/*color: '#D75A2B',*/}
                    {/*fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',*/}
                    {/*marginTop: 3,*/}
                  {/*}}>ROUTA</Text>*/}
                  {/*<Text*/}
                    {/*style={{*/}
                      {/*fontSize: 20,*/}
                      {/*color: 'black',*/}
                      {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                      {/*marginTop: 7,*/}
                    {/*}}>DT*/}
                    {/*Swiss FR1950</Text>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 16,*/}
                    {/*color: '#D75A2B',*/}
                    {/*fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',*/}
                    {/*marginTop: 10,*/}
                  {/*}}>GOMMA</Text>*/}
                  {/*<Text*/}
                    {/*style={{*/}
                      {/*fontSize: 20,*/}
                      {/*color: 'black',*/}
                      {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                      {/*marginTop: 7,*/}
                    {/*}}>SW*/}
                    {/*Magic Mary</Text>*/}
                {/*</View>*/}
              {/*</View>*/}
              {/*<View style={{width: '48%'}}>*/}
                {/*<View style={{*/}
                  {/*backgroundColor: '#D75A2B',*/}
                  {/*alignItems: 'center',*/}
                  {/*justifyContent: 'center',*/}
                  {/*height: 30,*/}
                  {/*paddingTop: 5,*/}
                {/*}}>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 15,*/}
                    {/*color: 'white',*/}
                    {/*fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',*/}
                    {/*marginHorizontal: 10,*/}
                  {/*}}>ANTERRIRE</Text>*/}
                {/*</View>*/}
                {/*<View style={{*/}
                  {/*backgroundColor: '#333333',*/}
                  {/*alignItems: 'center',*/}
                  {/*justifyContent: 'center',*/}
                  {/*height: 100,*/}
                  {/*paddingTop: 5,*/}
                {/*}}>*/}
                  {/*<Text*/}
                    {/*style={{*/}
                      {/*fontSize: 60,*/}
                      {/*color: 'white',*/}
                      {/*fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold',*/}
                    {/*}}>n.d.</Text>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 17,*/}
                    {/*color: 'white',*/}
                    {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                    {/*marginTop: -10,*/}
                  {/*}}>POLLICI</Text>*/}
                {/*</View>*/}
                {/*<View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 16,*/}
                    {/*color: '#D75A2B',*/}
                    {/*fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',*/}
                    {/*marginTop: 3,*/}
                  {/*}}>ROUTA</Text>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 20,*/}
                    {/*color: 'black',*/}
                    {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                    {/*marginTop: 7,*/}
                    {/*textAlign: 'center',*/}
                  {/*}} numberOfLines={2}>DT Swiss, FR1950 FR1950</Text>*/}
                  {/*<Text style={{*/}
                    {/*fontSize: 16,*/}
                    {/*color: '#D75A2B',*/}
                    {/*fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',*/}
                    {/*marginTop: 10,*/}
                  {/*}}>GOMMA</Text>*/}
                  {/*<Text*/}
                    {/*style={{*/}
                      {/*fontSize: 20,*/}
                      {/*color: 'black',*/}
                      {/*fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book',*/}
                      {/*marginTop: 7,*/}
                    {/*}}>SW*/}
                    {/*Magic Mary</Text>*/}
                {/*</View>*/}
              {/*</View>*/}
            {/*</SwipeView>*/}
            <ShareBlock key={`key${index}`} data={item}/>
          </View>,
        );
      } else {
        items.push(<ShareBlock key={`key${index}`} data={item}/>)
      }

    }
    if (item.id === 'ICON_DESCRIPTION_GROUP') {
      order++;
      items.push(<IconDescriptionGroup key={`key${index}`} order={order} data={item}/>);
    }
    if (item.id === 'RELATED_GROUP') {
      items.push(<RelatedGroup key={`key${index}`} data={item}/>);
    }
    items.push(<Divider key={`divider${index}`} size={20}/>);
  });
  return items;
};

const BikePagePremium = props => {
  const {bikeData} = useStores();
  const uiData = toJS(bikeData.data);

  // const [uiData, setUiData] = useState([]);
  // const {swiperState} = useStores();
  // swiperState.setPosition(0);
  // React.useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const result = await axios.get('http://biciapp.sepisolutions.com/api/v1/catalogo/prodotto/brinke/ecity/2020/life-comfort/4308');
  //       setUiData(result.data.content);
  //       console.log('uiData======', uiData);
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log('error===>', e);
  //   }
  // }, []);
  return (
    <Container style={{paddingHorizontal: 10, marginTop: 40}}>
      <RenderElements uiData={uiData}/>

      {/*<NewsView>*/}
        {/*<Title size={'0'} color={themeProp('colorPrimary')} width={'32px'}>NEWS</Title>*/}
        {/*<Image width={50} height={30} source={Images.background.subtitle}/>*/}
      {/*</NewsView>*/}
      {/*<View>*/}
        {/*<Image width={'100%'} height={'100%'} source={Images.background.bike_logo}*/}
               {/*style={{width: '100%', height: 184}}/>*/}
        {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
               {/*style={{position: 'absolute', right: 0, top: 0, width: 35, height: 35}}/>*/}
      {/*</View>*/}
      {/*<DescView>*/}
        {/*<DescTitle>BIKE NEWS</DescTitle>*/}
        {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
      {/*</DescView>*/}
      {/*<Date>19/11/2020</Date>*/}
      {/*<Description>TUTTI NUOVI MODELLI E-BIKE 2020{'\n'}DI HAIBIKE</Description>*/}
      {/*<View style={{marginTop: 20}}>*/}
        {/*<View style={{flexDirection: 'row'}}>*/}
          {/*<Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo}*/}
                 {/*style={{width: '50%', height: 80}}/>*/}
          {/*<View style={{paddingLeft: 5}}>*/}
            {/*<Date>19/11/2020</Date>*/}
            {/*<Desc>TUTTI NUOVI MODELLI</Desc>*/}
            {/*<Desc>E-BIKE DI HAIBIKE</Desc>*/}
          {/*</View>*/}
        {/*</View>*/}
        {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
               {/*style={{position: 'absolute', right: 0, top: 0, width: 35, height: 35}}/>*/}
      {/*</View>*/}
      {/*<DescView>*/}
        {/*<DescTitle>BIKE NEWS</DescTitle>*/}
        {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
      {/*</DescView>*/}
      {/*<View style={{marginTop: 20}}>*/}
        {/*<View style={{flexDirection: 'row'}}>*/}
          {/*<Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo}*/}
                 {/*style={{width: '50%', height: 80}}/>*/}
          {/*<View style={{paddingLeft: 5}}>*/}
            {/*<Date>19/11/2020</Date>*/}
            {/*<Desc>TUTTI NUOVI MODELLI</Desc>*/}
            {/*<Desc>E-BIKE DI HAIBIKE</Desc>*/}
          {/*</View>*/}
        {/*</View>*/}
        {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
               {/*style={{position: 'absolute', right: 0, top: 0, width: 35, height: 35}}/>*/}
      {/*</View>*/}
      {/*<DescView>*/}
        {/*<DescTitle>BIKE NEWS</DescTitle>*/}
        {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
      {/*</DescView>*/}

    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
`;

const BadgeView = styled(View)`
  width: 56px
  height: 56px
  border-radius: 28px
  justify-content: center
  align-items: center
  background-color: red
`;

const TitleView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
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
  font-size: 45px;
  color: ${props => props.color}
  font-family: ${themeProp('fontUniSemiBold')}
`;

const ItemSymbol = styled(Text)`
  font-size: 20px;
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
  font-size: 32px;
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
