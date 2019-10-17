//========================================================================================
/*                                                                                      *
 *                               import react dependencies                              *
 *                                                                                      */
//========================================================================================

import React, { PureComponent } from 'react'
import { Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import userdefined components                            *
 *                                                                                      */
//========================================================================================

import Card from '../Card'
import CardItem from '../CardItem'
import CollIcon from '../../Assets/collegeIcon.webp'
//########################################################################################

// import config
import config from '../../config/general'

class index extends PureComponent {
  render() {
    // console.log(this.props)
    let name = this.props.name

    if(name.length>22){
      name = name.slice(0,22)
      name+=" ..."
    }
    return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("SelectPost",{name:this.props.name})}>
        <Card>
          <CardItem>
            <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {name.toUpperCase()} </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
      
    )
  }
}
const styles = StyleSheet.create({
  textStyle:{
    fontFamily: config.fontFamily,
    fontSize: 20,
    padding:10
  }
})

export default withNavigation(index)
