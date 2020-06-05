import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const Splash = props => {
  const {staticData, homeData} = useStores();
  useEffect(() => {
    staticData.getData();
    homeData.getData();
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1070159144015-of4kjdl5h5q3cf50vv36njcaiaa3uh8j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '1070159144015-skqn35jdj9u78qjn6qh7qqj29u740qvq.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('uerInfo-======', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log('userInfo erro =========', error);
    }
  }
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
        {/*<GoogleSigninButton*/}
          {/*style={{ width: 192, height: 48 }}*/}
          {/*size={GoogleSigninButton.Size.Wide}*/}
          {/*color={GoogleSigninButton.Color.Dark}*/}
          {/*onPress={_signIn}/>*/}
        <GoogleBtn onPress={_signIn}>
          <Image width={20} height={20} source={Images.icons.google}/>
          <IconTitle color="#FF0000">Continue with Google</IconTitle>
          <View width={20}/>
        </GoogleBtn>
        <Divider size="15px"/>
        {/*<LoginButton*/}
          {/*onLoginFinished={*/}
            {/*(error, result) => {*/}
              {/*if (error) {*/}
                {/*console.log("login has error: " + result.error);*/}
              {/*} else if (result.isCancelled) {*/}
                {/*console.log("login is cancelled.");*/}
              {/*} else {*/}
                {/*AccessToken.getCurrentAccessToken().then(*/}
                  {/*(data) => {*/}
                    {/*console.log(data.accessToken.toString())*/}
                  {/*}*/}
                {/*)*/}
              {/*}*/}
            {/*}*/}
          {/*}*/}
          {/*onLogoutFinished={() => console.log("logout.")}/>*/}
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
