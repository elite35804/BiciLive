import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  BackHandler,
  Linking,
  Dimensions,
} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, PasswordInput, BaseSelect, CustomSelect } from 'components/controls/BaseTextInput';
import BaseSelectBox, {CustomSelectBox} from 'components/controls/BaseSelectBox';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {cities, sesso} from '../../res/data';
import {get} from 'lodash';
import {useActionSheet} from '@expo/react-native-action-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import config from '../../config/Config';
import {Header} from '../../components/controls/BaseUtils';
import {scale, verticalScale} from 'react-native-size-matters';
import Images from 'res/Images';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const SelectElement = (props) => {
  const [brand, setBrand] = useState();
  const { auth } = useStores();
  const {showActionSheetWithOptions} = useActionSheet();
  const data =  get(props, 'data', []);
  const _onOpenActionSheet = () => {
    const options = ['QUALSIASI', ...data];
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
  const { auth, alert, hud, web } = useStores();
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState(null);
  const ageData = [];

  useEffect(() => {
    auth.clearRegisterParam();
  }, []);
  for(let item = 2020; item >= 1920; item--) {
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
      if (key === 'privacy' && value === 0) {
        alert.showWarn("Questo campo è obbligatorio", key.toUpperCase())
        return;
      }
      if (key !== 'sesso' && key !== 'provincia' && key !== 'eta' && value === '') {
        alert.showWarn("Questo campo è obbligatorio", key.toUpperCase())
        return;
      }
    }
    if (auth.registerData.password !== auth.registerData.password_confirm) {
      alert.showWarn("Le password non corrispondono")
      return;
    }
    hud.show();
    await auth.register();
    hud.hide();
    auth.errorIf && alert.showError(auth.err_string, "Registrazione")
    if (!auth.errorIf) {
      alert.showSuccess("Grazie per esserti registrato! A breve riceverai un link di conferma per attivare il tuo account.", "Registrazione", false)
      navigation.replace('Login');
    }
  };

  const validationEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/;
    return re.test(String(email).toLowerCase());
  };

  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer')
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
    <Container>
      <Title>REGISTRAZIONE</Title>
      <View style={{alignItems: 'center'}}>
        <BaseTextInput required={true} placeholder="EMAIL" onChange = {(value) => auth.setParam('email', value)}/>
        <PasswordInput required={true} placeholder="PASSWORD" onChange = {(value) => auth.setParam('password', value)}/>
        <PasswordInput required={true} placeholder="CONFERMA PASSWORD" onChange = {(value) => auth.setParam('password_confirm', value)}/>
        <BaseTextInput required={true} placeholder="NOME" onChange = {(value) => auth.setParam('nome', value)}/>
        <BaseTextInput required={true} placeholder="COGNOME" onChange = {(value) => auth.setParam('cognome', value)}/>
        {/*<BaseTextInput placeholder="CITTÀ" onChange = {(value) => auth.setParam('citta', value)}/>*/}
        <SelectElement title="PROVINCIA DI RESIDENZA " value="provincia" data={cities}/>
        <SelectElement title="ANNO DI NASCITA" value="eta" data={ageData}/>
        {/*<BaseSelect text="ETA" value={displayDate} onPress={() => setShow(true)}/>*/}
        <SelectElement data={sesso} value= "sesso" title="SESSO"/>
      </View>
      <Divider size="35px" />
      {/*<BaseSelectBox checked={checked2} onPress={() => {auth.setParam('privacy', checked2 ? 1 : 0); setChecked2(!checked2); }} text="*/}
      {/*Ho preso visione dell’informativa privacy*/}
      {/*" textMarginTop={'2px'}/>*/}
      <View style={{paddingHorizontal : ratio < 1.5 ? 15 : 0}}>
      <CustomSelectBox checked={checked2} onPress={() => {auth.setParam('privacy', checked2 ? 1 : 0); setChecked2(!checked2); }}>
        <SelectText marginTop={'2px'}>Ho preso visione dell’&nbsp;
            <SelectLinkText onPress={() => openWebViewer(`${config.server}/gdpr/privacy-policy`)}>informativa privacy</SelectLinkText>
          <Text>&nbsp;*</Text>
        </SelectText>
        {/*<TouchableOpacity onPress={() => openWebViewer(`${config.server}/gdpr/pivacy-policy`)}><SelectLinkText>Ho preso visione dell’informativa privacy</SelectLinkText></TouchableOpacity>*/}
      </CustomSelectBox>
      <CustomSelectBox checked={checked} onPress={() => {auth.setParam('dem', checked ? 1 : 0); setChecked(!checked); }}>
        <SelectText>Voglio ricevere informazioni promozionali come indicato al punto 2.d dell’informativa</SelectText>
      </CustomSelectBox>
      <CustomSelectBox checked={checked1} onPress={() => {auth.setParam('terzi', checked1 ? 1 : 0); setChecked1(!checked1); }}>
        <SelectText>Consento alla cessione dei miei dati a soggetti terzi come indicato al punto 2.e dell’informativa</SelectText>
      </CustomSelectBox>
      </View>
      {/*<BaseSelectBox checked={checked} onPress={() => {auth.setParam('dem', checked ? 1 : 0); setChecked(!checked); }} text="*/}
      {/*Voglio ricevere informazioni promozionali come indicato al punto 2.d dell’informativa*/}
      {/*"/>*/}
      {/*<BaseSelectBox checked={checked1} onPress={() => {auth.setParam('terzi', checked1 ? 1 : 0); setChecked1(!checked1); }} text="*/}
      {/*Consento alla cessione dei miei dati a soggetti terzi come indicato al punto 2.e dell’informativa*/}
      {/*"/>*/}
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
      <View style={{marginBottom: 30, paddingHorizontal : ratio < 1.5 ? 20 : 0}}>
        <TextView>
          <NormalText>
            Selezionando il pulsante l’utente dichiara di aver preso visione dei&nbsp;&nbsp;
            <LinkText onPress={() => openWebViewer(`${config.server}/gdpr/tos`)}>Termini e delle condizioni del servizio</LinkText>
          </NormalText>

        </TextView>
      </View>
    </Container>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    flex: 1;
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

const Bottom = styled(View)`
  justify-content: flex-end;
  align-items: center;
  padding-horizontal: ${ratio < 1.5 ? '10px' : '0px'}
`;

const TextView = styled(View)`
  margin-top: 10px
  margin-left: 5px
  font-size: 15px;
  
`;
const NormalText = styled(Text)`
  color: #909090;
`;
const LinkText = styled(Text)`
  color: #909090;
  text-decoration-line: underline
`;

const SelectLinkText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: #909090;
    font-size: 15px;
    text-decoration-line: underline
`;
const SelectText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: #909090;
    font-size: 15px;
    margin-left: 10px;
    margin-top: ${props => get(props, 'marginTop', '-3px')}
`;

export default Register;
