import React, {useState} from 'react';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import {themeProp} from 'utils/CssUtil';
import {BaseTextInput, BaseSelect, CustomSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {Dimensions, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useStores} from 'hooks/Utils';

const isIOS = Platform.OS === "ios";

const {height, width} = Dimensions.get('window');
const ratio = height/width;


const validationEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
  return re.test(String(email).toLowerCase());
};

const PasswordEmail = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const {auth, alert, hud} = useStores();

  const onSubmit = async () => {
    if (!validationEmail(email)) {
      alert.showWarn('Questo campo è obbligatorio', 'Email'.toUpperCase());
      return;
    }
    hud.show();
    await auth.passwordResetRequest(email);
    hud.hide();
    if (auth.errorIf) {
      alert.showInfo(auth.err_string);
    } else {
      alert.showSuccess(auth.err_string);
      navigation.navigate('Login');
    }

  };
  return (
    <Container>
      <Title>RESET PASSWORD</Title>
      <View style={{alignItems: 'center'}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange={(value) => setEmail(value)}/>
      </View>

      <Bottom>
        <WhiteButton onPress={() => onSubmit()}>RESET</WhiteButton>
      </Bottom>
    </Container>
  );
};

const Container = styled(ScrollView)`
    background-color: #FFFFFF;
    flex: 1;
    padding-horizontal: 5px;
    padding-top: ${isIOS ? '20px' : '0px'}
`;

const Title = styled(Text)`
  font-size: 35px;
  color: #7cd9d0
  font-family: ${isIOS ? 'UniSansHeavy' : 'uni_sans_heavy'};
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

export default PasswordEmail;