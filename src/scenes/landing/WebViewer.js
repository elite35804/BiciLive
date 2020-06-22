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
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  console.log('url=======', web.url);
  return (
    <View style={{flex: 1}}>
      <WebView
        onLoadStart={() => hud.show()}
        onLoad={() => hud.hide()}
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
