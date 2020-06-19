import React from 'react';
import {KeyboardAvoidingView, Platform, View, Image, Text, TouchableOpacity, StatusBar} from 'react-native';
import StoresContext from './StoresContext';
// import {Router, Scene, Stack, Drawer, Modal, Tabs, Actions} from 'react-native-router-flux';
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
import BikePagePremium from './scenes/landing/BikePagePremium';
import BrandPagePremium from './scenes/landing/BrandPagePremium';
import BrandPage from './scenes/landing/BrandPage';
import NewsFinder from './scenes/landing/NewsFinder';
import Dashboard from './scenes/landing/Dashboard';
import Brand from './scenes/landing/Brand';
import EBike from './scenes/landing/EBike';
import User from './scenes/landing/User';
import styled from 'styled-components/native';
import {useStores} from './hooks/Utils';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Login from './scenes/landing/Login';
import WebViewer from './scenes/landing/WebViewer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import analytics from '@react-native-firebase/analytics';


const isIOS = Platform.OS === 'ios';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabBar = (props) => {
  const navigation = useNavigation();
  const {homeData, auth} = useStores();
  const onDashboard = () => {
    if (auth.loginState) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={{
      width: '100%',
      height: 90,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#333333',
    }}>
      <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => {
        homeData.clearData();
        homeData.getData();
        navigation.navigate('Home');
      }}>
        <View style={{height: 35, justifyContent: 'flex-end'}}>
          <Image style={{width: moderateScale(30), height: moderateScale(30), resizeMode: 'contain'}}
                 source={Images.icons.ic_home}/>
        </View>
        <Text style={{
          fontSize: 10,
          color: '#c9c3c5',
          fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
          marginTop: 10,
        }}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => navigation.navigate('BikeFinder')}>
        <View style={{height: 35, justifyContent: 'flex-end'}}>
          <Image style={{
            width: moderateScale(40),
            height: moderateScale(40),
            resizeMode: 'contain',
            marginBottom: moderateScale(-5),
          }} source={Images.icons.ic_ebike}/>
        </View>
        <Text style={{
          fontSize: 10,
          color: '#c9c3c5',
          fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
          marginTop: 10,
          textAlign: 'center',
        }}>EBIKE FINDER</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['BikePage']()}>*/}
      {/*<View style={{height: 40, justifyContent: 'flex-end'}}>*/}
      {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_compare}/>*/}
      {/*</View>*/}
      {/*<Text style={{*/}
      {/*fontSize: 10,*/}
      {/*color: '#c9TextInputc3c5',*/}
      {/*fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',*/}
      {/*marginTop: 10,*/}
      {/*}}>CONFRONTO</Text>*/}
      {/*</TouchableOpacity>*!/*/}
      {/*<TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => Actions['NewsFinder']()}>*/}
      {/*<View style={{height: 40, justifyContent: 'flex-end'}}>*!/*/}
      {/*<Image width={'100%'} height={'100%'} source={Images.icons.ic_news}/>*/}
      {/*</View>*/}
      {/*<Text style={{*/}
      {/*fontSize: 10,*/}
      {/*color: '#c9c3c5',*/}
      {/*fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',*/}
      {/*marginTop: 10,*/}
      {/*}}>NEWS</Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity style={{alignItems: 'center', width: '19%'}} onPress={() => onDashboard()}>
        {/*<View style={{backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, position: 'absolute', top: 0, right: 10}}/>*/}
        <View style={{height: 35, justifyContent: 'flex-end'}}>
          <Image style={{width: moderateScale(30), height: moderateScale(30), resizeMode: 'contain'}}
                 source={Images.icons.ic_profile}/>
        </View>
        <Text style={{
          fontSize: 10,
          color: '#c9c3c5',
          fontFamily: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
          marginTop: 10,
        }}>PROFILO</Text>
      </TouchableOpacity>
    </View>
  );
};

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const Root = props => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          analytics().setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Survey" component={Welcome}/>
        <Stack.Screen name="Main">
          {() =>
            <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
              <Tab.Screen name="Home" component={Home}/>
              <Tab.Screen name="Product" component={BikePagePremium}/>
              <Tab.Screen name="Brand" component={BrandPagePremium}/>
              <Tab.Screen name="BikeFinder" component={BikeFinder}/>
              <Tab.Screen name="BikeFinderAZ" component={BikeFinderAZ}/>
              <Tab.Screen name="BikeFinderCategory" component={BikeFinderCategory}/>
              <Tab.Screen name="WebViewer" component={WebViewer}/>
              <Tab.Screen name="Result" component={Result}/>
              <Tab.Screen name="Dashboard" component={Dashboard}/>
              <Tab.Screen name="LikeProduct" component={EBike}/>
              <Tab.Screen name="LikeBrand" component={Brand}/>
              <Tab.Screen name="Account" component={User}/>
            </Tab.Navigator>
          }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Root;
