import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Linking} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {toJS} from 'mobx';
import {isIOS} from 'rn-tooltip/src/helpers';
import { useNavigation } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const preProcess = (rawData, filter = '') => {
  const title = rawData.shift();
  const filterPlaceholder = rawData.shift();
  const filterData = {};
  let color = "";
  rawData.map(item => {
    if (item.id === "TITLE" && !(item.titolo in filterData)) {
      let titleData = [];
      rawData.map(subItem => {
        if (subItem.id === "FILTERABLE_LIST_ITEM" && subItem.titolo.charAt(0) === item.titolo && subItem.titolo.includes(filter.toUpperCase())) {
          titleData.push(subItem);
        }
      });
      if (titleData.length) filterData[item.titolo] = titleData;
      color = item.colore;
    }
  });
  return {title, filterPlaceholder, filterData, color};
};

const BikeFinderAZ = props => {
  const navigation = useNavigation();
  const {staticData, brandData, bikeData} = useStores();
  const [filter, setFilter] = useState('');
  const rawData = toJS(staticData.data.brand_search_page);
  const {title, filterPlaceholder, filterData, color} = preProcess(rawData, filter);

  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const routeName = url.split('://')[1];
    if (routeName.includes('??')) {
      const type = routeName.split('??')[0];
      const data = routeName.split('??')[1].split('==')[1];
      console.log('data===========', data);
      if (type === 'Product') {
        bikeData.clearData()
        bikeData.getData(data);
      }
      if (type === 'Brand') {
        brandData.clearData()
        brandData.getData(data);
      }
      navigation.navigate(type, {url: url});
    } else {
      navigation.navigate(routeName);
    }
  };
  useEffect(() => {
    Linking.addEventListener('url', event => navigate(event.url))
    return () => Linking.removeEventListener('url', event => navigate(event.url));
  }, []);

  const goToBrand = (url) => {
    brandData.clearData();
    brandData.getData(url);
    navigation.navigate('Brand', {url: url});
  };

  return (
    <View style={{flex:1}}>
      <Container>
        <Title size={'40px'} color={themeProp('colorThird')} width={'35px'}>{title.titolo}</Title>
        <Divider size={'5px'}/>
        <BaseTextFilter placeholder={filterPlaceholder.name} onEndEditing={(f) => setFilter(f)}/>
        <Divider size={'30px'}/>
        <CategoryText>A - Z</CategoryText>
        <Divider size={'10px'} />

        {Object.entries(filterData).map(([key, value]) => {
          // console.log('data=======', key,value);
          return (
            <View key={key}>
              <Divider size={'10px'} />
              <TouchableOpacity><Title size={'0'} color={color} width={'50px'}>{key}</Title></TouchableOpacity>
              <FlatList
                data={value}
                keyExtractor={(item, index) => `company_${index}`}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => goToBrand(item.url)}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                      paddingHorizontal: 13, paddingVertical: 3, paddingTop: -10, paddingBottom:10, backgroundColor: index % 2 ? item.bg_color_even : item.bg_color_odd}}>
                      <ListText>{item.titolo}</ListText>
                      <Badge>
                        <BadgeCount>{item.count}</BadgeCount>
                      </Badge>
                    </View>
                    </TouchableOpacity>
                  )}}
              />
            </View>
          )
        })}
        {/*<TouchableOpacity><Title size={'0'} color={themeProp('colorThird')} width={'50px'}>A</Title></TouchableOpacity>*/}
        {/*<FlatList*/}
          {/*data={data}*/}
          {/*keyExtractor={(item, index) => `company_${index}`}*/}
          {/*renderItem={({ item, index }) => {*/}
            {/*return (*/}
            {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',*/}
               {/*paddingHorizontal: 13, paddingVertical: 3, backgroundColor: (index % 2 === 0) && '#F7F7F7' }}>*/}
              {/*<ListText>{item.name}</ListText>*/}
              {/*<Badge>*/}
                {/*<BadgeCount>{item.count}</BadgeCount>*/}
              {/*</Badge>*/}
            {/*</View>*/}
          {/*)}}*/}
        {/*/>*/}
        <Divider size={'10px'} />
      </Container>
      <Bottom>
        <TouchableOpacity onPress={() => navigation.navigate('BikeFinder')}><Image width={50} height={50} source={Images.icons.ic_arrow_left} /></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}><Image width={50} height={50} source={Images.icons.ic_close} /></TouchableOpacity>
      </Bottom>
    </View>
  );
};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
`;

const Bottom = styled(View)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ListText = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 25px;
  padding-top: 10px;
`;

const Badge = styled(View)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin-top: 10px
`;

const BadgeCount = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-size: 13px;
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${isIOS ? 5 : 0}
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;


const CategoryText = styled(Text)`
  color: ${themeProp('colorBorder')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 32px;
  padding-horizontal: 10px;
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
  padding-horizontal: 10px;
`;


export default BikeFinderAZ;
