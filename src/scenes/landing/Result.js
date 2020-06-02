import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text, ScrollView, Dimensions, Platform} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import {Step, Divider, CheckBox, Price, Slider, MainBikeInfo, ListBikeInfo, DivideLine} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import axios from 'axios';
import {get} from 'lodash';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import { SwipeListView } from 'react-native-swipe-list-view';

const isIOS = Platform.OS === "ios";

const Result = props => {
  const {bikeSearch} = useStores();
  const uiData = toJS(bikeSearch.data);
  // const [uiData, setUiData] = useState([]);
  // const [titleData, setTitleData] = useState({});
  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const result = await axios.get('http://biciapp.sepisolutions.com/api/v1/demo_search');
  //       setUiData(result.data.content);
  //       setTitleData(uiData.shift());
  //       console.log('titleData======', titleData);
  //       // console.log('uiData======', uiData);
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log('error===>', e);
  //   }
  // }, []);
  if (Object.keys(uiData).length !== 0) {
    return (
      <View style={{flex: 1}}>
        <Container>
          {/*<TitleView>*/}
            {/*<Title size={'0px'} color={themeProp('colorThird')} width={'35px'}>{get(titleData, 'titolo', 'EBIKE FINDER')}</Title>*/}
            {/*<BadgeView>*/}
              {/*<Title size={isIOS ? '8px' : '0'} color={themeProp('colorSecondary')} width={'20px'}>{get(titleData, 'count', '35')}</Title>*/}
            {/*</BadgeView>*/}
          {/*</TitleView>*/}
          {/*<Title size={'-10'} color={themeProp('colorBorder')} width={'35px'}>ORDINA</Title>*/}
          {/*<SortView>*/}
          {/*<SortItem color={'black'}>*/}
          {/*<Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>PREZZO</Text>*/}
          {/*<Image width={7} height={7} source={Images.icons.ic_triangle_down} />*/}
          {/*</SortItem>*/}
          {/*<SortItem color={'#53DCD0'}>*/}
          {/*<Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold', color: '#53DCD0' }}>COPPIA</Text>*/}
          {/*<Image width={7} height={7} source={Images.icons.ic_triangle_up} />*/}
          {/*</SortItem>*/}
          {/*<SortItem color={'black'}>*/}
          {/*<Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>BATTERIA</Text>*/}
          {/*<Image width={7} height={7} source={Images.icons.ic_triangle_down} />*/}
          {/*</SortItem>*/}
          {/*<SortItem color={'black'}>*/}
          {/*<Text style={{fontSize: 15, fontFamily: isIOS ? 'Oswald-SemiBold' : 'oswald_semibold'}}>2020</Text>*/}
          {/*<Image width={7} height={7} source={Images.icons.ic_triangle_down} />*/}
          {/*</SortItem>*/}
          {/*</SortView>*/}
          {uiData.map((item, index) => {
            if (item.id === 'TITLE') {
              return <View><Title size={'-10px'} width={'35px'} color={themeProp('colorBorder')}>{item.titolo}</Title></View>
            }
            if (item.id === "BIKE_RESUME_BIG")
              return <View>
                <SwipeListView
                  data={[""]}
                  renderItem={(data, rowMap) => (<View><MainBikeInfo data={item}/></View>)}
                  renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                      <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                      <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
                    </TouchableOpacity>
                  </View>)}
                  leftOpenValue={0}
                  rightOpenValue={-80}
                />

                <Divider size={40}/>
                <DivideLine/>
              </View>
            if (item.id === "BIKE_RESUME_SMALL")
              return <View>
                <SwipeListView
                  data={[""]}
                  renderItem={(data, rowMap) => (<View><ListBikeInfo data={item}/></View>)}
                  renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{backgroundColor: 'red', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                      <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#53DCD0', alignItems: 'center', width: 70,height: '50%', justifyContent: 'center'}}>
                      <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white} />
                    </TouchableOpacity>
                  </View>)}
                  leftOpenValue={0}
                  rightOpenValue={-80}
                />

                <DivideLine/>
              </View>
            if (item.id === 'AD_BANNER_ENGAGE') {
              return <View><Divider size={20}/><TouchableOpacity><Image style={{width: '100%', height: 130}} source={{uri: item.img}}/></TouchableOpacity><Divider size={30}/></View>
            }
          })}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<ListBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<ListBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<MainBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<ListBikeInfo/>*/}
          {/*<Divider size={40}/>*/}
          {/*<DivideLine/>*/}
          {/*<ListBikeInfo/>*/}
        </Container>
        {/*<Bottom>*/}
        {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_plus_circle} />*/}
        {/*</Bottom>*/}
      </View>
    );
  } else {
    return <View><Text>There is no data to display</Text></View>
  }
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
    padding-horizontal: 10px;
    margin-top: 20px
`;

const TitleView = styled(View)`
  flex-direction: row; 
  justify-content: space-between;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 10px;
`;

const Bottom = styled(TouchableOpacity)`
  margin-top: 10px;
  margin-bottom: 31px;
  align-items: center;
  justify-content: center;
`;

const BadgeView = styled(View)`
  width: 56px
  height: 56px
  border-radius: 28px
  justify-content: center
  align-items: center
  background-color: red
`;

const SortView = styled(View)`
  flex-direction: row
  justify-content: space-between;
  margin-bottom: 20px
`;

const SortItem = styled(View)`
  flex-direction: row;
  justify-content: space-between
  align-items: center
  border-bottom-color: ${props => props.color} 
  border-bottom-width: 2px 
  width: 20%
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
`;

export default observer(Result);
