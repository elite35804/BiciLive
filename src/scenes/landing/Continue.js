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
import {BaseTextInput, BaseSelect, CustomSelect } from 'components/controls/BaseTextInput';
import BaseSelectBox, {CustomSelectBox} from 'components/controls/BaseSelectBox';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {cities, sesso} from '../../res/data';
import {get} from 'lodash';
import {useActionSheet} from '@expo/react-native-action-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import config from '../../config/Config';
import {Divider, Header} from '../../components/controls/BaseUtils';
import {scale, verticalScale} from 'react-native-size-matters';
import Images from 'res/Images';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const Continue = props => {
  const navigation = useNavigation();
  const { auth, alert, hud, bikeData, brandData, web } = useStores();
  const [checked, setChecked] = useState(true);

  const onRegister = async () => {
    if (checked) {
      alert.showSuccess('Per continuare la navigazione è obbligatorio prendere visione dell’informativa privacy');
      return;
    }
    navigation.replace('Home');
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
      <Title>INFORMATIVA PRIVACY</Title>
      <Divider size={20}/>
      <View style={{paddingHorizontal : ratio < 1.5 ? 15 : 0}}>
        <CustomSelectBox checked={checked} onPress={() => setChecked(!checked)}>
          <SelectText marginTop={'3px'}>* Ho preso visione dell’&nbsp;
            <SelectLinkText onPress={() => openWebViewer(`${config.server}/gdpr/privacy-policy`)}>informativa privacy</SelectLinkText>
          </SelectText>
        </CustomSelectBox>
      </View>

      <Bottom>
        <WhiteButton onPress={() => onRegister()}>CONTINUA</WhiteButton>
      </Bottom>
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

const SelectLinkText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: #909090;
    font-size: 17px;
    text-decoration-line: underline
`;
const SelectText = styled(Text)`
    font-family: ${isIOS ? 'UniSansBook' : 'uni_sans_book'};
    color: #909090;
    font-size: 15px;
    margin-left: 10px;
    margin-top: ${props => get(props, 'marginTop', '-3px')}
`;

export default Continue;
