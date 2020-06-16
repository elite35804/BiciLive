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
  Image as DefaultImage,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect, BaseTextFilter} from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import Images from 'res/Images';
import {DivideLine, Divider, ErrorView, ListBikeInfo} from '../../components/controls/BaseUtils';
import {moderateScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


const swipeoutBtns = [
  {
    component: (
      <View>
        <TouchableOpacity
          style={{backgroundColor: 'red', alignItems: 'center', height: '50%', justifyContent: 'center'}}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#53DCD0', alignItems: 'center', height: '50%', justifyContent: 'center'}}>
          <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white}/>
        </TouchableOpacity>
      </View>
    ),
  },
];

const data = ['', '', '', '', '', '', '', '', '', '', '', ''];
const isIOS = Platform.OS === 'ios';
const oswald_bold = isIOS ? 'Oswald-Bold' : 'oswald_bold';
// const ListBikeInfo = (props) => (
//   <MainInfo>
//     <View style={{flexDirection: 'row'}}>
//       <Image width={'40%'} height={'50%'} resizeMode="contain" source={Images.background.bike_logo1}
//              style={{width: '40%', height: 100}}/>
//       <View width={'60%'}>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -8}}>
//           <View style={{marginTop: 8}}>
//             <TypeView width={'33px'}><Type size={'10px'}>eMTB</Type></TypeView>
//           </View>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Image width={40} height={40} source={Images.icons.ic_calendar} style={{marginRight: 5}}/>
//             <Sort size={'23px'}>2020</Sort>
//           </View>
//         </View>
//         <View style={{marginTop: -8}}>
//           <Sort size={'14px'}>HAIBIKE</Sort>
//         </View>
//         <NameView>
//           <Name size={'20px'}>XDURO NDURO 3.5</Name>
//           <Image width={10} height={10} source={Images.icons.arrow_right} style={{width: 5, height: 9}}/>
//         </NameView>
//         <View style={{marginTop: -5}}/>
//         <Sort size={'23px'}>5.499€</Sort>
//       </View>
//     </View>
//     <View style={{paddingLeft: 5}}>
//       <Text style={{color: '#D75A2B', fontFamily: oswald_bold, fontSize: 11}}>MOTORE</Text>
//       <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
//         <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 13}}>Bosh, Performance CX</Text>
//         <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
//           <View style={{flexDirection: 'row', marginRight: 20}}>
//             <View style={{marginTop: 7, marginRight: 3}}>
//               <Image width={'100%'} height={'100%'} source={Images.icons.ic_graph}/>
//             </View>
//             <Sort size={'23px'}>75</Sort>
//             <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Nm</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <View style={{marginTop: 7, marginRight: 3}}>
//               <Image width={'100%'} height={'100%'} source={Images.icons.ic_battery}/>
//             </View>
//             <Sort size={'23px'}>625</Sort>
//             <Text style={{color: '#909090', fontFamily: oswald_bold, fontSize: 15, marginTop: 10}}>Wh</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   </MainInfo>
// );

const Brand = props => {
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
      console.log('jererererer', uiData);
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
          <Divider size={20}/>
          {uiData.map((item, index) => {
            if (item.id === 'BIKE_RESUME_SMALL')
              return <View>
            <ListBikeInfo key={index} data={item}/>
            <DivideLine/>
              </View>
          })}

          {/*<SwipeListView*/}
            {/*data={data}*/}
            {/*renderItem={(data, rowMap) => (*/}
              {/*<View style={{backgroundColor: 'white'}}>*/}
                {/*<ListBikeInfo from="ebike"/>*/}
                {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_line}*/}
                       {/*style={{width: '120%', marginVertical: 20}}/>*/}
              {/*</View>*/}
            {/*)}*/}
            {/*renderHiddenItem={(data, rowMap) => (*/}
              {/*<View style={{alignItems: 'flex-end', marginBottom: 45}}>*/}
                {/*<TouchableOpacity style={{*/}
                  {/*backgroundColor: 'red',*/}
                  {/*alignItems: 'center',*/}
                  {/*width: 70,*/}
                  {/*height: '50%',*/}
                  {/*justifyContent: 'center',*/}
                {/*}}>*/}
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_heart_white}/>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={{*/}
                  {/*backgroundColor: '#53DCD0',*/}
                  {/*alignItems: 'center',*/}
                  {/*width: 70,*/}
                  {/*height: '50%',*/}
                  {/*justifyContent: 'center',*/}
                {/*}}>*/}
                  {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare_white}/>*/}
                {/*</TouchableOpacity>*/}
              {/*</View>*/}
            {/*)}*/}
            {/*leftOpenValue={0}*/}
            {/*rightOpenValue={-80}*/}
          {/*/>*/}
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
