import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image as DefaultImage, Linking, FlatList,
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
import axios from 'axios';
import config from '../../config/Config';
const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get('window');
const ratio = height/width;

const AdBlock = props => {
  const navigation = useNavigation();
  const {web} = useStores();
  const openWebViewer = (url) => {
    web.url = url;
    navigation.navigate('WebViewer');
  };
  return <View><TouchableOpacity onPress={() => openWebViewer(props.data.url)}><Image
    style={{width: Dimensions.get('window').width - scale(20), height: (Dimensions.get('window').width - scale(20))/3, resizeMode: 'contain'}} source={{uri: props.data.img}}/></TouchableOpacity><Divider size={20}/></View>;
};

const LikeBlock = props => {
  const {auth} = useStores();
  const [isLike, setIsLike] = useState(true);
  const setStatus = async () => {
    try {
      if (auth.loginState) {
        console.log('set============', auth.token);
        axios.get(
          `${config.server}${props.data.like_url}`,
          {
            headers: {
              'Authorization' : `Bearer ${auth.token}`
            }
          }
        ).then(res => {
          console.log('======', res.data);
          if (res.data.err_code === "ERR_OK") {
            setIsLike(res.data.status)
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setIsLike(props.data.starred)
  }, []);
  return <View>
    <TouchableOpacity style={{
      backgroundColor: 'red',
      alignItems: 'center',
      width: 70,
      height: '80%',
      justifyContent: 'center',
    }}
                      onPress={() => setStatus()}
    >
      <Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_white_full : Images.icons.ic_heart_white}/>
    </TouchableOpacity>
  </View>
}
const Result = props => {
  const navigation = useNavigation();
  const {bikeSearch, hud, category} = useStores();
  if (bikeSearch.isLoading) {
    hud.show()
  } else {
    if (bikeSearch.errorIf) {
      return <ErrorView/>
    } else {
      hud.hide()
      const uiData = toJS(bikeSearch.data);
      // console.log('listData=========', toJS(bikeSearch.listData));
      const extraData = toJS(bikeSearch.extraData);
      const listData = toJS(bikeSearch.listData);
      console.log('data=================', extraData.length, listData.length)


      return (
        <View style={{flex: 1}}>
          <Header>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.navigate('BikeFinderCategory')}>
              <Image resizeMode="contain" source={Images.btn.btn_back_arrow}
                     style={{
                       position: 'absolute',
                       left: 0,
                       width: isIOS ? scale(35) : scale(37),
                       height: isIOS ? verticalScale(19) : verticalScale(23),
                       resizeMode: 'contain',
                       marginTop: verticalScale(14),
                     }}/>
              <Text style={{textAlign: 'center', fontSize: ratio < 1.5 ? 30 : 19, lineHeight: ratio < 1.5 ? 90 : (ratio > 2 ? 59 : 49)}}>RISULTATI DI RICERCA</Text>
              <Text style={{
                position: 'absolute',
                right: 10,
                fontSize: ratio < 1.5 ? 30 : 19,
                lineHeight: ratio < 1.5 ? 90 : 49,
                color: '#FB0203',
                marginTop: isIOS ? 5: 0
              }}>{get(uiData[0], 'count', 0)}</Text>
            </TouchableOpacity>
          </Header>
          <Container>
            {extraData.map((item, index) => {
              if (item.id === 'TITLE') {
                return <View><Title size={18} width={'35px'}
                                    color={themeProp('colorBorder')}>{item.titolo}</Title></View>;
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
            {<FlatList data={listData}
                       keyExtractor={item => item.keyId}
                       initialNumToRender = {10}
                       renderItem={({item, index}) => {
              // console.log('item============', item.id, index);
              if (item.id === 'BIKE_RESUME_BIG') {
                return <View>
                  <SwipeListView
                    data={['']}
                    renderItem={(data, rowMap) => (<View><MainBikeInfo data={item}/></View>)}
                    renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                      <LikeBlock data={item}/>
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
                      <LikeBlock data={item}/>
                    </View>)}
                    leftOpenValue={0}
                    rightOpenValue={-80}
                  />
                  <DivideLine/>
                </View>;
              }
            }}/>}

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
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(50)}
    paddingTop: ${verticalScale(10)}
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
