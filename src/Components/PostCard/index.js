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
import postIcon from '../../Assets/job.webp'
//########################################################################################

// import config
import config from '../../config/general'

class index extends PureComponent {
  render() {
    // console.log(this.props)
    return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details',{details:this.props.details})}>
        <Card>
          <CardItem>
            <Image source={postIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {this.props.post} </Text>
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
