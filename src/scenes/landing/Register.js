import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Platform, BackHandler} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, CustomSelect } from 'components/controls/BaseTextInput';
import BaseSelectBox from 'components/controls/BaseSelectBox';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {cities, sesso} from '../../res/data';
import {get} from 'lodash';
import {useActionSheet} from '@expo/react-native-action-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const SelectElement = (props) => {
  const [brand, setBrand] = useState();
  const { auth } = useStores();
  const {showActionSheetWithOptions} = useActionSheet();
  const data =  get(props, 'data', []);
  const _onOpenActionSheet = () => {
    const options = ['Cancel', ...data];
    const cancelButtonIndex = 0;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        if (buttonIndex !== 0) {
          auth.setParam(get(props, 'value', ''), data[buttonIndex - 1]);
          setBrand(data[buttonIndex - 1]);
          // Do something here depending on the button index selected
        }

      },
    );
  };
  return <BaseSelect required={true} text={get(props, 'title', '').toUpperCase()} value={brand}
                     onPress={() => _onOpenActionSheet()}/>;
};

const Register = props => {
  const navigation = useNavigation();
  const { auth, alert, hud } = useStores();
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState(null);
  const ageData = [];
  for(let item = 1920; item <= 2020; item++) {
    ageData.push(item.toString());
  }

  const onDateChange = (event, selectedDate)  => {
    setShow(Platform.OS === 'ios');
    setDate(selectedDate);
    setDisplayDate(selectedDate.toString().substring(0,10));
    auth.setParam('eta', selectedDate);
    console.log('======', event, selectedDate);
  };



  const onRegister = async () => {
    for (let [key, value] of Object.entries(auth.registerData)) {
      if (key === 'email' && !validationEmail(value)) {
        alert.showWarn("Questo campo è obbligatorio", 'Email'.toUpperCase())
        return;
      }
      if (value === '') {
        alert.showWarn("Questo campo è obbligatorio", key.toUpperCase())
        return;
      }

    }
    hud.show();
    await auth.register();
    hud.hide();
    auth.errorIf && alert.showError(auth.err_string, "Register")
    if (!auth.errorIf) {
      alert.showSuccess("Grazie per esserti registrato! A breve riceverai un link di conferma per attivare il tuo account.", "Register")
      navigation.navigate('Login');
    }
  };

  const validationEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container>
      <Title>REGISTRAZIONE</Title>
      <View style={{alignItems: 'center'}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange = {(value) => auth.setParam('email', value)}/>
        <BaseTextInput required={true} isPassword={true} placeholder="PASSWORD" onChange = {(value) => auth.setParam('password', value)}/>
        <BaseTextInput required={true} placeholder="NOME" onChange = {(value) => auth.setParam('nome', value)}/>
        <BaseTextInput required={true} placeholder="COGNOME" onChange = {(value) => auth.setParam('cognome', value)}/>
        {/*<BaseTextInput placeholder="CITTÀ" onChange = {(value) => auth.setParam('citta', value)}/>*/}
        <SelectElement title="PROVINCIA" value="provincia" data={cities}/>
        <SelectElement title="ANNO DI NASCITA" value="eta" data={ageData}/>
        {/*<BaseSelect text="ETA" value={displayDate} onPress={() => setShow(true)}/>*/}
        <SelectElement data={sesso} value= "sesso" title="SESSO"/>
      </View>
      <Divider size="60px" />
      <BaseSelectBox checked={checked} onPress={() => {auth.setParam('privacy', checked ? 1 : 0); setChecked(!checked); }} text="
      Lorem Ipsum dolor sit amet, consecteur adipiscing eUt,  sed do elusmod tempor
      "/>
      <BaseSelectBox checked={checked1} onPress={() => {auth.setParam('dem', checked1 ? 1 : 0); setChecked1(!checked1); }} text="
      Lorem Ipsum dolor sit amet, consecteur adipiscing eUt,  sed do elusmod tempor
      "/>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <Bottom>
        <WhiteButton onPress={() => onRegister()}>REGISTRATI</WhiteButton>
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

export default Register;
