import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {toJS} from 'mobx';
import { get } from 'lodash';
import BikeFinderCategory from './BikeFinderCategory';


const BikeFinder = props => {
  const {staticData, category} = useStores();
  console.log("search_landing", toJS(staticData.data.search_landing));
  const lastItem = staticData.data.search_landing.pop();
  staticData.data.search_landing.pop();
  const goToCategory = (id, title) => {
    console.log('id====', id);
    switch (true) {
      case (id === 2):
        Actions.BikeFinderAZ();
        break;
      case (id>=4 && id<=10):
        category.setId(id, title);
        Actions.BikeFinderCategory();
        break;
      default:
    }
  };
  return (
    <View style={{flex:1}}>
      <Container>
        {/*<Title size={'40px'} color={themeProp('colorThird')}>EBIKE FINDER</Title>*/}
        {/*<Divider size={'15px'}/>*/}
        {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
        {/*<TouchableOpacity onPress={() => Actions.BikeFinderAZ()}><Title size={'0'} color={themeProp('colorThird')}>A-Z</Title></TouchableOpacity>*/}
        <Divider size={'40px'}/>
        {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
        {get(staticData, 'data.search_landing', []).map((item, i) => {
          return (<View>
            <TouchableOpacity key={i} onPress={() => goToCategory(i, item.titolo)}><Title size={'0'} color={item.colore}>{item.titolo}</Title></TouchableOpacity>
              {(i === 0 ||i === 2) && <Divider size={15}/>}
          </View>)
        })}
        {/*<CategoryText>TUTTIIMODELLI</CategoryText>*/}
        {/*<BaseTextInput placeholder={lastItem.title}/>*/}
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
