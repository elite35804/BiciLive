import React from 'react';
import {KeyboardAvoidingView, Platform, View, Image, Text, TouchableOpacity} from 'react-native';
import {Router, Scene, Stack, Drawer, Modal, Tabs, Actions} from 'react-native-router-flux';
import Images from 'res/Images';
import Keys from './res/SceneKeys';
import Splash from './scenes/landing/Splash';
import Register from './scenes/landing/Register';
import Welcome from './scenes/landing/Welcome';
import Home from './scenes/landing/Home';
import BikeFinder from './scenes/landing/BikeFinder';
import BikeFinderAZ from './scenes/landing/BikeFinderAZ';
import BikeFinderCategory from './scenes/landing/BikeFinderCategory';
import Result from './scenes/landing/Result';
import BikePage from './scenes/landing/BikePage';
import styled from 'styled-components/native';

const isIOS = Platform.OS === 'ios';

const TabBar =(props) => {
  return (
  <View style={{width: '100%', height: 90, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#333333'}}>
    <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['Home']()}>
      <View style={{height: 40, justifyContent: 'flex-end'}}>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_home} />
      </View>
      <Text style={{fontSize: 10, color: '#c9c3c5', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginTop: 10}}>HOME</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['BikeFinder']()}>
      <View style={{height: 40, justifyContent: 'flex-end'}}>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_ebike} />
      </View>
      <Text style={{fontSize: 10, color: '#c9c3c5', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginTop: 10}}>EBIKE FINDER</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['BikePage']()}>
      <View style={{height: 40, justifyContent: 'flex-end'}}>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_compare} />
      </View>
      <Text style={{fontSize: 10, color: '#c9c3c5', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginTop: 10}}>CONFRONTO</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['Home']()}>
      <View style={{height: 40, justifyContent: 'flex-end'}}>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_news} />
      </View>
      <Text style={{fontSize: 10, color: '#c9c3c5', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginTop: 10}}>NEWS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['Home']()}>
      <View style={{backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, position: 'absolute', top: 0, right: 10}}/>
      <View style={{height: 40, justifyContent: 'flex-end'}}>
        <Image width={'100%'} height={'100%'} source={Images.icons.ic_profile} />
      </View>
      <Text style={{fontSize: 10, color: '#c9c3c5', fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular', marginTop: 10}}>PROFILO</Text>
    </TouchableOpacity>
  </View>
)};

const Root = props => {
  return (
    <Container as={KeyboardAvoidingView} behavior='padding' enabled={isIOS}>
      <Router>
        <Modal>
          <Scene key="landing" hideNavBar hideTabBar>
            <Scene key={Keys.splash} component={Splash} hideNavBar/>
            <Scene key={Keys.register} component={Register} hideNavBar/>
            <Scene key={Keys.welcome} component={Welcome} hideNavBar/>
          </Scene>
          <Tabs key="entry"
                tabBarComponent={TabBar}
                hideNavBar
          >
            <Scene key={Keys.home} component={Home} hideNavBar/>
            <Scene key={Keys.bikeFinder} component={BikeFinder} hideNavBar hideTabBar/>
            <Scene key={Keys.bikeFinderAZ} component={BikeFinderAZ} hideNavBar hideTabBar/>
            <Scene key={Keys.bikeFinderCategory} component={BikeFinderCategory} hideNavBar/>
            <Scene key={Keys.result} component={Result} hideNavBar/>
            <Scene key={Keys.bikePage} component={BikePage} hideNavBar/>
          </Tabs>
        </Modal>
      </Router>
    </Container>
  );
};

const Container = styled(KeyboardAvoidingView)`
    flex: 1;
`;

export default Root;
