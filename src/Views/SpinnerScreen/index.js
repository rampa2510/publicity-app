import React, { PureComponent } from 'react'
import { View,ActivityIndicator,Text,StyleSheet } from 'react-native'

import config from '../../config/general'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.backgroundColor,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // Flex to fill, position absolute, 
  // Fixed left/top, and the width set to the window width
  overlay: {
    position: 'absolute',
    top: "20%",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: config.backgroundColor,
    opacity: 0.3,
  }  
})


export default class Spinner extends PureComponent {
  render() {
    return (
      // <View style={styles.spinnerContainer}>
      //   
      //   <Text style={styles.messageStyle}>{this.props.message} </Text>
      // </View>
      <View style={styles.container}>
        <ActivityIndicator color="#D3D3D3" size='large' />
      <Text style={styles.welcome}>
        {this.props.message}
      </Text>
      <View style={[styles.overlay, { height: 900}]} />
    </View>
    )
  }
}