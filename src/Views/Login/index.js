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
import Auth from '../../Services/Auth'
import SpinnerScreen from '../SpinnerScreen'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import third party packages                             *
 *                                                                                      */
//========================================================================================
import { Hoshi } from 'react-native-textinput-effects';
import NetInfo from "@react-native-community/netinfo";
//########################################################################################

export default class index extends PureComponent {

  constructor(props){
    super(props)
    this.auth = new Auth();
  }

  state={
    username:'',
    password:'',
    isLoginReqLoading:false,
    error:false,
    isConnected:true
  }
  static navigationOptions={
      header:null
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected)
        this.setState({isConnected:false})
      else{
        if(!this.state.isConnected){
          this.setState({isConnected:true})
          this.fetchData()
        }
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleLoginClick = async ()=>{
    this.setState({isLoginReqLoading:true})
    try {
      let data = await this.auth.login(this.state.username.trim(),this.state.password.trim())
      if(data[0]===200){
        this.setState({isLoginReqLoading:false})
        await this.auth.storeUserData(data[2])
        this.props.navigation.navigate('SelectCollege')
      }else{
        this.setState({isLoginReqLoading:false,error:true})
      }
      
    } catch (error) {
      this.setState({isLoginReqLoading:false})
      Alert.alert("Technical Error","A Technical error has occured please contact the technical team")
      console.log(error)
    }

  }

  render() {

    if(!this.state.isConnected){
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )
    }
   
    if(this.state.isLoginReqLoading)
      return <SpinnerScreen message="Loading..." />
    
    return (
      <>
        <View style={styles.view}>
            <Text style={styles.title}> Publicity </Text>
            <View style={styles.textInputView}>
              <Hoshi
                label={'Username'}
                // this is used as active border color
                borderColor={this.state.error?"#f00":config.primaryColor}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={"#fff"}
                value={this.state.username}
                onChangeText={(username)=>this.setState({username})}
              />
              </View>
              <View style={styles.textInputView}>
              <Hoshi
                label={'Password'}
                // this is used as active border color
                borderColor={this.state.error?"#f00":config.primaryColor}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={"#fff"}
                value={this.state.password}
                onChangeText={(password)=>this.setState({password})}
              />
              {this.state.error?<Text style={styles.errorText}> Invalid credentials </Text>:null}
            </View>
            <View style={styles.button}>
              <Button 
                title={"Login"}
                color={config.primaryColor}
                onPress={this.handleLoginClick}
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
  },
  errorText:{
    fontFamily: "sans-serif",
    color: "#f00",
    fontSize: 12
  },
  offlineContainer: {
    backgroundColor: config.primaryColor,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:"100%",
    position: 'absolute',
  },
  offlineText: { 
    color: '#fff',
    fontFamily:config.fontFamily 
  },

})
