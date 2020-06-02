import {Dimensions, Image, Text, TouchableOpacity, View, Platform} from 'react-native';
import Tooltip from 'rn-tooltip';
import React from 'react';
import Images from 'res/Images';
import styled from 'styled-components/native/dist/styled-components.native.esm';

const ShareTooltip = (props) => (
  <Tooltip
    width={Dimensions.get('window').width-20}
    height={90}
    overlayColor={'rgba(0,0,0,0'}
    popover={
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_linkedin} /></TouchableOpacity>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_alpha} /></TouchableOpacity>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_twitter} /></TouchableOpacity>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_whatsapp} /></TouchableOpacity>
        <TouchableOpacity><Image width={'100%'} height={'100%'} source={Images.icons.ic_facebook} /></TouchableOpacity>
      </View>
    }
    backgroundColor={'#333333'}
  >
    <ShareBtn>
      {/*<ShareTitle>CONDIVIDI</ShareTitle>*/}
      <Image width={'100%'} height={'100%'} source={Images.btn.btn_share} style={{marginLeft: 10, width: 130, height: 40, resizeMode: 'contain'}} />
    </ShareBtn>
  </Tooltip>
);

const ShareBtn = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 4px;
  padding-left: 8px;
`;

const ShareTitle = styled(Text)`
  font-size: 15px;
  color: white;
  font-family: ${Platform.OS === 'ios' ? 'UniSansBook' : 'uni_sans_book'};
  margin-top: ${Platform.OS === "ios" ? '6px' : '0'};
`;

export default ShareTooltip;
