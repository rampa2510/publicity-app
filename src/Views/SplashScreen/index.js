//========================================================================================
/*                                                                                      *
 *                               import react dependencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { Image,View } from 'react-native'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                               import user defined files                              *
 *                                                                                      */
//========================================================================================
import Auth from '../../Services/Auth'
//########################################################################################

export default class Splash extends PureComponent {
  constructor(props){
    super(props)
    this.auth = new Auth()
    setTimeout(this.authUser,3000)    
  }

  authUser=async ()=>{
    let data = await this.auth.getUserData()
    console.log(data)
    this.props.navigation.navigate(data ? "SelectCollege" : "Login")
  }
  

  render() {
    return (
      <View style={{height: "100%",width: "100%"}}>
        <Image source={require('../../Assets/splashScreen.jpg')} style={{height: "100%",width: "100%"}} />
      </View>
    )
  }
}