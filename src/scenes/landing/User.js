import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Image as DefaultImage,
  Linking,
  Platform, Dimensions,
} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {
  Divider,
} from 'components/controls/BaseUtils';
import {UniSansBold, UniSansBook, UniSansSemiBold} from '../../utils/fontFamily';
import {observer} from 'mobx-react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ErrorView, Header} from '../../components/controls/BaseUtils';
import {toJS} from 'mobx';
import { useNavigation} from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';


const Dashboard = props => {
  const {account, hud} = useStores();
  const navigation = useNavigation();
  // useEffect(() => {
  //   Linking.addEventListener('url', event => navigate(event.url))
  //   return () => Linking.removeEventListener('url', event => navigate(event.url));
  // }, []);
  if (account.isLoading) {
    hud.show()
  } else {
    if (account.errorIf) {
      return <ErrorView/>;
    } else {
      hud.hide()
      const uiData = toJS(account.data);
      const titleData1 = uiData.shift();
      const titleData2 = uiData.shift();
      return (
        <View style={{flex: 1}}>
          {isIOS && <Header>
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
              <Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight: ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}></Text>
            </TouchableOpacity>
          </Header>}
        <Container>
          <Title size={'40px'} color={titleData1.colore} width={'35px'}>{titleData1.titolo.toUpperCase()}</Title>
          <Divider size={20}/>
          <ItemView>
            <Image style={{width: moderateScale(25), height: moderateScale(25), resizeMode: 'contain', marginTop: isIOS ? -4: 10}} source={Images.icons.ic_user_sm}/>
            <Title size={'10px'} color={titleData2.colore} width={'35px'}>{titleData2.titolo.toUpperCase()}</Title>
          </ItemView>
          <View style={{paddingHorizontal: 10, marginBottom: 30}}>
            {uiData.map(item => {
              if (item.id === 'TITLED_TEXT')
                return <View style={{marginTop: 30}}>
                <Text style={{color: item.title_color, fontSize: 20, fontFamily: UniSansSemiBold}}>{item.title}</Text>
                <Text
                  style={{color: item.text_color, fontSize: 20, fontFamily: UniSansBook}}>{item.text}</Text>
              </View>
            })}
          </View>

        </Container>
        </View>
      );
    }
  }
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-horizontal: 5px;
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(0)}
`;

const ItemView = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}   
  padding-horizontal: 10px; 
`;


export default observer(Dashboard);
