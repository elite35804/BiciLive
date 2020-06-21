import React, {useState} from 'react';
import {View, ActivityIndicator, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {useStores} from 'hooks/Utils';
import {observer} from 'mobx-react';

const isIOS = Platform.OS === 'ios';

const WebViewer = (props) => {
  const {web, hud} = useStores();
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
