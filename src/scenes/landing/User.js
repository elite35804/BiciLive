import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Image as DefaultImage} from 'react-native';
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
import {moderateScale} from 'react-native-size-matters';
import {ErrorView} from '../../components/controls/BaseUtils';
import {toJS} from 'mobx';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const Dashboard = props => {
  const {dashboard} = useStores();
  if (dashboard.isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><DefaultImage
      style={{width: moderateScale(70), height: moderateScale(70), resizeMode: 'contain', marginTop: 14}}
      source={Images.icons.ic_loading}/></View>;
  } else {
    if (dashboard.errorIf) {
      return <ErrorView/>;
    } else {
      const uiData = toJS(dashboard.data);
      const titleData1 = uiData.shift();
      const titleData2 = uiData.shift();
      return (
        <Container>
          <Title size={'40px'} color={titleData1.colore} width={'35px'}>{titleData1.titolo.toUpperCase()}</Title>
          <Divider size={20}/>
          <ItemView>
            <Image width={'100%'} height={'100%'} source={Images.icons.ic_user_sm}/>
            <Title size={'10px'} color={titleData2.colore} width={'35px'}>{titleData2.titolo.toUpperCase()}</Title>
          </ItemView>

          {/*<Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>DASHBOARD</Title>*/}
          {/*<Divider size={20}/>*/}
          {/*<ItemView>*/}
            {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_user_sm}/>*/}
            {/*<Title size={'10px'} color={themeProp('colorDescription')} width={'35px'}>ACCOUNT</Title>*/}
          {/*</ItemView>*/}
          <View style={{paddingHorizontal: 10, marginBottom: 30}}>
            {uiData.map(item => {
              if (item.id === 'TITLED_TEXT')
                return <View style={{marginTop: 30}}>
                <Text style={{color: item.title_color, fontSize: 20, fontFamily: UniSansSemiBold}}>{item.title}</Text>
                <Text
                  style={{color: item.text_color, fontSize: 20, fontFamily: UniSansBook}}>{item.text}</Text>
              </View>
            })}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>EMAIL</Text>*/}
              {/*<Text*/}
                {/*style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>riccardo.severgnini@gmail.com</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>PASSWORD</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>••••••••••••••</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>NOME</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>Riccardo</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>COGNOME</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>Severgnini</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>CITTÀ</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>Milano</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>ETÀ</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>26</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>SESSO</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>Uomo</Text>*/}
            {/*</View>*/}
            {/*<View style={{marginTop: 30}}>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansSemiBold}}>CATEGORIE PREFERITE</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
              {/*<Text style={{color: '#333333', fontSize: 20, fontFamily: UniSansBook}}>e-MTB</Text>*/}
            {/*</View>*/}
          </View>

        </Container>
      );
    }
  }
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
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
