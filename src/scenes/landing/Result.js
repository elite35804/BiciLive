import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image as DefaultImage, Linking,
} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {BlueButton, WhiteButton, GreenButton} from 'components/controls/Button';
import {
  Header,
  Step,
  Divider,
  CheckBox,
  Price,
  Slider,
  MainBikeInfo,
  ListBikeInfo,
  DivideLine,
  ErrorView
} from 'components/controls/BaseUtils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {get} from 'lodash';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {SwipeListView} from 'react-native-swipe-list-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
const isIOS = Platform.OS === 'ios';
const AdBlock = props => {
  const navigation = useNavigation();
  const {web} = useStores();
  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer');
  };
  return <View><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image
    style={{width: '100%', height: 130}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>;
};
const Result = props => {
  const navigation = useNavigation();
  const {bikeSearch, hud, bikeData, brandData} = useStores();
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
  if (bikeSearch.isLoading) {
    hud.show()
  } else {
    if (bikeSearch.errorIf) {
      return <ErrorView/>
    } else {
      hud.hide()
      const uiData = toJS(bikeSearch.data);
      console.log('uridata=======', bikeSearch.isLoading, bikeSearch.errorIf, uiData);
      return (
        <View style={{flex: 1}}>
          <Header>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
              <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                     style={{
                       position: 'absolute',
                       left: 0,
                       width: scale(37),
                       height: verticalScale(23),
                       resizeMode: 'contain',
                       marginTop: verticalScale(14),
                     }}/>
              <Text style={{textAlign: 'center', fontSize: 19, lineHeight: 49}}>RISULTATI DI RICERCA</Text>
              <Text style={{
                position: 'absolute',
                right: 10,
                fontSize: 19,
                lineHeight: 49,
                color: '#FB0203',
              }}>{get(uiData[0], 'count', 0)}</Text>
            </TouchableOpacity>
          </Header>
          <Container>
            {get(uiData[0], 'count', 0) === 0 || uiData.map((item, index) => {
              if (item.id === 'TITLE') {
                return <View><Title size={18} width={'35px'}
                                    color={themeProp('colorBorder')}>{item.titolo}</Title></View>;
              }
              if (item.id === 'BIKE_RESUME_BIG') {
                return <View>
                  <SwipeListView
                    data={['']}
                    renderItem={(data, rowMap) => (<View><MainBikeInfo data={item}/></View>)}
                    renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity style={{
                        backgroundColor: 'red',
                        alignItems: 'center',
                        width: 70,
                        height: '70%',
                        justifyContent: 'center',
                      }}>
                        <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white}/>
                      </TouchableOpacity>
                      {/*<TouchableOpacity style={{*/}
                        {/*backgroundColor: '#53DCD0',*/}
                        {/*alignItems: 'center',*/}
                        {/*width: 70,*/}
                        {/*height: '50%',*/}
                        {/*justifyContent: 'center',*/}
                      {/*}}>*/}
                        {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white}/>*/}
                      {/*</TouchableOpacity>*/}
                    </View>)}
                    leftOpenValue={0}
                    rightOpenValue={-80}
                  />

                  <DivideLine/>
                </View>;
              }
              if (item.id === 'BIKE_RESUME_SMALL') {
                return <View>
                  <SwipeListView
                    data={['']}
                    renderItem={(data, rowMap) => (<View><ListBikeInfo data={item}/></View>)}
                    renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity style={{
                        backgroundColor: 'red',
                        alignItems: 'center',
                        width: 70,
                        height: '70%',
                        justifyContent: 'center',
                      }}>
                        <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white}/>
                      </TouchableOpacity>
                      {/*<TouchableOpacity style={{*/}
                        {/*backgroundColor: '#53DCD0',*/}
                        {/*alignItems: 'center',*/}
                        {/*width: 70,*/}
                        {/*height: '50%',*/}
                        {/*justifyContent: 'center',*/}
                      {/*}}>*/}
                        {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white}/>*/}
                      {/*</TouchableOpacity>*/}
                    </View>)}
                    leftOpenValue={0}
                    rightOpenValue={-80}
                  />
                  <DivideLine/>
                </View>;
              }
              if (item.id === 'AD_BANNER_ENGAGE') {
                return <View>
                  <Divider size={20}/>
                  <AdBlock data={item}/>
                </View>;
              }
              if (item.id === "TITLED_TEXT") {
                return <View>
                  <Divider size={5}/>
                  <Text style={{fontSize: 20, color: item.title_color}}>{item.title}</Text>
                  <Divider size={10}/>
                  <Text style={{fontSize: 18, color: item.text_color}}>{item.text}</Text>
                  <Divider size={35}/>
                </View>
              }
            })}
            {get(uiData[0], 'count', 0) === 0 &&
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><DefaultImage
              style={{width: moderateScale(200), height: moderateScale(200), resizeMode: 'contain', marginTop: 14}}
              source={Images.icons.ic_oops}/>
              <Text style={{marginTop: 10, fontSize: 17}}>Nessun risultato con i parametri che hai selezionato</Text>
            </View>}
          </Container>
        </View>
      );

    }
  }

};

const Container = styled(ScrollView)`
    background-color:${themeProp('colorSecondary')};
    margin-bottom: 10px;
    padding-horizontal: 10px;
    margin-top: ${verticalScale(50)}
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
