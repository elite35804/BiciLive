import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform, StyleSheet, Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import axios from 'axios';
import {toJS} from 'mobx';
import {get} from 'lodash';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react';


const Stepper = observer(props => {
  const {homeData} = useStores();
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
    currentPosition={homeData.position}
    label={label}
    onPress={p => homeData.position !== p && props.onPress(p - homeData.position)}
  />;
});

const PageElement = props => {
  const {bikeData} = useStores();
  const goToBike = url => {
    bikeData.getData(url);
    Actions.BikePagePremium();
  }
  return (
    <View>
      <LogoView onPress={() => goToBike(get(props, 'data.url', ''))}>
        <Logo width={'100%'} height={'100%'}
              source={{uri: 'http://biciapp.sepisolutions.com' + get(props, 'data.immagine', '')}}
              style={{width: '100%', height: Platform.OS === 'ios' ? 260 : 230}}/>
      </LogoView>
      <Content>
        <TypeView><Type>{get(props, 'data.categoria', '')}</Type></TypeView>
        <Sort>{get(props, 'data.brand', '')}</Sort>
        <NameView>
          <Name>{get(props, 'data.modello', '')}</Name>
          <Image width={20} height={20} source={Images.icons.arrow_right}/>
        </NameView>
      </Content>
    </View>
  );
};
const PageSlider = (props) => {
  const {homeData} = useStores();
  let _swiper = React.useRef(null);
  const total = props.data.content.length;

  return (
    <SwiperContainer>
      <Swiper
        ref={_swiper}
        containerStyle={{height: 330}}
        showsPagination={false}
        index={homeData.position}
        onIndexChanged={(index) => homeData.setPosition(index)}
      >
        {props.data.content.map((item, index) => {
          return  <PageElement key={index} data={item}/>
        })}
        {/*<PageElement data={props.data.content[0]}/>*/}
        {/*<PageElement data={props.data.content[0]}/>*/}
        {/*<PageElement data={props.data.content[0]}/>*/}
        {/*<PageElement data={props.data.content[0]}/>*/}
        {/*<PageElement data={props.data.content[0]}/>*/}

      </Swiper>
      <View style={{width: '115%', alignSelf: 'center'}}>
      <Stepper total={total} onPress={p => _swiper.current.scrollBy(p, true)}/>
      </View>
    </SwiperContainer>
  );
};



const ImageReel = (props) => {
  const {brandData} = useStores();
  const goToBrand = (url) => {
    brandData.getData(url);
    Actions.BrandPagePremium();
  };
  return (
    <CategoryView>
      <TouchableOpacity key="1" onPress={() => {
        goToBrand(get(props, 'data.url1', ''));
      }}><Image
        style={{width: 64, height: 64, resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img1', '')}}/></TouchableOpacity>
      <TouchableOpacity key="2" onPress={() => goToBrand(get(props, 'data.url2', ''))}><Image
        style={{width: 64, height: 64, resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img2', '')}}/></TouchableOpacity>
      <TouchableOpacity key="3" onPress={() => goToBrand(get(props, 'data.url3', ''))}><Image
        style={{width: 64, height: 64, resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img3', '')}}/></TouchableOpacity>
      <TouchableOpacity key="4" onPress={() => goToBrand(get(props, 'data.url4', ''))}><Image
        style={{width: 64, height: 64, resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img4', '')}}/></TouchableOpacity>
      <TouchableOpacity key="5" onPress={() => goToBrand(get(props, 'data.url5', ''))}><Image
        style={{width: 64, height: 64, resizeMode: 'contain'}}
        source={{uri: get(props, 'data.img5', '')}}/></TouchableOpacity>
    </CategoryView>
  );
};

const Finder = () => {
  return (
    <FinderView>
      <Title color={themeProp('colorThird')}>EBIKE FINDER</Title>
      <SubTitle>Cerca la tua bici ideale</SubTitle>
      <TouchableOpacity onPress={() => {
        Actions.BikeFinder();
      }}><Image width={92} height={92} source={Images.btn.bike_finder} style={{marginTop: 14}}/></TouchableOpacity>
    </FinderView>
  );
};

const HomeElements = (props) => {
  const uiData = props.data;
  const items = [];
  uiData.forEach((item, index) => {
    if (item.id === 'PAGED_SLIDER') {
      items.push(<View><PageSlider key={`key${index}`} data={item}/><Divider size={20}/></View>);
    }
    if (item.id === 'TITLE') {
      items.push(<View><Title key={`key${index}`} color={item.colore}>{item.titolo}</Title></View>);
    }
    if (item.id === 'IMAGE_REEL') {
      items.push(<View><Divider size={-20}/><ImageReel key={`key${index}`} data={item}/></View>);
    }
    if (item.id === 'EBIKE_FINDER') {
      items.push(<View><Divider size={-20}/><Finder key={`key${index}`}/></View>);
    }
    items.push(<Divider key={`divider${index}`} size={'25px'}/>);
  });
  return items;
};

const Home = (props) => {
  const {homeData} = useStores();
  if (!homeData.data.content) {
    return <View><Text>There is no data to display</Text></View>;
  }
  const uiData = toJS(get(homeData, 'data.content', []));
  homeData.setPosition(0);
  // console.log('uiData======: ', uiData);

  //
  // const customStyles1 = {
  //   stepIndicatorSize: 25,
  //   currentStepIndicatorSize: 25,
  //   stepIndicatorCurrentColor: themeProp('colorText'),
  //   separatorStrokeWidth: 2,
  //   currentStepStrokeWidth: 13,
  //   stepStrokeCurrentColor: themeProp('colorBorder'),
  //   stepStrokeWidth: 13,
  //   stepStrokeFinishedColor: '#c9c3c5',
  //   stepStrokeUnFinishedColor: '#c9c3c5',
  //   separatorFinishedColor: themeProp('colorBorder'),
  //   separatorUnFinishedColor: '#c9c3c5',
  // };


  return (
    <Container>
      <HomeElements data={uiData}/>
      {/*<View>*/}
      {/*<LogoView onPress={() => Actions.BikePagePremium()}>*/}
      {/*<Logo width={'100%'} height={'100%'} source={Images.background.homeLogo}*/}
      {/*style={{width: '100%', height: Platform.OS === 'ios' ? 260 : 230}}/>*/}
      {/*</LogoView>*/}
      {/*<Content>*/}
      {/*<TypeView><Type>eMTB</Type></TypeView>*/}
      {/*<Sort>HAIBIKE</Sort>*/}
      {/*<NameView>*/}
      {/*<Name>XDURO NDURO 10.0</Name>*/}
      {/*<Image width={20} height={20} source={Images.icons.arrow_right}/>*/}
      {/*</NameView>*/}
      {/*</Content>*/}
      {/*<StepIndicator customStyles={customStyles} currentPosition={3} labels={label}/>*/}
      {/*<Divider size={'30px'}/>*/}
      {/*</View>*/}
      {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
      {/*<Title color={themeProp('colorThird')}>TUTTIIMODELLI</Title>*/}
      {/*<CategoryView>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_1}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_2}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_3}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_4}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_5}/></TouchableOpacity>*/}
      {/*</CategoryView>*/}
      {/*<Divider size={'25px'}/>*/}
      {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
      {/*<CategoryView>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_6}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_7}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_8}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_9}/></TouchableOpacity>*/}
      {/*<TouchableOpacity onPress={() => Actions.BrandPagePremium()}><Image width={64} height={64}*/}
      {/*source={Images.icons.ic_company_10}/></TouchableOpacity>*/}
      {/*</CategoryView>*/}
      {/*<FinderView>*/}
      {/*<Title color={themeProp('colorThird')}>EBIKE FINDER</Title>*/}
      {/*<SubTitle>Cerca la tua bici ideale</SubTitle>*/}
      {/*<TouchableOpacity onPress={() => {*/}
      {/*Actions.BikeFinder();*/}
      {/*}}><Image width={92} height={92} source={Images.btn.bike_finder} style={{marginTop: 14}}/></TouchableOpacity>*/}
      {/*</FinderView>*/}
      {/*<NewsView>*/}
        {/*<Title color={themeProp('colorPrimary')}>NEWS</Title>*/}
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
      {/*<NewsFinderView>*/}
        {/*<Title color={themeProp('colorPrimary')}>NEWS FINDER</Title>*/}
        {/*<SubTitle>Le notize di BiciLive.it</SubTitle>*/}
        {/*<TouchableOpacity onPress={() => Actions.NewsFinder()}>*/}
          {/*<Image width={92} height={92} source={Images.btn.news_finder} style={{marginTop: 14}}/>*/}
        {/*</TouchableOpacity>*/}
      {/*</NewsFinderView>*/}
      {/*<View style={{marginBottom: 30}}/>*/}
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-horizontal: 14px;
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

const Desc = styled(Text)`
  color: #5C5C5C;
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 15px;
`;

const LogoView = styled(TouchableOpacity)`
  width: 100%;
`;

const Logo = styled(Image)`
  resize-mode: contain;
`;

const Content = styled(View)`
  padding-horizontal: 14px;
  margin-left: -15px
`;

const TypeView = styled(View)`
  background-color: ${themeProp('colorType')}
  padding-horizontal: 5px;
  width: 44px;
  margin-bottom: -5px
`;

const Type = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 15px;
`;

const Sort = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 20px;
  margin-bottom: -10px
`;

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
`;

const Name = styled(Text)`
  color: ${themeProp('colorType')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 30px;
  margin-top: -5px;
  margin-right: 5px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
`;

const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const FinderView = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

const NewsFinderView = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 38px;
`;

const SubTitle = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniBook')}
  font-size: 14px;
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
 height: 25px;
`;

const DescTitle = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-family: ${themeProp('fontPrimaryBold')}
  font-size: 13px;
`;

const SwiperContainer = styled(View)`
  width: 100%;
  flex: 1;
`

export default observer(Home);
