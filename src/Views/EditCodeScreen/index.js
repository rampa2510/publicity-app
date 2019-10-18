//========================================================================================
/*                                                                                      *
 *                              Import react depeendencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { View,StyleSheet,Text,TouchableOpacity,Alert,ToastAndroid } from 'react-native'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import 3rd party dependencies                            *
 *                                                                                      */
//========================================================================================

import { Hoshi } from 'react-native-textinput-effects';
import NetInfo from "@react-native-community/netinfo";

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import userdefined files here                            *
 *                                                                                      */
//========================================================================================

import SpinnerScreen from '../SpinnerScreen'
import config from '../../config/general'
import Edit from '../../Services/addEditCodes'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
//########################################################################################

export default class index extends PureComponent {

  constructor(props){
    super(props)
    this.edit = new Edit()
    this.unsubscribe
  }
  
  // static navigationOptions = {
  //   title: 'Add code'
  // }


  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected)
        this.setState({isConnected:false})
      else{
        if(!this.state.isConnected)
          this.setState({isConnected:true})
      }
    })
    this.focusListner = this.props.navigation.addListener("willFocus",()=>{
      let code = this.props.navigation.getParam("code","")
      this.setState({prevValue:code})
    })
    
  }
  componentWillUnmount() {
    this.unsubscribe()
    this.focusListner.remove()
  }

  state={
    codeValue:'',
    nameValue:'',
    isConnected:false,
    isLoading:false,
    prevValue:""
  }

  handleSubmitBtnClick=async ()=>{
    const { codeValue,nameValue } = this.state
    let condition = nameValue.trim().length && codeValue.trim().length 
    if(condition){
      this.setState({isLoading:true})
      try {
        let data =await this.edit.editCode(this.state)
        ToastAndroid.show("Code Edited !",ToastAndroid.SHORT)
        this.setState({isLoading:false,codeValue:'',nameValue:''})
        this.props.navigation.navigate('EditCode')
      } catch (error) {
        this.setState({isLoading:false})
        Alert.alert("Technical Error","A Technical error has occured please contact the technical team")
        console.log(error)         
      }
    }else
      ToastAndroid.show('Incomplete details', ToastAndroid.SHORT);

    // console.log(this.state)
  }

  render(){

    if(!this.state.isConnected){
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )
    }

    if(this.state.isLoading)
      return <SpinnerScreen message="Editing code ..." />

      const { mainContainer,textInputView,buttonStyle,textStyle } = styles
    return(
      <View style={mainContainer}>
        <Header title="Edit Codes" purpose="edit" />
        <View style={textInputView}>
          <Hoshi
            label={'New code'}
            // this is used as active border color
            borderColor={ config.primaryColor }
            // active border height
            borderHeight={2}
            inputPadding={16}
            // this is used to set backgroundColor of label mask.
            // please pass the backgroundColor of your TextInput container.
            backgroundColor={config.backgroundColor}
            returnKeyType={'next'}
            // ref={ref=> this.designationInput = ref}   
            onChangeText={(code)=>this.setState({codeValue:code})}
            // onSubmitEditing={()=>this.nameInput.focus()}
            // onEndEditing={e=>this.changeCompletionValue("post")}
            value={this.state.codeValue}
          />
          </View>

          <View style={textInputView}>
          <Hoshi
            label={'Name of college'}
            // this is used as active border color
            borderColor={ config.primaryColor }
            // active border height
            borderHeight={2}
            inputPadding={16}
            // this is used to set backgroundColor of label mask.
            // please pass the backgroundColor of your TextInput container.
            backgroundColor={config.backgroundColor}
            returnKeyType={'go'}
            // ref={ref=> this.nameInput = ref}   
            onChangeText={(name)=>this.setState({nameValue:name})}
            // onSubmitEditing={()=>this.nameInput.focus()}
            // onEndEditing={e=>this.changeCompletionValue("post")}
            value={this.state.nameValue}
          />
        </View>
        
        <TouchableOpacity style={buttonStyle} onPress={this.handleSubmitBtnClick}>

            <Text style={textStyle}> Submit </Text>

        </TouchableOpacity>


        <Footer />
      </View>
    )
   
  }
}

const styles=StyleSheet.create({
  header:{
    backgroundColor: config.primaryColor,
   //  flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon:{
    marginLeft: "5%"
  },
  headerMaintext:{
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: "40%",
  },  
  mainContainer:{
    backgroundColor: config.backgroundColor,
    height: "100%",
   //  marginTop: "5%"
  },
  textInputView:{
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%"
  },
  buttonStyle:{
    alignSelf: 'stretch',
    backgroundColor: config.primaryColor,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "10%"
  },
  offlineContainer: {
    backgroundColor: '#0099ff',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:"100%",
    position: 'absolute',
  },
  offlineText: { color: '#fff' },
  textStyle:{
    alignSelf: 'center',
    color : '#fff',
    fontSize: 17,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: config.fontFamily,
  },
  
  
})