import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Platform, Linking} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, CustomSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const Login = props => {
  const navigation = useNavigation();
  const {auth, alert, hud, question, bikeData, brandData} = useStores();
  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const routeName = url.split('://')[1];
    if (routeName.includes('??')) {
      const type = routeName.split('??')[0];
      const data = routeName.split('??')[1].split('==')[1];
      console.log('data===========', data);
      if (type === 'Product') {
        bikeData.clearData()
        bikeData.getData(data);
      }
      if (type === 'Brand') {
        brandData.clearData()
        brandData.getData(data);
      }
      navigation.navigate(type, {url: url});
    } else {
      navigation.navigate(routeName);
    }
  };
  useEffect(() => {
    Linking.addEventListener('url', event => navigate(event.url))
    return () => Linking.removeEventListener('url', event => navigate(event.url));
  }, []);
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
        navigation.navigate('Survey');
      } else {
        navigation.navigate('Home');
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
      <View style={{alignItems: 'center'}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange={(value) => auth.setLoginParam('user', value)}/>
        <BaseTextInput required={true} isPassword={true} placeholder="PASSWORD"
                       onChange={(value) => auth.setLoginParam('pass', value)}/>
      </View>

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
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const Title = styled(Text)`
  font-size: 35px;
  color: #7cd9d0
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: 40px;
  padding-left: 8px;
  margin-bottom: 10px
`;

const Bottom = styled(TouchableOpacity)`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
`;

export default Login;
