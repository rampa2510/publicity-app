//========================================================================================
/*                                                                                      *
 *                              Import react depeendencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { View,FlatList,StyleSheet,Alert,Text,ScrollView,Image,TouchableWithoutFeedback } from 'react-native'

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
    data=[],
    value:'',
    isConnected:true,
    refreshing:false,
    isLoading:true,
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
}