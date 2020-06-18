import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform, Dimensions, BackHandler} from 'react-native';
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
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import {ThemeProps} from 'react-native-elements';

const isIOS = Platform.OS === "ios";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const Splash = props => {
  const {staticData, homeData, auth} = useStores();
  useEffect(() => {
    staticData.getData();
    homeData.getData();
    // GoogleSignin.configure({
    //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //   webClientId: '1070159144015-of4kjdl5h5q3cf50vv36njcaiaa3uh8j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   // hostedDomain: '', // specifies a hosted domain restriction
    //   // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //   // accountName: '', // [Android] specifies an account name on the device that should be used
    //   iosClientId: '1070159144015-skqn35jdj9u78qjn6qh7qqj29u740qvq.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // });
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '808976326604-jcrncliu28jglmhebog2tu1au1h387lg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '808976326604-62ut9ho77m6dm5lbp9irk5v9s9rs94h4.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    // const backAction = () => {
    //   console.log('back button clicked');
    //   BackHandler.exitApp();
    //   return true;
    // };
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    // return () => backHandler.remove();
  }, []);
  const initUser = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        // const user = {};
        // user.name = json.name
        // user.id = json.id
        // user.user_friends = json.friends
        // user.email = json.email
        // user.username = json.name
        // user.loading = false
        // user.loggedIn = true
        // user.avatar = setAvatar(json.id)
        console.log('userinfo======', json);
        auth.login(json);
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  const _gAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('uerInfo-======', userInfo);
      auth.login(userInfo.user);

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
  };
  const _fbAuth = () => {
    LoginManager.logInWithPermissions(["email", "public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          console.log('data=======', result);
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log('facebook login data=====',data.accessToken.toString())
              const {accessToken} = data;
              initUser(accessToken)
            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  return (
    <Container>
      <Image source={Images.background.bg_img} style={{position:'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width, resizeMode: 'cover'}}/>
      <ImageView>
        <Logo style={{width : '80%', height: 140, resizeMode: 'contain'}} source={Images.background.logo1}/>
        {/*<Logo width={175} height={50} source={Images.background.title}/>*/}
      </ImageView>
      <View style={{paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 27, fontWeight: 'bold'}}>CERCA, TROVA,</Text>
        <Text style={{textAlign: 'center', fontSize: 27, fontWeight: 'bold'}}>PEDALA...CON LA</Text>
        <Text style={{textAlign: 'center', fontSize: 27, fontWeight: 'bold'}}>TUA NUOVA EBIKE</Text>
      </View>
      <BtnView>
        <BlueButton width={'85%'} height={'55px'} fontSize={'30px'} onPress={() => Actions.Login()}>LOGIN</BlueButton>
        <Divider size="12px"/>
        <WhiteButton width={'85%'} height={'55px'} fontSize={'30px'} backgroudColor={'#333333'} textColor={'#5fdcd2'} borderColor={'#5fdcd2'} onPress={() => Actions.Register()}>REGISTRATI</WhiteButton>
        <Bottom onPress={() => Actions['Home']()}>
          <BottomText>CONTINUA COME OSPITE</BottomText>
        </Bottom>
      </BtnView>
      {/*<SocialBtnView>*/}
                    {/*/!*<GoogleSigninButton*!/*/}
                      {/*/!*style={{ width: 192, height: 48 }}*!/*/}
                      {/*/!*size={GoogleSigninButton.Size.Wide}*!/*/}
                      {/*/!*color={GoogleSigninButton.Color.Dark}*!/*/}
                      {/*/!*onPress={_signIn}/>*!/*/}
        {/*<GoogleBtn onPress={_gAuth}>*/}
          {/*<Image width={20} height={20} source={Images.icons.google}/>*/}
          {/*<IconTitle color="#FF0000">Continue with Google</IconTitle>*/}
          {/*<View width={20}/>*/}
        {/*</GoogleBtn>*/}
        {/*/!*<Divider size="15px"/>*!/*/}
                      {/*/!*<LoginButton*!/*/}
                        {/*/!*onLoginFinished={*!/*/}
                          {/*/!*(error, result) => {*!/*/}
                            {/*/!*if (error) {*!/*/}
                              {/*/!*console.log("login has error: " + result.error);*!/*/}
                            {/*/!*} else if (result.isCancelled) {*!/*/}
                              {/*/!*console.log("login is cancelled.");*!/*/}
                            {/*/!*} else {*!/*/}
                              {/*/!*AccessToken.getCurrentAccessToken().then(*!/*/}
                                {/*/!*(data) => {*!/*/}
                                  {/*/!*console.log('facebook login data=====',data.accessToken.toString())*!/*/}
                                {/*/!*}*!/*/}
                              {/*/!*)*!/*/}
                            {/*/!*}*!/*/}
                          {/*/!*}*!/*/}
                        {/*/!*}*!/*/}
                        {/*/!*onLogoutFinished={() => console.log("logout.")}/>*!/*/}
        {/*<GoogleBtn onPress={_fbAuth}>*/}
          {/*<Image width={20} height={20} source={Images.icons.facebook}/>*/}
          {/*<IconTitle color="#3B5998">Continue with facebook</IconTitle>*/}
          {/*<View width={20}/>*/}
        {/*</GoogleBtn>*/}
      {/*</SocialBtnView>*/}

    </Container>
  );
};

const Container = styled(View)`
    flex: 1;
    height: 100%
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const ImageView = styled(View)`
    align-items: center;
    margin-top: 25px;
`;

const BtnView = styled(View)`
   width: 100%
   alignItems: center
   position: absolute
   bottom: 0
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
  margin-top: 25px;
  align-items: center;
  margin-bottom: 30px;
`;

export default Splash;
