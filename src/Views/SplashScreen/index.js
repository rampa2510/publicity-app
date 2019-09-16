import React, { PureComponent } from 'react'
import { Image,View } from 'react-native'


export default class Splash extends PureComponent {
  
  render() {
    return (
      <View style={{height: "100%",width: "100%"}}>
        <Image source={require('../../Assets/splashScreen.jpg')} style={{height: "100%",width: "100%"}} />
      </View>
    )
  }
}