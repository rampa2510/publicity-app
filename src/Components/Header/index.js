//========================================================================================
/*                                                                                      *
 *                              Import react depeendencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { Text,View,StyleSheet,Image,TouchableWithoutFeedback } from 'react-native'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import 3rd party dependencies                            *
 *                                                                                      */
//========================================================================================

import { withNavigation } from 'react-navigation'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import userdefined files here                            *
 *                                                                                      */
//========================================================================================
import config from '../../config/general'
//########################################################################################

const styles=StyleSheet.create({
  viewStyles:{
    backgroundColor: config.primaryColor,
    flexDirection:"row",
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 30,
    shadowOffset: {
      height: 30,
    },
    shadowRadius: 10,
    elevation:9,
    padding: 10,
    width: "100%"
  },
 headerStyles:{
    fontSize: 20,
    color: "#fff" ,
    fontWeight: "bold",
    fontFamily: config.fontFamily,
    marginLeft: 45
 }
})
class index extends PureComponent {
  render() {
    return (
      <>
          <View style={styles.viewStyles}>
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.openDrawer()}>
              <Image style={{width:30,flex: 1,height: 30,padding: 0,marginLeft:-40}} resizeMode={"contain"} source={require('../../Assets/menu.webp')} />
            </TouchableWithoutFeedback>
          <Text style={styles.headerStyles}> {this.props.title} </Text>
          {/* <Image style={{width:30}} resizeMode={"contain"} source={require('../../Assets/plusIcon.webp')} /> */}
          <View style={{flex: 1}}></View>
        </View>
      </>
    )
  }
}

export default withNavigation(index)