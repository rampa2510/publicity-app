//========================================================================================
/*                                                                                      *
 *                               import react Dependencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { View,Text,StyleSheet,Alert } from 'react-native'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import externl dependencies                             *
 *                                                                                      */
//========================================================================================

import { Hoshi } from 'react-native-textinput-effects';
import config from '../../config/color'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                  import helper class                                 *
 *                                                                                      */
//========================================================================================
import Fetch from '../../Services/fetchDetails'
export default class index extends PureComponent {

  constructor(props){
    super(props)
    this.fetch = new Fetch()
    this.dataHolder=[]
    this.fetchCollege()
  }

  static navigationOptions = {
    title: 'Select College'
  }

  state={
    isLoading:true,
    data:[],
    refreshing:false,
    value:null,
    page:0,
  }

  // method to get the college data
  fetchCollege=async ()=>{
    try {
      let data =await this.fetch.fetchCollege()
      this.dataHolder = data
      this.setState({
        isLoading:false,
        data,
        refreshing:false,
      })  
    } catch (error) {
      console.log(error)
      Alert.alert("Technical Error","A technical error has occured please contact the technical team")
    }
  }

  handleRefresh=()=>{
    this.setState({
      refreshing:true,
      data:[]
    },()=>{
      this.fetchCollege()
    })
  }

  // search function helper method
  searchFilterFunction = (text) => {    
    this.setState({
      value: text,
    });
    const data = this.dataHolder.filter(college => {      
      const collegeName = college.name.toLowerCase()
      
       const textData = text.toLowerCase();
        
       return collegeName.indexOf(textData) > -1  
    })
    
    this.setState({ data })
    
    // this.arrayholder.filter(item=>{
    //   const itemData = item.title.lowecase
    // })
  }

  render() {

    const { mainContainer, searchBarContainer } = styles 

    return (
      <View style={mainContainer}>

        {/* Search container */}
        <View style={searchBarContainer}>
          <Hoshi
            label={'Search'}
            // this is used as active border color
            borderColor={config.primaryColor}
            // active border height
            borderHeight={3}
            inputPadding={16}
            // this is used to set backgroundColor of label mask.
            // please pass the backgroundColor of your TextInput container.
            backgroundColor={config.backgroundColor}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: config.backgroundColor
  },
  searchBarContainer:{
    width: "90%",
    marginLeft: "5%"
  }
})