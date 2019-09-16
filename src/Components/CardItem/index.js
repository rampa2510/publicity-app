import React, { PureComponent } from 'react'
import { View,StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerStyle:{
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: "row",
    position: "relative"
  }
})

export default class CardItem extends PureComponent {

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.children}
      </View>
    )
  }
}