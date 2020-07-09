import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Platform, Linking, Dimensions, Image, AsyncStorage} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, PasswordInput, BaseSelect, CustomSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import { useNavigation } from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Header} from '../../components/controls/BaseUtils';
import Images from 'res/Images';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const Login = props => {
  const navigation = useNavigation();
  const {auth, alert, hud, question, bikeData, brandData} = useStores();

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
      alert.showSuccess('Login effettuato con successo');
      AsyncStorage.setItem('biciliveUser', auth.token);
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
    <View style={{flex: 1}}>
      {isIOS &&
      <Header>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
          <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                 style={{
                   position: 'absolute',
                   left: 0,
                   width: isIOS ? scale(35) : scale(37),
                   height: isIOS ? verticalScale(19) : verticalScale(23),
                   resizeMode: 'contain',
                   marginTop: verticalScale(14),
                 }}/>
        </TouchableOpacity>
      </Header>}
    <Container style={{flex: 1}}>
      <Title>LOGIN</Title>
      <View style={{alignItems: 'center', marginBottom: -5}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange={(value) => auth.setLoginParam('user', value)}/>
        <PasswordInput required={true} placeholder="PASSWORD"
                       onChange={(value) => auth.setLoginParam('pass', value)}/>
      </View>
      <LinkText onPress={() => navigation.navigate('PasswordEmail')}>Password dimenticata?</LinkText>

      <Bottom>
        <WhiteButton onPress={() => onLogin()}>LOGIN</WhiteButton>
      </Bottom>
    </Container>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-horizontal: 5px;
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(0)}
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
  margin-bottom: 0;
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
