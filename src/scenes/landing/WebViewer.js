import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Platform, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {useStores} from 'hooks/Utils';
import {observer} from 'mobx-react';

const isIOS = Platform.OS === 'ios';

const WebViewer = (props) => {
  const {web, hud, bikeData, brandData} = useStores();
  const navigate = url => {
    console.log('deeplinkurl==========', url);
    const type = url.includes('/ebike/') ? 'Product' : 'Brand';
    const data = url.split('data=')[1].replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%3D/g, '=');
    if (type === 'Product') {
      bikeData.clearData();
      bikeData.getData(data);
    } else {
      brandData.clearData();
      brandData.getData(data);
    }
    navigation.navigate(type, {url: type});
  };
  // useEffect(() => {
  //   Linking.addEventListener('url', event => navigate(event.url))
  //   return () => Linking.removeEventListener('url', event => navigate(event.url));
  // }, []);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  console.log('url=======', web.url);
  return (
    <View style={{flex: 1}}>
      <WebView
        onLoadStart={() => setSpinnerVisible(true)}
        onLoad={() => setSpinnerVisible(false)}
        source={{
          uri: web.url,
        }}
        style={{marginTop: isIOS ? 30 : 0, flex: 1}}
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
    </View>
  );
};

export default observer(WebViewer);
