//========================================================================================
/*                                                                                      *
 *                              Import react depeendencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                               import user defined files                              *
 *                                                                                      */
//========================================================================================
import config from '../../config/general'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import third party packages                             *
 *                                                                                      */
//========================================================================================
import { Hoshi } from 'react-native-textinput-effects';
//########################################################################################

export default class index extends PureComponent {
  state={
    username:'',
    password:''
  }
  static navigationOptions={
      header:null
  }

  render() {
    
    return (
      <>
        <View style={styles.view}>
            <Text style={styles.title}> Publicity </Text>
            <View style={styles.textInputView}>
              <Hoshi
                label={'Username'}
                // this is used as active border color
                borderColor={config.primaryColor}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={"#fff"}
                value={this.state.username}
                onChangeText={(username)=>this.setState(username)}
              />
              </View>
              <View style={styles.textInputView}>
              <Hoshi
                label={'Password'}
                // this is used as active border color
                borderColor={config.primaryColor}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={"#fff"}
                value={this.state.password}
                onChangeText={(password)=>this.setState(password)}
              />
            </View>
            <View style={styles.button}>
              <Button 
                title={"Login"}
                color={config.primaryColor}
              />
            </View>
            
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  view:{
    height:"50%",
    width: "100%",
    // justifyContent: 'center',
    // backgroundColor: config.backgroundColor,
    alignItems: 'center',
    justifyContent:'space-around',
    marginTop: "50%"
  },
  title:{
    fontFamily: config.fontFamily,
    fontSize: 60,
    marginTop: -20
  },
  textInputView:{
    width: "90%",
    // marginLeft: "5%",
    marginTop: "40%"
  },
  button:{
    width: "90%",
    marginTop: "50%"
  }

})
