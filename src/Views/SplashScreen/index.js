//========================================================================================
/*                                                                                      *
 *                               import react dependencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { Image,View } from 'react-native'

//########################################################################################

export default class Splash extends PureComponent {
  constructor(props){
    super(props)

    setTimeout(()=>this.props.navigation.navigate('Login'),3000)    
  }

  auth=async ()=>{

  }
  

  render() {
    return (
      <View style={{height: "100%",width: "100%"}}>
        <Image source={require('../../Assets/splashScreen.jpg')} style={{height: "100%",width: "100%"}} />
      </View>
    )
  }
}