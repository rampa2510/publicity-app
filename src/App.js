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
import { createAppContainer, createSwitchNavigator,createDraw } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                     import views and config                          *
 *                                                                                      */
//========================================================================================

import SplashScreen from './Views/SplashScreen'
import SelectCollege from './Views/SelectCollege'
import config from './config/general'
import SelectPost from './Views/SelectPost'
import Details from './Views/ShowDetails'
import Drawer from './Views/DrawerMenu'
import DetailsEnter from './Views/DetailsEnter'
import AddCodes from './Views/AddCodes'
//########################################################################################

useScreens()

const AppStack = createStackNavigator({
  SelectCollege,
  SelectPost,
  Details
},{
  initialRouteName:"SelectCollege",
  // navigationOptions: ({ navigation }) => ({
  //   drawerLockMode:
  //     navigation.state.routes[navigation.state.index].routeName === 'SelectCollege'
  //       ? 'none'
  //       : 'locked-closed',
  // }),
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

const DrawerMenu = createDrawerNavigator({
    AppStack,
    DetailsEnter,
    AddCodes
},
{
  contentComponent: props => <Drawer {...props} />,
})

const Switch = createSwitchNavigator({
  SplashScreen,
  DrawerMenu
})

const AppContainer = createAppContainer(Switch)


export default class App extends React.Component {
  render() {
    return <AppContainer />  
  }
}