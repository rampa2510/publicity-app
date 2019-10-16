import { apiUrl } from '../config/url'

export default class Add {
  addCode=async (code,name)=>{
    let url = `${apiUrl}/addcodes`
    try {
      let body = {
        code,
        name
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
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}