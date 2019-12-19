
//========================================================================================
/*                                                                                      *
 *                               import react Dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,StyleSheet,FlatList,Text,Alert } from 'react-native'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import externl dependencies                             *
 *                                                                                      */
//========================================================================================

import { Hoshi } from 'react-native-textinput-effects';
import config from '../../config/general'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import helper class and views                             *
 *                                                                                      */
//========================================================================================

import Fetch from '../../Services/fetchDetails'
import SpinnerScreen from '../SpinnerScreen'
import EmptyScreen from '../EmptyScreenView'
import PostCard from '../../Components/PostCard'
// import Footer from '../../Components/Footer'
import NetInfo from "@react-native-community/netinfo";
//########################################################################################


export default class index extends PureComponent {
  constructor(props){
    super(props)
    this.collegeName=this.props.navigation.getParam("name",null)
    this.fetch = new Fetch()
    this.dataArr=[]
  }
  static navigationOptions = {
    title: 'Select Post'
  }

  UNSAFE_componentWillMount(){
    this.fetchData()
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

  state={
    isLoading:true,
    data:[],
    refreshing:false,
    value:"",
    isConnected:true
  }

  handleRefresh=()=>{
    this.setState({
      refreshing:true,
      data:[],
      value:''

    },()=>{
      this.fetchData(true)
    })
  }

  searchFilterFunction = (text) => {    
    this.setState({
      value: text,
    });
    const data = this.dataArr.filter(item => {      
      const itemData = item.post.toLowerCase()
      
       const textData = text.toLowerCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: data });  
    
  };

  fetchData=async (shouldRefresh)=>{
    if(!shouldRefresh){
      this.setState({
        isLoading:true
      })
    }
    // console.log("l")
    try {
      let data = await this.fetch.fetchPosts(this.collegeName)
      this.dataArr=data
      this.setState({isLoading:false,refreshing:false,data})
      // console.log(data) 
    } catch (error) {
      // console.log(error)
      this.setState({isLoading:false,refreshing:false})
      Alert.alert("Technical Error","A Technical error has occured please contact the technical team")
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

    if(this.state.refreshing)
      return <SpinnerScreen message="Refreshing details" />

    if(this.state.isLoading)
      return <SpinnerScreen message="Loading Posts" />

    if(!this.state.data.length && !this.state.value.length)
      return <EmptyScreen message="No data to show" />
      
      

    return (
      <View style={styles.mainContainer}>

        <View style={styles.searchBarContainer}>
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
            value={this.state.value}
            onChangeText={(text)=>this.searchFilterFunction(text)}
          />
        </View>
        
        <FlatList
          data={this.state.data}
          renderItem={({item})=> <PostCard post={item.post} details={item} />}
          keyExtractor={(item)=>item._id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          />

          {/* <Footer /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: config.backgroundColor,
    height: "100%"
  },
  searchBarContainer:{
    width: "90%",
    marginLeft: "5%",
    marginTop: 10
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