import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import ShareTooltip from 'components/controls/ShareTooltip';
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
  DetailMore
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {Oswald, UniSansBold, UniSansBook} from '../../utils/fontFamily';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {get} from 'lodash';
const isIOS = Platform.OS === "ios";

const Expandible_Wrapper = props => {
  const [isCollapse, setCollapse] = useState(false);
  return <View>
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse(!isCollapse)}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image width={'100%'} height={'100%'} source={isCollapse ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
        <Title size={'0'} color={'#'+get(props, 'data.color', 'D75A2B')} width={'35px'}>{get(props, 'data.title', 'eCity')}</Title>
      </View>
      <Badge><BadgeCount>{get(props, 'data.count', '34')}</BadgeCount></Badge>
    </TouchableOpacity>
    {isCollapse &&<View style={{marginTop: 25, marginBottom: 10}}>
      {props.data.content.map((item, index) => {
        if (item.id === "BIKE_RESUME_SMALL") return <View><ListBikeInfo key={index} data={item}/><Divider size={40}/><DivideLine/></View>
        if (item.id === "BIKE_RESUME_BIG") return <View><MainBikeInfo key={index} data={item}/><Divider size={40}/><DivideLine/></View>
      })}
      {/*<MainBikeInfo/>*/}
      {/*<Divider size={40}/>*/}
      {/*<DivideLine/>*/}
      {/*<MainBikeInfo/>*/}
      {/*<Divider size={40}/>*/}
      {/*<DivideLine/>*/}
      {/*<MainBikeInfo/>*/}
      {/*<Divider size={40}/>*/}
      {/*<DivideLine/>*/}
      {/*<MainBikeInfo/>*/}
      {/*<Divider size={40}/>*/}
    </View>
    }
  </View>
};

const ImageReel = (props) => {
  const {brandData} = useStores();
  const goToBrand = (url) => {
    console.log('url=====', url);
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
const BrandPagePremium = props => {
  const {brandData} = useStores();
  // const [titleData, setTitleData] = useState({});
  const uiData = toJS(brandData.data);
  const [isLike, setLike] = useState(false);
  const {bikeData} = useStores();
  if (Object.keys(uiData).length !== 0) {
    let titleData = {};
    console.log('111111==========', uiData);
    if (uiData[0].id === "TITLE") {
      titleData = uiData.shift();
    }
    // setTitleData(uiData.shift());
    console.log('==========', uiData, titleData);
    const goToBike = url => {
      bikeData.getData(url);
      Actions.BikePagePremium();
    }
    return (
      <Container>
        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          {Object.keys(titleData).length !== 0 && <TitleText color={get(titleData, 'colore', '#000000')}>{get(titleData, 'titolo', 'KOGA')}</TitleText>}
          {uiData.map((item, index) => {
            if (item.id === "TITLE") return  <View><Divider size={-10}/><CategoryText color={item.colore}>{item.titolo}</CategoryText></View>
            if (item.id === "SHARE_BLOCK") return <View><ShareView>
              <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
              <ShareTooltip/>
            </ShareView>
            </View>
            if (item.id === "EXPANDIBLE_WRAPPER_BADGE") return <View><Expandible_Wrapper key={index} data={item}/><Divider size={5}/></View>
            if (item.id === "IMAGE_REEL") return <ImageReel key={`key${index}`} data={item}/>
            if (item.id === "BIKE_RESUME_SMALL") return <View><ListBikeInfo key={index} data={item} goToBike={goToBike}/></View>
            if (item.id === "BIKE_RESUME_BIG") return <View><Divider size={30}/><MainBikeInfo key={index} data={item} goToBike={goToBike}/><Divider size={60}/></View>
            if (item.id === "BRAND_LOGO_BIG")
              return <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{width: 200, height: 200, resizeMode: 'contain', marginTop: -30}}
                  source={{uri: get(item, 'img', '')}}/>
                {/*<Image width={'100%'} height={'100%'} source={Images.background.haibike_lg} />*/}
                <Text style={{color: themeProp('colorDescription'), fontSize: 15, marginTop: -30, fontFamily: UniSansBook,lineHeight: 20}}>
                  {item.text}
                </Text>
              </View>
          })}
          {/*<View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.background.haibike_lg} />*/}
          {/*<Text style={{color: themeProp('colorDescription'), fontSize: 15, fontFamily: UniSansBook, marginTop: 30, lineHeight: 20}}>*/}
          {/*Il top di gamma Nduro 10.0 27.5” monta il motore Flyon da 120 Nm di potenza e batteria da 630 Wh. Il montaggio prevede sospensioni FOX Factory da 180 mm, cambio Sram EX1 a 8 rapporti e freni a disco Magura MT7. Di serie il faro anteriore Skybeamer 5000 lumen e luci Twin Tail al post.*/}
          {/*</Text>*/}
          {/*</View>*/}
          {/*<ShareView>*/}
          {/*<TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>*/}
          {/*<ShareTooltip/>*/}
          {/*</ShareView>*/}
          {/*<Divider size={-10}/>*/}
          {/*<CategoryText>IN EVIDENZA</CategoryText>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={50} />*/}
          {/*<Step/>*/}
          {/*<Divider size={-30}/>*/}
          {/*<CategoryText>TUTTI I MODELLI</CategoryText>*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse(!isCollapse)}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={isCollapse ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#D75A2B'} width={'35px'}>eMTB</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*{isCollapse &&<View style={{marginBottom: 10}}>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*</View>*/}
          {/*}*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse1(!isCollapse1)}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={isCollapse1 ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#E08330'} width={'35px'}>eCITY</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*{isCollapse1 &&<View style={{marginBottom: 10}}>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*</View>*/}
          {/*}*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#509F48'} width={'35px'}>eTREKKING</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#85B73F'} width={'35px'}>eSTRADA</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#3968AE'} width={'35px'}>ePIEGHEVOLI</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#1884ae'} width={'35px'}>eCARGO</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>*/}
          {/*<Title size={'0'} color={'#78ae6a'} width={'35px'}>eBAMBINO</Title>*/}
          {/*</View>*/}
          {/*<Badge><BadgeCount>34</BadgeCount></Badge>*/}
          {/*</TouchableOpacity>*/}
          {/*<NewsView>*/}
          {/*<Title size={'0'} color={themeProp('colorPrimary')} width={'32px'}>NEWS</Title>*/}
          {/*<Image width={50} height={30} source={Images.background.subtitle}/>*/}
          {/*</NewsView>*/}
          {/*<View>*/}
          {/*<Image width={'100%'} height={'100%'} source={Images.background.bike_logo} style={{width: '100%', height: 184}}/>*/}
          {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
          {/*style={{position:'absolute', right:0, top:0, width:35, height:35}} />*/}
          {/*</View>*/}
          {/*<DescView>*/}
          {/*<DescTitle>BIKE NEWS</DescTitle>*/}
          {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
          {/*</DescView>*/}
          {/*<Date>19/11/2020</Date>*/}
          {/*<Description>TUTTI NUOVI MODELLI E-BIKE 2020{'\n'}DI HAIBIKE</Description>*/}
          {/*<View style={{marginTop: 20}}>*/}
          {/*<View style={{flexDirection: 'row'}}>*/}
          {/*<Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo} style={{width: '50%', height: 80}}/>*/}
          {/*<View style={{paddingLeft: 5}}>*/}
          {/*<Date>19/11/2020</Date>*/}
          {/*<Desc>TUTTI NUOVI MODELLI</Desc>*/}
          {/*<Desc>E-BIKE DI HAIBIKE</Desc>*/}
          {/*</View>*/}
          {/*</View>*/}
          {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
          {/*style={{position:'absolute', right:0, top:0, width:35, height:35}} />*/}
          {/*</View>*/}
          {/*<DescView>*/}
          {/*<DescTitle>BIKE NEWS</DescTitle>*/}
          {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
          {/*</DescView>*/}
          {/*<View style={{marginTop: 20}}>*/}
          {/*<View style={{flexDirection: 'row'}}>*/}
          {/*<Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo} style={{width: '50%', height: 80}}/>*/}
          {/*<View style={{paddingLeft: 5}}>*/}
          {/*<Date>19/11/2020</Date>*/}
          {/*<Desc>TUTTI NUOVI MODELLI</Desc>*/}
          {/*<Desc>E-BIKE DI HAIBIKE</Desc>*/}
          {/*</View>*/}
          {/*</View>*/}
          {/*<Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}*/}
          {/*style={{position:'absolute', right:0, top:0, width:35, height:35}} />*/}
          {/*</View>*/}
          {/*<DescView>*/}
          {/*<DescTitle>BIKE NEWS</DescTitle>*/}
          {/*<Image width={'90%'} height={'100%'} source={Images.background.address}/>*/}
          {/*</DescView>*/}
          <Divider size={30} />
        </View>
      </Container>
    );
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
`;

const Badge = styled(View)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const BadgeCount = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-size: 15px;
  font-family: ${themeProp('fontUniHeavy')}
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
  font-size: 45px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniSemiBold')}
`;

const ItemSymbol = styled(Text)`
  font-size: 20px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniBook')}
`;

const ItemView = styled(View)`
  border-top-width: 7px;
  border-top-color: ${themeProp('colorText')};
  background-color: #F2F2F2;
  width: 32%
`;

const SwipeView = styled(View)`
  flex-direction: row;
  justify-content: space-between
`;

const DescText = styled(Text)`
  font-size: 23px;
  color: ${themeProp('colorText')}
  font-family: ${themeProp('fontUniBook')};
  margin-bottom: 10px
`;

const CategoryText = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
`;

const TitleText = styled(Text)`
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
  text-align: center
`

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
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
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

const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export default observer(BrandPagePremium);
