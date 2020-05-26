import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import axios from 'axios';

const Splash = props => {
  const {staticData, homeData} = useStores();
  useEffect(() => {
    staticData.getData();
    homeData.getData();
  }, []);
  return (
    <Container>
      <ImageView>
        <Logo width={175} height={175} source={Images.background.logo}/>
        <Logo width={175} height={50} source={Images.background.title}/>
      </ImageView>
      <BtnView>
        <BlueButton>LOGIN</BlueButton>
        <Divider size="19px"/>
        <WhiteButton onPress={() => Actions.Register()}>REGISTRATI</WhiteButton>
      </BtnView>
      <SocialBtnView>
        <GoogleBtn>
          <Image width={20} height={20} source={Images.icons.google}/>
          <IconTitle color="#FF0000">Continue with Google</IconTitle>
          <View width={20}/>
        </GoogleBtn>
        <Divider size="15px"/>
        <GoogleBtn>
          <Image width={20} height={20} source={Images.icons.facebook}/>
          <IconTitle color="#3B5998">Continue with facebook</IconTitle>
          <View width={20}/>
        </GoogleBtn>
      </SocialBtnView>
      <Bottom onPress={() => Actions['Home']()}>
        <BottomText>CONTINUA COME OSPITE</BottomText>
      </Bottom>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorPrimary')};
    flex: 1;
    padding-horizontal: 4px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const ImageView = styled(View)`
    align-items: center;
    margin-top: 85px;
`;

const BtnView = styled(View)`
    align-items: center;
    margin-top: 72px;
`;

const SocialBtnView = styled(View)`
    align-items: center;
    margin-top: 35px;
`;

const BottomText = styled(Text)`
  font-size: 18px;
  color: ${themeProp('colorSecondary')};
  font-family: ${Platform.OS === 'ios' ? 'UniSansBook' : 'uni_sans_book'};
  margin-top: 5px
`;

const Logo = styled(Image)`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const GoogleBtn = styled(TouchableOpacity)`
  height: 50px;
  align-items: center;
  padding-horizontal: 15px;
  justify-content: space-between;
  flexDirection: row;
  width:95%;
  background-color: ${themeProp('colorSecondary')};
`;

const IconTitle = styled(Text)`
  font-size: 20px;
  color: ${props => props.color};
  font-family: ${Platform.OS === 'ios' ? 'UniSansBook' : 'uni_sans_book'};
  margin-top: ${Platform.OS === 'ios' ? '5px' : '0'};
`;

const Bottom = styled(TouchableOpacity)`
  margin-top: 34px;
  align-items: center;
  margin-bottom: 30px;
`;

export default Splash;
