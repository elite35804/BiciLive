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

const BikeFinderCategory = props => {

  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [collapse, setCollapsed] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Container>
        <View style={{paddingHorizontal: 10}}>
          <Title size={'40px'} color={themeProp('colorThird')} width={'35px'}>EBIKE FINDER</Title>
          <Title size={'0'} color='#D75A2B' width={'50px'}>eMTB</Title>
          <MainInfo>
            <TouchableOpacity onPress={() => Actions.BikePagePremium()} style={{justifyContent: 'center', alignItems: 'center'}}>
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
              <Sort>HAIBIKE</Sort>
              <NameView>
                <Name>XDURO NDURO 3.5</Name>
                <Image width={20} height={20} source={Images.icons.arrow_right}/>
              </NameView>
              <Sort>5.499€</Sort>
            </View>
          </MainInfo>
          <Divider size={10}/>
          <Step/>
          <Divider size={0}/>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Title1 size={'10px'} color={themeProp('colorThird')} width={'35px'}>CERCA</Title1>
            <SubTitle>*obbigatorio</SubTitle>
          </View>
        </View>
        <View style={{paddingLeft: 13}}>
          <BaseSelect text="ANNO*"/>
          <BaseTextInput placeholder="MARCA, MODELLO"/>
          <BaseSelect text="MARCA EBIKE"/>
          <BaseSelect text="MARCE EBIKE"/>
        </View>
        <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
        <CheckBox checked={checked1} onPress={() => setChecked1(!checked1)} text="PREZZO"/>
        <Price left={1240} right={8499}/>
        <Slider/>
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
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
          <Price left={1240} right={8499}/>
          <Slider/>
          <Divider size={20}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10}}>
            <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
            <Tooltip
              width={275}
              height={140}
              overlayColor={'rgba(0,0,0,0'}
              popover={<Text style={{color: 'white', fontSize: 18, fontFamily: 'UniSansRegular'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </Text>}
              backgroundColor={'black'}
            >
              <Image width={30} height={30} source={Images.icons.ic_info_green}/>
            </Tooltip>
          </View>
          <Price left={1240} right={8499}/>
          <Slider/>
          <Divider size={30}/>
          <Title size={'0'} color={themeProp('colorThird')} width={'30px'}
                 style={{paddingHorizontal: 10}}>SPECIFICHE</Title>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
          <Price left={1240} right={8499}/>
          <Slider/>
          <View style={{paddingLeft: 13, marginVertical: 30}}>
            <BaseSelect text="MARCA EBIKE"/>
          </View>
          <Title size={'0'} color={themeProp('colorThird')} width={'30px'}
                 style={{paddingHorizontal: 10}}>COMPONENTI</Title>
          <View style={{paddingLeft: 13, marginBottom: 30, marginTop: 10}}>
            <BaseSelect text="MARCA EBIKE"/>
            <BaseSelect text="MARCA EBIKE"/>
            <BaseSelect text="MARCA EBIKE"/>
          </View>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
          <Price left={1245} right={8499}/>
          <Slider/>
          <Divider size={30}/>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} text="PREZZO"/>
          <Price left={1245} right={8499}/>
          <Slider/>
        </View>}

      </Container>
      <Bottom>
        <GreenButton onPress={() => Actions.Result()}>CERCA</GreenButton>
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
  margin-bottom: 30px;
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
  font-size: 30px;
  margin-top: -5px;
  margin-right: 5px;
`;


export default BikeFinderCategory;
