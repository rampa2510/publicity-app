import { apiUrl } from '../config/url'

export default class Analysis{
  getAllData=async()=>{
    let url = `${apiUrl}/analytics`

    try {
      let response = await fetch(url,{
        method:"GET",
        headers:{
          'Content-Type' : 'application/json'
        }
      })

      let data = await response.json()
      // console.log(data)
      return data[2]
    } catch (error) {
      throw new Error(error)
    }
  }

  getDetailsAddedByUser=async(username)=>{
    let url = `${apiUrl}/user-analytics`
    try {
      let body = {username}
      body = JSON.stringify(body)
      let response = await fetch(url,{
        method:"POST",
        body,
        headers:{
          'Content-Type' : 'application/json'
        }
      })

      let data = await response.json()
      // console.log(data)
      return data[2]
    } catch (error) {
      throw new Error(error)
    }

  }
} 