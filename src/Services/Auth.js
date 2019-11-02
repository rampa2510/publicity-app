//========================================================================================
/*                                                                                      *
 *                             import 3rd party dependencies                            *
 *                                                                                      */
//========================================================================================

import AsyncStorage from '@react-native-community/async-storage';

//########################################################################################

import { apiUrl } from '../config/url'


export default class Auth {
  storeUserData = async (data) => {
    // console.log(data)
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data))
      // console.log('l')
      return true
    } catch (e) {
      // saving error
      throw new Error(e)
    }
  }

  getUserData=async ()=>{
    try {
      const value = await AsyncStorage.getItem("userData")
    if(value !== null) 
      return JSON.parse(value)
    else
      return false
    
    } catch (error) {
      throw new Error(error)
    }
  }

  createUser=async (username,password,type="user")=>{
    let url = `${apiUrl}/adduser`

    try {
      let body = {
        username,
        password,
        type
      }

      body = JSON.stringify(body)
      let response = await fetch(url,{
        method:"POST",
        body,
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      
      let data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  login=async (username,password)=>{
    let url = `${apiUrl}/login`
    try {
      let body = {
        username,
        password,
      }

      body = JSON.stringify(body)
      let response = await fetch(url,{
        method:"POST",
        body,
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      let data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}