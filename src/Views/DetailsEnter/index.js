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
import config from '../../config/url'
import Fetch from '../../Services/fetchDetails'
import Header from '../../Components/Header'
import Auth from '../../Services/Auth'
//########################################################################################

/**
 * @description The main view class that will render the main form
 */
export default class App extends PureComponent {

  constructor(props){
    super(props)
    this.unsubscribe
    this.fetch = new Fetch()
    this.auth = new Auth()
    this.setUsername()
  }

  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected)
        this.setState({isConnected:false})
      else{
        if(!this.state.isConnected)
          this.setState({isConnected:true})
      }
    })
    
    // const { navigation } = this.props;

    // this.focusListener = navigation.addListener("didFocus", () => {
    //   let code = this.props.navigation.getParam("code",'')
    //   //console.log(code)
    //   this.setState({college:code},()=>console.log(this.state))
    //   this.changeCompletionValue("college")
    // });
    // this.blurListener = navigation.addListener("didBlur", () => {
    //   // let code = this.props.navigation.getParam("code",'')
    //   // console.log(code)
    //   this.setState({college:''})
    // });
  }

  componentWillUnmount() {
    this.unsubscribe()
    this.focusListener.remove()
    this.blurListener.remove()
  }



  state={
    phone:'',
    name:'',
    college:'',
    post:'',
    completion:0,
    error:[],
    completedFields:[],
    isConnected:true,
    isReqLoading:false,
    isLoading:true,
    collegeData:[],
    username:''
  }

  setUsername=async ()=>{
    let data = await this.auth.getUserData()
    this.setState({username:data.username})
  }

  // function to validate phone number
  validatePhone=()=>{
    if(this.state.phone.trim().length!==10){
      this.setState(prevState=>{
        let errArr = [...prevState.error,"phone"]
        return { error : errArr}
      })
      return
    }
    return true
  }

  // function to validate name
  validateName=()=>{
    if(this.state.name.trim().length===0){
      this.setState(prevState=>{
        let errArr = [...prevState.error,"name"]
        return { error : errArr}
      })
      return
    }
    return true
  }

  // function to validate college
  validateCollege=()=>{
    if(this.state.college.trim().length===0){
      this.setState(prevState=>{
        let errArr = [...prevState.error,"college"]
        return { error : errArr}
      })
      return
    }
    return true
  }

  validatePost=()=>{
    if(this.state.post.trim().length===0){
      this.setState(prevState=>{
        let errArr = [...prevState.error,"post"]
        return { error : errArr}
      })
      return
    }
    return true
  }

  changeCompletionValue=(field)=>{
    
    let isValid

    switch (field) {
      
      case 'phone':
        isValid = this.validatePhone()
        
        if(isValid){
          // dont add the already present loop so that the completion score is not affected
          if(!this.state.completedFields.includes('phone')){

            // if it is in the error fields remove it to remove the error styling
            if(this.state.error.includes('phone')){

              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'phone']
                let error = this.state.error.filter(field => field !== 'phone')
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1,
                  error
                } 
              },()=>{
                this.nameInput.focus()
              })
              // if it is not then normally add it to completed loop
            }else{
              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'phone']
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1
                } 
              },()=>{
                this.nameInput.focus()
              })
            }
          }
        }else{
          // if it is not a valid field check if it is present in valid Array
          if(this.state.completedFields.includes('phone')){

            let compArr = this.state.completedFields.filter(field => field !== 'phone')
            
            this.setState(prevState=>{
              return {
                completedFields:compArr,
                completion:prevState.completion - 1
              }
            })
          }

        }
        break;
      case 'name':
        isValid = this.validateName()

        if(isValid){
            // dont add the already present loop so that the completion score is not affected

            if(!this.state.completedFields.includes('name')){
              // if it is in the error fields remove it to remove the error styling
              if(this.state.error.includes('name')){
                this.setState(prevState=>{
                  let compArr = [...prevState.completedFields,'name']
                  let error = this.state.error.filter(field => field !== 'name')
                  return {
                    completedFields:compArr,
                    completion:prevState.completion+1,
                    error
                  } 
                },()=>{
                  this.collegeInput.focus()
                })
                // if it is not then normally add it to completed loop
              }else{
                this.setState(prevState=>{
                  let compArr = [...prevState.completedFields,'name']
                  return {
                    completedFields:compArr,
                    completion:prevState.completion+1
                  } 
                },()=>{
                  this.collegeInput.focus()
                })
              }
          }
        }else{
          // if it is not a valid field check if it is present in valid Array

          if(this.state.completedFields.includes('name')){

            let compArr = this.state.completedFields.filter(field => field !== 'name')
            
            this.setState(prevState=>{
              return {
                completedFields:compArr,
                completion:prevState.completion - 1
              }
            })
          }

        }        
        break;

      case 'college':
        isValid = this.validateCollege()

       if(isValid){
         // dont add the already present loop so that the completion score is not affected
          if(!this.state.completedFields.includes('college')){
            // if it is in the error fields remove it to remove the error styling
            if(this.state.error.includes('college')){
              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'college']
                let error = this.state.error.filter(field => field !== 'college')
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1,
                  error
                } 
              },()=>{
                this.designationInput.focus()
              })
              // if it is not then normally add it to completed loop
            }else{
              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'college']
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1
                } 
              },()=>{
                this.designationInput.focus()
              })
            }
          }
        }else{
          // if it is not a valid field check if it is present in valid Array
          if(this.state.completedFields.includes('college')){

            let compArr = this.state.completedFields.filter(field => field !== 'college')
            
            this.setState(prevState=>{
              return {
                completedFields:compArr,
                completion:prevState.completion - 1
              }
            })
          }

        }
        break;
      case 'post':
        isValid = this.validatePost()
        if(isValid){
          // dont add the already present loop so that the completion score is not affected
          if(!this.state.completedFields.includes('post')){
            // if it is in the error fields remove it to remove the error styling
            if(this.state.error.includes('post')){
              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'post']
                let error = this.state.error.filter(field => field !== 'post')
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1,
                  error
                } 
              },()=>{
                // this.handleSubmitBtnClick()
              })
              // if it is not then normally add it to completed loop
            }else{
              this.setState(prevState=>{
                let compArr = [...prevState.completedFields,'post']
                return {
                  completedFields:compArr,
                  completion:prevState.completion+1
                } 
              },()=>{
                // this.handleSubmitBtnClick()
              })
            }
          }
        }else{
          // if it is not a valid field check if it is present in valid Array
          if(this.state.completedFields.includes('post')){

            let compArr = this.state.completedFields.filter(field => field !== 'post')
            
            this.setState(prevState=>{
              return {
                completedFields:compArr,
                completion:prevState.completion - 1
              }
            })
          }

        }
        break;

    }
  }

  // handlePhoneInp=(phone)=>{
  //   if(this.state.phone.length===0){
  //     if(phone=='9' || phone == '8' || phone == '7' || phone == "6"){
  //       let error = this.state.error.filter(field => field !== 'phone')
  //       this.setState({phone,error})
  //     }
  //     else{

  //       this.setState(prevState=>{
  //         let errArr = [...prevState.error,"phone"]
  //         return { error : errArr}
  //       })

  //       ToastAndroid.show('Enter a valid mobile number', ToastAndroid.SHORT);
  //     }
  //   }else
  //     this.setState({phone})
  // }




  // this will render the inputs in the view
  renderTextInput=()=>{
    // console.log(this.state)
    // desturture the style
    const { textInputView, textInputStyle, errorText } = styles

    return (
      <>
      <View style={textInputView}>

        {/* Phone field */}
        <View style={textInputStyle}>
        <Hoshi
          label={'Phone Number'}
          // this is used as active border color
          borderColor={this.state.error.includes('phone') ? "#f00" : '#0099ff'}
          // active border height
          borderHeight={2}
          inputPadding={16}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          backgroundColor={'#F9F7F6'}
          // TextInput props
          autoCompleteType="cc-number"
          keyboardType="number-pad"
          maxLength={10} 
          returnKeyType={'next'}
          onSubmitEditing={() => this.changeCompletionValue("phone")}
          onChangeText={(phone)=>this.setState({phone})}
          onEndEditing={e=>this.changeCompletionValue("phone")}
          value={this.state.phone}
          />
          {this.state.error.includes('phone')?<Text style={errorText}> Please enter a valid phone number </Text>:null}
        </View>

        {/* Name field */}
        <View style={textInputStyle}> 
        <Hoshi
          label={'Name'}
          // this is used as active border color
          borderColor={this.state.error.includes('name') ? "#f00" : '#0099ff'}
          // active border height
          borderHeight={2}
          inputPadding={16}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          backgroundColor={'#F9F7F6'}
          // TextInput props
          autoCompleteType="name"
          keyboardType="default"
          returnKeyType={'next'}
          ref={ref=> this.nameInput = ref}  
          onSubmitEditing={() => this.changeCompletionValue("name")} 
          onChangeText={(name)=>this.setState({name})}
          onEndEditing={e=>this.changeCompletionValue("name")}
          value={this.state.name}
        />
          {this.state.error.includes('name')?<Text style={errorText}> Please enter your name </Text>:null}
        </View>
        
        {/* College field */}
        <View style={textInputStyle}>
        
        <Hoshi
          label={'College Code'}
          // this is used as active border color
          borderColor={this.state.error.includes('college') ? "#f00" : '#0099ff'}
          // active border height
          borderHeight={2}
          inputPadding={16}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          backgroundColor={'#F9F7F6'}
          // TextInput props
          // autoCompleteType="name"
          keyboardType="default"
          returnKeyType={'next'}
          ref={ref=> this.collegeInput = ref}  
          onSubmitEditing={() => this.changeCompletionValue("college")} 
          onChangeText={(college)=>this.setState({college})}
          onEndEditing={e=>this.changeCompletionValue("college")}
          value={this.state.college}
        />
          {this.state.error.includes('college')?<Text style={errorText}> Please enter College code </Text>:null}
        </View>

        {/* Designation field */}
        <View style={textInputStyle}>
        <Hoshi
          label={'Designation/Post'}
          // this is used as active border color
          borderColor={this.state.error.includes('post') ? "#f00" : '#0099ff'}
          // active border height
          borderHeight={2}
          inputPadding={16}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          backgroundColor={'#F9F7F6'}
          returnKeyType={'go'}
          ref={ref=> this.designationInput = ref}   
          onChangeText={(post)=>this.setState({post})}
          onSubmitEditing={()=>this.changeCompletionValue("post")}
          onEndEditing={e=>this.changeCompletionValue("post")}
          value={this.state.post}
        />
          {this.state.error.includes('post')?<Text style={errorText}> Please enter your post </Text>:null}
        </View>
        
        
      </View>
    </>
    )
    
  }


  handleSubmitBtnClick=async ()=>{
    const { phone,name,college,post,username } = this.state
    let condition = (phone.trim().length===10 || phone.trim().length===11) && name.trim().length && post.trim().length
    if(condition){
    this.setState({isReqLoading:true})
      
      try {
        let data = {
          phone,
          name,
          college,
          post,
          addedBy:username
        }
        // console.log(data)
        let body = JSON.stringify(data)
        let response = await fetch(config.apiUrl + '/add',{
          method:"POST",
          body,
          headers:{
            'Content-Type': 'application/json'
          }
        })
        let resp = await response.json()
        // console.log(resp)
        if(resp[0]===409){
          ToastAndroid.show('College not present in database.', ToastAndroid.SHORT);
          this.setState({
            isReqLoading:false,
            completion:3,
            error:['college']
          })
        }else{
          this.setState({
            phone:'',
            name:'',
            college:'',
            post:'',
            completion:0,
            error:[],
            completedFields:[],
            isReqLoading:false,
          },()=>{
            ToastAndroid.show('Details uploaded', ToastAndroid.SHORT);
          })
        }
      } catch (error) {
        this.setState({isReqLoading:false})
        Alert.alert("Technical Error","Unable to add details please contact the technical team")
        console.log(error)
      }
    
    }else{
      Alert.alert("Incomplete details","Please fill the complete form before trying to submit")
    }
  }


  renderSuccessContainer=()=>{
    return(
      <View style={styles.sucessContainer}>
        <Text style={styles.successText}>No Internet Connection</Text>
      </View>
    )
  }

  render() {
    // console.log(this.state)
    // if discconected to internet show nothing
    if(!this.state.isConnected){
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )
    }

    if(this.state.isReqLoading){
      return <SpinnerScreen message="Uploading details ..." />
    }
      

    // console.log(this.state.error)
    // destructure the component
    const { mainContainer, header, headerMaintext, buttonStyle, textStyle, footer, footerText  } = styles
    return (
      <>
      {/* <View style={header}>
      
      <Text style={headerMaintext}> Enter Details </Text>

      </View> */}
      <Header title="Enter Details" />

      <View style={mainContainer}>

        {this.renderTextInput()}

      {/* Button */}

      <TouchableOpacity style={buttonStyle} onPress={this.handleSubmitBtnClick}>

        <Text style={textStyle}> Submit </Text>

      </TouchableOpacity>

     

      </View>

      <View style={footer}>

        <Text style={footerText}> Made with ♥ by Technical Council </Text>

      </View>

      </>
    )
  }
}

const styles = StyleSheet.create({
 mainContainer:{
   backgroundColor: "#F9F7F6",
   height: "82%",
  //  marginTop: "5%"
 },
 header:{
   backgroundColor: "#0099ff",
  //  flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
 },
headerMaintext:{
  fontFamily: "sans-serif",
  fontSize: 20,
  color: "#fff",
  paddingTop: 20,
  paddingBottom: 20,
  // marginLeft: "20%",
  
},
percentageText:{
  color: "#fff",
  fontFamily: "sans-serif",
},
textInputView:{
  width: "90%",
  marginLeft: "5%"
},
textInputStyle:{
  marginTop: "5%"
},
buttonStyle:{
  alignSelf: 'stretch',
  backgroundColor: "#0099ff",
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: "10%"
},
textStyle:{
  alignSelf: 'center',
  color : '#fff',
  fontSize: 17,
  fontWeight: '700',
  paddingTop: 10,
  paddingBottom: 10,
  fontFamily: "sans-serif",
},
errorText:{
  fontFamily: "sans-serif",
  color: "#f00",
  fontSize: 12
  },
spinnerStyle:{
  marginLeft: "5%"
},
footer:{
  // position: "absolute",
  // bottom: "10%",
  // width: "100%",
  height: "10%",
  paddingLeft:"10%",
  paddingRight:"10%",
  paddingBottom:"10%",
  paddingTop:0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "#F9F7F6",
  position: 'absolute', left: 0, right: 0, bottom: "0%"

},
footerText:{
  fontFamily: "sans-serif",
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

})