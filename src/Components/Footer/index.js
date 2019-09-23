import React, { PureComponent } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import config from '../../config/general'

export default class index extends PureComponent {
  render() {
    return (
      <View style={styles.footer}>

        <Text style={styles.footerText}> Made with ♥ by Technical Council </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer:{
    height: "8%",
    paddingLeft:"10%",
    paddingRight:"10%",
    paddingBottom:"10%",
    paddingTop:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.backgroundColor,
    position: 'absolute', left: 0, right: 0, bottom: "7%"
  
  },
  footerText:{
    fontFamily: config.fontFamily,
  }
})