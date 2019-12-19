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
    let purpose = this.props.purpose
    // if(name.length>22){
    //   name = name.slice(0,22)
    //   name+=" ..."
    // }
    if(purpose==="post"){
        return (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("SelectPost",{name:this.props.code})}>
          <Card>
            <CardItem>
              {/* <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} /> */}
              <Text style={styles.textStyle}> {name} </Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    }
    if(purpose==="view"){
      return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DetailsEnter",{code:this.props.code})}>
        <Card>
          <CardItem>
            {/* <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} /> */}
            <Text style={styles.textStyle}> {this.props.code} - {name} </Text>
          </CardItem>
        </Card>
       </TouchableOpacity>
    )
    }
    if(purpose==="edit"){
      return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditCodeScreen",{code:this.props.code})}>
        <Card>
          <CardItem>
            <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {this.props.code} - {name} </Text>
          </CardItem>
        </Card>
       </TouchableOpacity>
    )
    }
  }
}
const styles = StyleSheet.create({
  textStyle:{
    fontFamily: config.fontFamily,
    fontSize: 20,
    padding:10,
    textTransform: "capitalize",
  }
})

export default withNavigation(index)
