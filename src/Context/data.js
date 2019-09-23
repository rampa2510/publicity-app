import React, { PureComponent,createContext } from 'react'

export const DataContext = createContext() 

export class DataProvider extends PureComponent {

  state={
    data:[]
  }
  toogleData=(data)=>{
    this.setState({data})
  }
  render(){
    <DataContext.Provider value={{...this.state,toogleData:this.toogleData}}>
      {this.props.children}
    </DataContext.Provider>
  }
}