import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {DivideLine, ListBikeInfo, Divider} from '../../components/controls/BaseUtils';


const swipeoutBtns = [
  {
    component: (
      <View>
        <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', height: '50%', justifyContent: 'center'}}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', height: '50%', justifyContent: 'center'}}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
        </TouchableOpacity>
      </View>
    )
  }
];

const data = ["", "", "", "", "", "", "", "", "", "", "", ""];

const Brand = props => {

  return (
      <Container>
        <Title size={'40px'} color={themeProp('colorPrimary')} width={'35px'}>DASHBOARD</Title>
        <Divider size={20}/>
        <ItemView>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_sm}/>
          <Title size={'10px'} color={themeProp('colorThird')} width={'35px'}>EBIKE</Title>
        </ItemView>
        <SwipeListView
          data={data}
          renderItem={(data, rowMap) => (
            <View style={{backgroundColor: 'white'}}>
              <ListBikeInfo/>
              <Image width={'100%'} height={'100%'} source={Images.icons.ic_line} style={{width: '120%', marginVertical: 20}}/>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={{alignItems: 'flex-end', marginBottom: 45}}>
              <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-80}
        />
      </Container>
  );
};

const Container = styled(View)`
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


export default Brand;
