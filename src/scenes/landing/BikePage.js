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
import { useNavigation } from '@react-navigation/native';
const isIOS = Platform.OS === "ios";

const BikePage = props => {
  const navigation = useNavigation();
  const [isLike, setLike] = useState(false);
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('BrandPage')} style={{position: 'absolute', left: 0, top: 165, zIndex: 10000000}}>
        <Image width={50} height={100} resizeMode="stretch" source={Images.btn.btn_back} style={{width: 37, height: 75}}/></TouchableOpacity>
      <View style={{paddingHorizontal: 10, marginTop: 40}}>
        <MainBikeInfo isBack={true}/>
        <ShareView>
          <ShareIcon>
            <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
            <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare} style={{marginLeft: 25}}/>
          </ShareIcon>
          <ShareTooltip/>
        </ShareView>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <DescText>Bosh, Performance CX</DescText>
        <SwipeView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.icons.ic_light} style={{marginBottom: 20, height: 70}} />
              <ItemText>250</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>WATT</ItemSymbol>
            </View>
          </ItemView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain"  source={Images.icons.ic_graph_lg} style={{marginBottom: 20, height: 70}} />
              <ItemText>75</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>Nm</ItemSymbol>
            </View>
          </ItemView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.icons.ic_connect} style={{marginBottom: 20, height: 70}} />
              <ItemText>SI</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>LCD</ItemSymbol>
            </View>
          </ItemView>
        </SwipeView>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <DescText>Bosh, Performance CX</DescText>
        <SwipeView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.icons.ic_volt} style={{marginBottom: 20, height: 70}} />
              <ItemText>n.d.</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>VOLTS</ItemSymbol>
            </View>
          </ItemView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain"  source={Images.icons.ic_battery_lg} style={{marginBottom: 20, height: 70}} />
              <ItemText>625</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>Wh</ItemSymbol>
            </View>
          </ItemView>
          <ItemView>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5, marginTop: 5}}>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_info_black} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
              <Image width={'100%'} height={'100%'} resizeMode="contain" source={Images.icons.ic_velocity} style={{marginBottom: 20, height: 70}} />
              <ItemText>25</ItemText>
              <View style={{marginTop: -10}}/>
              <ItemSymbol>KM/H</ItemSymbol>
            </View>
          </ItemView>
        </SwipeView>
        <CategoryText>TUTTIIMODELLI</CategoryText>
        <Detail title="TELAIO" desc="Carbonio/Alu" />
        <Detail title="PESO (KG)" desc="n.d." />
        <Detail title="TAGLIE" desc="S-M-L-XL" />
        <SubTitle>COMPONENTI</SubTitle>
        <DetailMore title="FORCELLA" desc="FOX, 36 Float Factory, Aria, 180"/>
        <DetailMore title="AMMORTIZZATORE" desc="FOX, Float X2 Factory, Aria"/>
        <Detail title="ESCURSIONE POSTERIORE(MM)" desc="180"/>
        <Detail title="DERAGLIATORE ANTERIORE" desc="/"/>
        <Detail title="TRASMISSIONE" desc="SR EX1, EX1, Trigger switch, 1x8"/>
        <Detail title="FRENI" desc="Disco, Magura MT7, 203/203"/>
        <SubTitle>CICLISTICA</SubTitle>
        <SwipeView>
          <View style={{width: '48%'}}>
            <View style={{backgroundColor: '#D75A2B', alignItems: 'center', justifyContent: 'center', height: 30, paddingTop: 5}}>
              <Text style={{fontSize: 15, color: 'white', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginHorizontal: 10}}>ANTERRIRE</Text>
            </View>
            <View style={{backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center', height: 100, paddingTop: 5}}>
              <Text style={{fontSize: 60, color: 'white', fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold'}}>n.d.</Text>
              <Text style={{fontSize: 17, color: 'white', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: -10}}>POLLICI</Text>
            </View>
            <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>
              <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 3}}>ROUTA</Text>
              <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: 7}}>DT Swiss FR1950</Text>
              <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 10}}>GOMMA</Text>
              <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: 7}}>SW Magic Mary</Text>
            </View>
          </View>
          <View style={{width: '48%'}}>
            <View style={{backgroundColor: '#D75A2B', alignItems: 'center', justifyContent: 'center', height: 30, paddingTop: 5}}>
              <Text style={{fontSize: 15, color: 'white', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginHorizontal: 10}}>ANTERRIRE</Text>
            </View>
            <View style={{backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center', height: 100, paddingTop: 5}}>
              <Text style={{fontSize: 60, color: 'white', fontFamily: isIOS ? 'UniSansBold' : 'uni_sans_bold'}}>n.d.</Text>
              <Text style={{fontSize: 17, color: 'white', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: -10}}>POLLICI</Text>
            </View>
            <View style={{backgroundColor: '#F2F2F2', alignItems: 'center', height: 190, paddingTop: 15}}>
              <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 3}}>ROUTA</Text>
              <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: 7, textAlign: 'center'}} numberOfLines={2}>DT Swiss, FR1950 FR1950</Text>
              <Text style={{fontSize: 16, color: '#D75A2B', fontFamily: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold', marginTop: 10}}>GOMMA</Text>
              <Text style={{fontSize: 20, color: 'black', fontFamily: isIOS ? 'UniSansBook' : 'uni_sans_book', marginTop: 7}}>SW Magic Mary</Text>
            </View>
          </View>
        </SwipeView>
        <ShareView>
          <ShareIcon>
            <TouchableOpacity onPress={() => setLike(!isLike)}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red : Images.icons.ic_heart} /></TouchableOpacity>
            <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare} style={{marginLeft: 25}}/>
          </ShareIcon>
          <ShareTooltip/>
        </ShareView>
        <View style={{backgroundColor: '#333333', width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 8}}>
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
        <Divider size={10} />
        <Step />
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
        <Divider size={10} />
        <View style={{backgroundColor: '#333333', width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 8}}>
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
        <Divider size={10} />
      </View>
      <Step />
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
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


export default BikePage;
