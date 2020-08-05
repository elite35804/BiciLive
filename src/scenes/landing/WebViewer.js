import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header} from 'components/controls/BaseUtils';
import {useStores} from 'hooks/Utils';
import Images from 'res/Images';
import {observer} from 'mobx-react';
import {scale, verticalScale} from 'react-native-size-matters';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native/dist/styled-components.native.esm';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const {height, width} = Dimensions.get('window');
const ratio = height/width;
const isIOS = Platform.OS === 'ios';

const WebViewer = (props) => {
  const {web} = useStores();
  const navigation = useNavigation();
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  console.log('url=======', web.url);
  return (
    <View style={{flex: 1}}>
      <Header>
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
      </Header>
      <Container>
      <WebView
        onLoadStart={() => setSpinnerVisible(true)}
        onLoad={() => setSpinnerVisible(false)}
        source={{
          uri: web.url,
        }}
      />
      {spinnerVisible &&
      <ActivityIndicator
        style={{
          flex: 1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center'
        }}
        size="large"
      />
      }
      </Container>
    </View>
  );
};

const Container = styled(View)`
    flex: 1;
    marginTop: ${isIOS ? (ratio < 1.5 ? verticalScale(50) : (ratio < 1.8 ? verticalScale(75) : verticalScale(65))) : verticalScale(50)}
    flex-direction: column;
    justify-content: center
`;

export default observer(WebViewer);
