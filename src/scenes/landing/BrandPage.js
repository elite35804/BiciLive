import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
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
import {Oswald, UniSansBold, UniSansBook, UniSansHeavy} from '../../utils/fontFamily';
import { useNavigation } from '@react-navigation/native';
const isIOS = Platform.OS === "ios";

const BrandPage = props => {
  const [isLike, setLike] = useState(false);
  const [isCollapse, setCollapse] = useState(false);
  const [isCollapse1, setCollapse1] = useState(false);
  return (
    <Container>
      <View style={{paddingHorizontal: 10, marginTop: 40}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: themeProp('colorDescription'), fontSize: 40, fontFamily: UniSansHeavy}}>HAIBIKE</Text>
        </View>
        <ShareView>
          <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
          <ShareTooltip/>
        </ShareView>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse(!isCollapse)}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={isCollapse ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#D75A2B'} width={'35px'}>eMTB</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        {isCollapse &&<View style={{marginBottom: 10}}>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <View style={{backgroundColor: '#333333', width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 8}}>
            <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 5}}>GUARDA ANCHE...</Text>
            <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_close_sm} /></TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
          </View>
          <Divider size={20}/>
          <Step />
        </View>
        }
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => setCollapse1(!isCollapse1)}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={isCollapse1 ? Images.icons.arrow_up : Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#E08330'} width={'35px'}>eCITY</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        {isCollapse1 &&<View style={{marginBottom: 30, marginTop: 10}}>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <DivideLine/>
          <ListBikeInfo/>
          <View style={{backgroundColor: '#333333', width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 8}}>
            <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 5}}>GUARDA ANCHE...</Text>
            <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_close_sm} /></TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
            <View style={{width: '33%', borderLeftColor: '#c9c3c5', borderLeftWidth: 7, paddingHorizontal: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.background.bike_logo2} />
              <Text style={{color: '#909090', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: 10}}>BIANCHI</Text>
              <Text style={{color: '#D75A2B', fontSize: 15, fontFamily: isIOS ? 'Oswald-Bold' : 'oswald_bold', marginTop: -5}}>GYMNASIUM 2.3</Text>
            </View>
          </View>
          <Divider size={20}/>
          <Step />
        </View>
        }
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#509F48'} width={'35px'}>eTREKKING</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#85B73F'} width={'35px'}>eSTRADA</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#3968AE'} width={'35px'}>ePIEGHEVOLI</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#1884ae'} width={'35px'}>eCARGO</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image width={'100%'} height={'100%'} source={Images.icons.arrow_down_sm} style={{marginRight: 10}}/>
            <Title size={'0'} color={'#78ae6a'} width={'35px'}>eBAMBINO</Title>
          </View>
          <Badge><BadgeCount>34</BadgeCount></Badge>
        </TouchableOpacity>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <CategoryView>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_1}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_2}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_3}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_4}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_5}/></TouchableOpacity>
        </CategoryView>
        <Divider size={25}/>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <CategoryView>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_6}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_7}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_8}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_9}/></TouchableOpacity>
          <TouchableOpacity><Image width={64} height={64} source={Images.icons.ic_company_10}/></TouchableOpacity>
        </CategoryView>
        <NewsView>
          <Title size={'0'} color={themeProp('colorPrimary')} width={'32px'}>NEWS</Title>
          <Image width={50} height={30} source={Images.background.subtitle}/>
        </NewsView>
        <View>
          <Image width={'100%'} height={'100%'} source={Images.background.bike_logo} style={{width: '100%', height: 184}}/>
          <Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}
                 style={{position:'absolute', right:0, top:0, width:35, height:35}} />
        </View>
        <DescView>
          <DescTitle>BIKE NEWS</DescTitle>
          <Image width={'90%'} height={'100%'} source={Images.background.address}/>
        </DescView>
        <Date>19/11/2020</Date>
        <Description>TUTTI NUOVI MODELLI E-BIKE 2020{'\n'}DI HAIBIKE</Description>
        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo} style={{width: '50%', height: 80}}/>
            <View style={{paddingLeft: 5}}>
              <Date>19/11/2020</Date>
              <Desc>TUTTI NUOVI MODELLI</Desc>
              <Desc>E-BIKE DI HAIBIKE</Desc>
            </View>
          </View>
          <Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}
                 style={{position:'absolute', right:0, top:0, width:35, height:35}} />
        </View>
        <DescView>
          <DescTitle>BIKE NEWS</DescTitle>
          <Image width={'90%'} height={'100%'} source={Images.background.address}/>
        </DescView>
        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image width={'50%'} height={'100%'} resizeMode="stretch" source={Images.background.bike_logo} style={{width: '50%', height: 80}}/>
            <View style={{paddingLeft: 5}}>
              <Date>19/11/2020</Date>
              <Desc>TUTTI NUOVI MODELLI</Desc>
              <Desc>E-BIKE DI HAIBIKE</Desc>
            </View>
          </View>
          <Image width={100} height={100} resizeMode="stretch" source={Images.icons.ic_badge_empty}
                 style={{position:'absolute', right:0, top:0, width:35, height:35}} />
        </View>
        <DescView>
          <DescTitle>BIKE NEWS</DescTitle>
          <Image width={'90%'} height={'100%'} source={Images.background.address}/>
        </DescView>
        <Divider size={30} />
      </View>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
`;

const CategoryView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
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
  margin-top: 5px;
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

const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 31px;
`;

const ShareView = styled(View)`
  margin-top: 20px;
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


export default BrandPage;
