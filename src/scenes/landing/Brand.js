import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Image as DefaultImage} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {moderateScale} from 'react-native-size-matters';
import {ErrorView} from '../../components/controls/BaseUtils';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import axios from 'axios';
import config from '../../config/Config';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const LikeBlock = props => {
  const {auth} = useStores();
  const [isLike, setLike] = useState(true);
  const setStatus = async (status) => {
    try {
      console.log('set============');
      axios.get(
        `http://biciapp.sepisolutions.com${props.url}`,
        {
          headers: {
            'Authorization' : `Bearer ${auth.token}`
          }
        }
      ).then(res => {
        console.log('======', res.data);
        if (res.data.err_code === "ERR_OK") {
          setLike(res.data.status)
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  return <TouchableOpacity onPress={() => {setStatus(!isLike);setLike(!isLike)}}><Image width={'100%'} height={'100%'} source={isLike ? Images.icons.ic_heart_red_sm : Images.icons.ic_heart_sm}/></TouchableOpacity>
};

const Brand = props => {

  const {auth, hud} = useStores();
  const data = [
    {name: 'ABUS', count: 34},
    {name: 'ADRIATICA', count: 34},
    {name: 'AL-KO SAWIKO', count: 34},
    {name: 'ALPEK', count: 34},
    {name: 'ALPINA', count: 34},
    {name: 'ARLIX', count: 34},
  ];

  const getLikeInfo = url => {
    try {
      axios.get(
        url,
        {
          headers: {
            'Authorization' : `Bearer ${auth.token}`
          }
        }
      ).then(res => {

      })
    }catch (e) {

    }
  }
  const {likeBrand} = useStores();
  if (likeBrand.isLoading) {
    hud.show()
  } else {
    if (likeBrand.errorIf) {
      return <ErrorView/>;
    } else {
      hud.hide()
      const uiData = toJS(likeBrand.data);
      console.log('jererererer', uiData);
      const titleData1 = uiData.shift();
      const titleData2 = uiData.shift();
      return (
        <Container>
          <Title size={'40px'} color={titleData1.colore} width={'35px'}>{titleData1.titolo.toUpperCase()}</Title>
          <Divider size={20}/>
          <ItemView>
            <Image style={{width: moderateScale(25), height: moderateScale(25), resizeMode: 'contain', marginTop: 10}} source={Images.icons.ic_user_sm}/>
            <Title size={'10px'} color={titleData2.colore} width={'35px'}>{titleData2.titolo.toUpperCase()}</Title>
          </ItemView>
          {Object.entries(uiData).length !== 0 && <FlatList
            data={uiData}
            keyExtractor={(item, index) => `company_${index}`}
            renderItem={({item, index}) => {
              return (
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  paddingHorizontal: 13, paddingVertical: 3, backgroundColor: index % 2 === 0 ? item.bg_color_even : item.bg_color_odd
                }}>
                  <ListText>{item.titolo}</ListText>
                  <LikeBlock url={item.like_url}/>
                </View>
              )
            }}
          />}


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


const ListText = styled(Text)`
  color: ${themeProp('colorDescription')};
  font-family: ${themeProp('fontUniHeavy')}
  font-size: 25px;
  padding-top: 10px;
`;

const Badge = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const BadgeCount = styled(Text)`
  color: ${themeProp('colorSecondary')};
  font-size: 13px;
  font-family: ${themeProp('fontUniHeavy')}
  margin-top: 5px;
`;

const Divider = styled(View)`
  margin-top: ${props => props.size}
`;

const Title = styled(Text)`
  font-size: ${props => props.width};
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
  padding-horizontal: 10px;
`;


export default observer(Brand);
