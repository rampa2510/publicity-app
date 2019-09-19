//========================================================================================
/*                                                                                      *
 *                               Import react dependencies                              *
 *                                                                                      */
//========================================================================================

import React from 'react'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import extrenal dependencies                             *
 *                                                                                      */
//========================================================================================

import { useScreens } from 'react-native-screens'
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                     import views and config                          *
 *                                                                                      */
//========================================================================================

import SplashScreen from './Views/SplashScreen'
import SelectCollege from './Views/SelectCollege'
import  config from './config/color'

//########################################################################################

useScreens()

const AppStack = createStackNavigator({
  SelectCollege
},{
  initialRouteName:"SelectCollege",
  
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: config.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    },
  },
  headerLayoutPreset:"center"
})
const Switch = createSwitchNavigator({
  SplashScreen,
  AppStack
})
const AppContainer = createAppContainer(Switch)


export default class App extends React.Component {
  render() {
    return <AppContainer />  
  }
}