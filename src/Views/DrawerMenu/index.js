//========================================================================================
/*                                                                                      *
 *                               Import react dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,TouchableWithoutFeedback,StyleSheet,Text,Image } from 'react-native'
//########################################################################################

export default class Drawer extends PureComponent {

  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <>
      <View style={{ flex: 1, paddingTop: 40 }}>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SelectCollege')}>
          <View style={styles.buttons}>
          <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/browse.webp')} />
            <Text style={styles.textStyle}>
              Browse
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DetailsEnter')} >
          <View style={styles.buttons}>
          <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/details.webp')} />
            <Text style={styles.textStyle}>
              Details
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AddCodes')} >
          <View style={styles.buttons}>
          <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/addCodes.webp')} />
            <Text style={styles.textStyle}>
              Add Codes
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  lastbutton:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle:{
    width: 30,
    padding: 5,
    marginLeft: 10
  },
  textStyle:{
    fontSize: 18,
    color: "#000",
    marginLeft: 20
  }
})