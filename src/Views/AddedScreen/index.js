
//========================================================================================
/*                                                                                      *
 *                               Import react dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,StyleSheet,FlatList,Text } from 'react-native'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import externl dependencies                             *
 *                                                                                      */
//========================================================================================
import config from '../../config/general'

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                               import user defined files                              *
 *                                                                                      */
//========================================================================================
import SpinnerScreen from '../SpinnerScreen'
import NetInfo from "@react-native-community/netinfo"
import DetailsCard from '../../Components/DetailsCard'
import Analysis from '../../Services/Analysis'
import EmptyScreen from '../EmptyScreenView'
//########################################################################################

export default class index extends PureComponent {

  constructor(props){
    super(props)
    this.analysis = new Analysis()
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

  fetchData=async (shouldRefresh)=>{
    if(!shouldRefresh){
      this.setState({
        isLoading:true
      })
    }
    try {
      let data = await this.analysis.getDetailsAddedByUser(this.username)
      // console.log(data)
      this.setState({isLoading:false,refreshing:false,data}) 
    } catch (error) {
      this.setState({isLoading:false,refreshing:false})
      Alert.alert("Technical Error","A Technical error has occured please contact the technical team")
      // console.log(error)
    }
  }

  UNSAFE_componentWillMount(){
    this.username = this.props.navigation.getParam("username",null)
    // console.log(this.username)
    this.fetchData()
  }

  static navigationOptions = {
    title: 'Details'
  }
  
  state={
    isLoading:true,
    refreshing:false,
    data:[],
    isConnected:true,
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
      return <SpinnerScreen message="Loading colleges" />

    return (
      <View style={styles.mainContainer}>

      {/* <ScrollView> */}
        <FlatList
        data={this.state.data}
        renderItem={({item})=> <DetailsCard details={item} />}
        keyExtractor={(item)=>item._id}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        ListEmptyComponent={<View style={{marginTop:40}}><EmptyScreen message="No data to show" /></View>}
        />
      {/* </ScrollView> */}
      
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