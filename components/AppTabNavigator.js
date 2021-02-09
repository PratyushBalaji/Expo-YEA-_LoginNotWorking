import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScanScreen from '../screens/ScanQR';
import UpdateScreen from '../screens/UpdateScreen';



export const AppTabNavigator = createBottomTabNavigator({
  ScanQR : {
    screen: ScanScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/splash.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Scan",
    }
  },
  Update : {
    screen: UpdateScreen,
    navigationOptions :{
      tabBarLabel : "Update",
    }
  }
});
