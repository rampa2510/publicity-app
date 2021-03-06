//========================================================================================
/*                                                                                      *
 *                               import react Dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,StyleSheet,Image,Text,Linking,TouchableOpacity } from 'react-native'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              import externl dependencies                             *
 *                                                                                      */
//========================================================================================
import config from '../../config/general'
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             import helper class and views                             *
 *                                                                                      */
//========================================================================================
import Card from '../../Components/Card'
import CardItem from '../../Components/CardItem'
import postIcon from '../../Assets/job.webp'
import nameIcon from '../../Assets/name.webp'
import CollIcon from '../../Assets/collegeIcon.webp'
import phoneIcon from '../../Assets/phone.webp'
import Footer from '../../Components/Footer'
//########################################################################################
export default class index extends PureComponent {

  openCall=()=>{
    Linking.openURL(`tel:${this.props.phone}`)
  }

  render() {
    // console.log(details)
    let {name,college,phone,post} = this.props.details

    if(name.length>22){
      name = name.slice(0,22)
      name+=" ..."
    }

    if(college.length>22){
      college = college.slice(0,22)
      college+=" ..."
    }


    if(post.length>22){
      post = post.slice(0,22)
      post+=" ..."
    }

    return (
      <View style={styles.mainContainer}>
        <Card style={styles.card}>

          <CardItem>
            <Image source={nameIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {name} </Text>
          </CardItem>

          <CardItem>
            <Image source={postIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {post} </Text>
          </CardItem>

          <CardItem>
            <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {college} </Text>
          </CardItem>

          <TouchableOpacity onPress={()=>this.openCall()}>
            <CardItem>
              <Image source={phoneIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
              <Text style={styles.textStyle}> {phone} </Text>
            </CardItem>
          </TouchableOpacity>
          
        </Card>
        {/* <Footer /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: config.backgroundColor,
  },
  textStyle:{
    fontFamily: config.fontFamily,
    fontSize: 20,
    padding:10
  },
  card:{
    marginTop: "10%"
  }
})