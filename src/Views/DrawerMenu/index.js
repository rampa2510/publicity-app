//========================================================================================
/*                                                                                      *
 *                               Import react dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,TouchableWithoutFeedback,StyleSheet,Text,Image } from 'react-native'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                               import user defined files                              *
 *                                                                                      */
//========================================================================================
import Auth from '../../Services/Auth'
//########################################################################################

export default class Drawer extends PureComponent {

  constructor(props){
    super(props)
    this.auth = new Auth()
  }

  state={
    user:''
  }

  async componentDidMount(){
    this.determinType()

  }

  determinType=async ()=>{
    let data =await this.auth.getUserData()
    this.setState({user:data.type})
  }

  logOutUser=async ()=>{
    try {
      let deleteData =await this.auth.removeData()
      // console.log(deleteData)
      if(deleteData){
        this.props.navigation.navigate("Login")
      }else{
        this.props.navigation.navigate("Login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    return (
      <>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SelectCollege')}>
          <View style={styles.buttons}>
          <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/browse.webp')} />
            <Text style={styles.textStyle}>
              Browse Data
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DetailsEnter')} >
          <View style={styles.buttons}>
          <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/details.webp')} />
            <Text style={styles.textStyle}>
              Enter Details
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {this.state.user==="admin"?
        <>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AddCodes')} >
        <View style={styles.buttons}>
        <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/addCodes.webp')} />
          <Text style={styles.textStyle}>
            Add Colleges
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('BrowseCodes')}>
        <View style={styles.buttons}>
        <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/codes.webp')} />
          <Text style={styles.textStyle}>
            Browse Colleges
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('EditCode')}>
        <View style={styles.buttons}>
        <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/editCodes.webp')} />
          <Text style={styles.textStyle}>
            Edit Colleges
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AnaltyicsScreen')}>
        <View style={styles.buttons}>
        <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/analytics.webp')} />
          <Text style={styles.textStyle}>
            Analytics
          </Text>
        </View>
      </TouchableWithoutFeedback>
      </>
      :null}
      <TouchableWithoutFeedback onPress={this.logOutUser}>
        <View style={styles.buttons}>
        <Image style={styles.iconStyle} resizeMode={"contain"} source={require('../../Assets/logout.webp')} />
          <Text style={styles.textStyle}>
            Logout
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
    // padding: 5,
    marginLeft: 10
  },
  textStyle:{
    fontSize: 18,
    color: "#000",
    marginLeft: 20
  }
})