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
import {Oswald, UniSansBold, UniSansBook, UniSansHeavy} from '../../utils/fontFamily';
const isIOS = Platform.OS === "ios";

const NewsFinder = props => {
  const [isLike, setLike] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Container>
        <View style={{paddingHorizontal: 10}}>
          <Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>NEWS FINDER</Title>
          <Divider size={20}/>
          <CategoryText>BRAND</CategoryText>
          <BaseTextInput placeholder={"MARCA, MODELLO"}/>
          <CategoryText>CATEGORIE</CategoryText>
          <BaseTextInput placeholder={"MARCA, MODELLO"}/>
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

          <Divider size={20} />
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
          <Divider size={30}/>
        </View>
      </Container>
      <Bottom>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_plus_circle} />
      </Bottom>
    </View>

  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
`;

const Bottom = styled(TouchableOpacity)`
  margin-top: 10px;
  margin-bottom: 31px;
  align-items: center;
  justify-content: center;
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
  color: #E0D9DC;
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 35px;
  margin-top: 10px;
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


export default NewsFinder;
