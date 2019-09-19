import { apiUrl } from '../config/url'

export default class Fetch{
  fetchCollege = async ()=>{
    let url = `${apiUrl}/fetchcollege`
    
    try {
      let response = await fetch(url,{
        method:"GET"
      })
      let data =await response.json()
      return data.respData
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}