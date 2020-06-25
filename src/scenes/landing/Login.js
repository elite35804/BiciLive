import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Platform, Linking, Dimensions} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, CustomSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const Login = props => {
  const navigation = useNavigation();
  const {auth, alert, hud, question, bikeData, brandData} = useStores();
  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const type = url.includes('/ebike/') ? 'Product' : 'Brand';
    const data = url.split('data=')[1].replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%3D/g, '=');
    if (type === 'Product') {
      bikeData.clearData();
      bikeData.getData(data);
    } else {
      brandData.clearData();
      brandData.getData(data);
    }
    navigation.navigate(type, {url: type});
  };
  // useEffect(() => {
  //   Linking.addEventListener('url', event => navigate(event.url))
  //   return () => Linking.removeEventListener('url', event => navigate(event.url));
  // }, []);
  const onLogin = async () => {
    for (let [key, value] of Object.entries(auth.loginData)) {
      if (key === 'user' && !validationEmail(value)) {
        alert.showWarn('Questo campo è obbligatorio', 'Email'.toUpperCase());
        return;
      }
      if (value === '') {
        alert.showWarn('Questo campo è obbligatorio', key.toUpperCase());
        return;
      }
    }
    hud.show();
    await auth.login();
    hud.hide();
    if (auth.loginState) {
      alert.showSuccess('Login effettuato con successo', 'Login');
      if(auth.next_page === 'survey') {
        await question.getData(auth.token);
        navigation.replace('Survey');
      } else {
        navigation.replace('Home');
      }
    } else {
      alert.showInfo(auth.err_string, 'Login non riuscito');
    }
  };

  const validationEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container>
      <Title>LOGIN</Title>
      <View style={{alignItems: 'center', marginBottom: -5}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange={(value) => auth.setLoginParam('user', value)}/>
        <BaseTextInput required={true} isPassword={true} placeholder="PASSWORD"
                       onChange={(value) => auth.setLoginParam('pass', value)}/>
      </View>
      <LinkText onPress={() => navigation.navigate('PasswordEmail')}>Password dimenticata?</LinkText>

      <Bottom>
        <WhiteButton onPress={() => onLogin()}>LOGIN</WhiteButton>
      </Bottom>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    flex: 1;
    padding-horizontal: 5px;
    padding-top: ${isIOS ? '20px' : '0px'}
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const Title = styled(Text)`
  font-size: 35px;
  color: #7cd9d0
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: 40px;
  padding-left: ${ratio < 1.5 ? '20px' : '8px'};
  margin-bottom: 10px
`;

const Bottom = styled(TouchableOpacity)`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  padding-horizontal: ${ratio < 1.5 ? '10px' : '0px'}
`;

const LinkText = styled(Text)`
  margin-left: 7px;
  color: #909090;
  margin-bottom: 25px
  font-size: 17px
  padding-left: ${ratio < 1.5 ? '15px' : '0px'};
`;

export default Login;
