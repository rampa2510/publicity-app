import { apiUrl } from '../config/url'
export default class Fetch{

  fetchCollege =async ()=>{
      let url = `${apiUrl}/fetchcollege`
    // console.log(page)
    try {
      
      let response = await fetch(url,{
        method:"GET"
      })
      let data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    
  }

  fetchPosts=async (collegeName)=>{
    let url = `${apiUrl}/fetchpost`
    try {
      let body={
        collegeName
      }
      console.log(body)
      body=JSON.stringify(body)
      let response = await fetch(url,{
        method:"POST",
        body,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    
  }
}