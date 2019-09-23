import React, { PureComponent } from 'react'
import { View } from 'react-native'

export default class index extends PureComponent {
  constructor(props){
    super(props)
    this.collegeName=this.props.navigation.getParam("name",null)

  }

  state={
    isLoading:true,
    data:[],
    refreshing:false,
    value:""
  }
  render() {
    return (
      <View>
        
      </View>
    )
  }
}
