import React from "react";
import { Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ScanQR from "./screens/ScanQR";
import UpdateScreen from "./screens/UpdateScreen";
import LoginScreen from "./screens/LoginScreen";

export default class App extends React.Component {
  render() {
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Scan: {screen: ScanQR},
  Update: {screen: UpdateScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "Transaction"){
        return(
          <Image
          source={require("./assets/booklogo.jpg")}
          style={{width:40, height:40}}
        />
        )

      }
      else if(routeName === "Search"){
        return(
          <Image
          source={require("./assets/searchingbook.png")}
          style={{width:40, height:40}}
        />)

      }
    }
  })
}
);

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen: LoginScreen},
  TabNavigator:{screen: TabNavigator}
})


const AppContainer =  createAppContainer(switchNavigator);