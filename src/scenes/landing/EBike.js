import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  Image as DefaultImage, Linking,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {DivideLine, Divider, ErrorView, Header, ListBikeInfo} from '../../components/controls/BaseUtils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import axios from 'axios';
import config from '../../config/Config';
import { useNavigation} from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const {height, width} = Dimensions.get('window');
const ratio = height/width;

const isIOS = Platform.OS === 'ios';
const oswald_bold = isIOS ? 'Oswald-Bold' : 'oswald_bold';
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
  }
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

const Brand = props => {
  const {likeProduct, hud, bikeData, brandData} = useStores();
  const navigation = useNavigation();
  // useEffect(() => {
  //   Linking.addEventListener('url', event => navigate(event.url))
  //   return () => Linking.removeEventListener('url', event => navigate(event.url));
  // }, []);
  if (likeProduct.isLoading) {
    hud.show()
  } else {
    if (likeProduct.errorIf) {
      return <ErrorView/>;
    } else {
      hud.hide()
      const uiData = toJS(likeProduct.data);
      console.log('jererererer', uiData);
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

          <Divider size={20}/>
          {uiData.map((item, index) => {
            if (item.id === 'BIKE_RESUME_SMALL')
              return <View>
                <SwipeListView
                  data={['']}
                  renderItem={(data, rowMap) => (<View><ListBikeInfo data={item} referer={likeProduct.url}/></View>)}
                  renderHiddenItem={(data, rowMap) => (<View style={{alignItems: 'flex-end'}}>
                    <LikeBlock data={item}/>
                  </View>)}
                  leftOpenValue={0}
                  rightOpenValue={-80}
                />
                <DivideLine/>
              </View>;
          })}
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

const MainInfo = styled(View)`
  background-color: #FFFFFF;
  border-left-width: 7px;
  border-left-color: #D8D8D8;
  width: 100%;
`;

const TypeView = styled(View)`
  background-color: #D75A2B
  padding-horizontal: 5px;
  width: ${props => props.width};
`;

const Type = styled(Text)`
  color: #FFFFFF;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
`;

const Sort = styled(Text)`
  color: #909090;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
`;

const NameView = styled(View)`
  flex-direction: row;
  align-items: center
`;

const Name = styled(Text)`
  color: #D75A2B;
  font-family: ${oswald_bold}
  font-size: ${props => props.size};
  margin-top: -5px;
  margin-right: 5px;
`;


export default observer(Brand);
