import React, { PureComponent } from 'react'
import { Image,View } from 'react-native'


export default class Splash extends PureComponent {
  constructor(props){
    super(props)
    setTimeout(()=>this.props.navigation.navigate('SelectCollege'),3000)    
  }
  

  render() {
    return (
      <View style={{height: "100%",width: "100%"}}>
        <Image source={require('../../Assets/splash.png')} style={{height: "100%",width: "100%"}} />
      </View>
    )
  }
}