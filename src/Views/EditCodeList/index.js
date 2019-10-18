//========================================================================================
/*                                                                                      *
 *                              Import react depeendencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { View,FlatList,StyleSheet,Alert,Text } from 'react-native'

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
import CollegeCard from '../../Components/CollegeCard'
// import Footer from '../../Components/Footer'
import NetInfo from "@react-native-community/netinfo";
import Header from '../../Components/Header'
//########################################################################################

export default class index extends PureComponent{
  constructor(props){
    super(props)
    this.fetch = new Fetch()
    this.dataArr=[]
  }

  state={
    data:[],
    value:'',
    isConnected:true,
    refreshing:false,
    isLoading:true,
  }

  UNSAFE_componentWillMount(){
    this.fetchData()
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

  searchFilterFunction = (text) => {    
    this.setState({
      value: text,
    });
    const data = this.dataArr.filter(item => {      
      const itemData = item.code.toLowerCase()
      
       const textData = text.toLowerCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: data });  
    
    // this.arrayholder.filter(item=>{
    //   const itemData = item.title.lowecase
    // })
  };

  fetchData=async (shouldRefresh)=>{
    if(!shouldRefresh){
      this.setState({
        isLoading:true
      })
    }
    try {
      let data = await this.fetch.fetchCollege()
      this.dataArr=data
      this.setState({isLoading:false,refreshing:false,data}) 
    } catch (error) {
      this.setState({isLoading:false,refreshing:false})
      Alert.alert("Technical Error","A Technical error has occured please contact the technical team")
      console.log(error)
    }
  }

  renderSearchBar=()=>{
    return(
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
    )
  }

  
  render(){

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
      return <SpinnerScreen message="Loading colleges" />

    // if(!this.state.data.length && !this.state.value.length)
    //   return <EmptyScreen message="No data to show" />

    return(
      <>
      <Header title="Edit codes" />
      <View style={styles.mainContainer}>

      {/* <ScrollView> */}
        <FlatList
        data={this.state.data}
        renderItem={({item})=> <CollegeCard code={item.code} name={item.name} purpose="edit" />}
        ListHeaderComponent={this.renderSearchBar()}
        keyExtractor={(item)=>item._id}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        ListEmptyComponent={<View style={{marginTop:40}}><EmptyScreen message="No data to show" /></View>}
        />
      {/* </ScrollView> */}
      
      </View>
      </>
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