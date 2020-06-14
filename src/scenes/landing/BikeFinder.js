import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {Header} from 'components/controls/BaseUtils'
import {BaseTextInput, BaseSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {toJS} from 'mobx';
import { get } from 'lodash';
import {scale, verticalScale} from 'react-native-size-matters';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const BikeFinder = props => {
  const {staticData, category, bikeSearch} = useStores();
  console.log("search_landing", toJS(staticData.data.search_landing));
  const goToCategory = (id, title, color) => {
    bikeSearch.clearRequest();
    console.log('id====', id);
    switch (true) {
      case (id === 2):
        Actions.BikeFinderAZ();
        break;
      case (id>=4 && id<=10):
        category.setId(id, title, color);
        Actions.BikeFinderCategory();
        break;
      default:
    }
  };
  return (
    <View>
      <Header>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => Actions.pop()}>
          <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                 style={{
                   position: 'absolute',
                   left: 0,
                   width: scale(37),
                   height: verticalScale(23),
                   resizeMode: 'contain',
                   marginTop: verticalScale(14),
                 }}/>
          <Text style={{textAlign: 'center', fontSize: 19, lineHeight: 49}}>EBIKE FINDER</Text>
        </TouchableOpacity>
      </Header>
      <Container>
        <Divider size={25}/>
        {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
        {get(staticData, 'data.search_landing', []).map((item, i) => {
          if (i === 1 || i === 3) return <View><Divider size={15}/><Title size={'0'} color={item.colore}>{item.titolo}</Title></View>
          return (<View>
            <TouchableOpacity key={i} onPress={() => goToCategory(i, item.titolo, item.colore)}><Title size={'0'} color={item.colore}>{item.titolo}</Title></TouchableOpacity>
          </View>)
        })}
      </Container>
      <Bottom onPress={() => Actions.Home()}>
        <Image width={50} height={50} source={Images.icons.ic_close} />
      </Bottom>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    padding-left: 13px;
    marginTop: ${verticalScale(50)}
`;

const Bottom = styled(TouchableOpacity)`
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 16px;
  margin-bottom: 30px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;


const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
`;

const Title = styled(Text)`
  font-size: 35px;
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;


export default BikeFinder;
