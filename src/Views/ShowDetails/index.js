//========================================================================================
/*                                                                                      *
 *                               import react Dependencies                              *
 *                                                                                      */
//========================================================================================
import React, { PureComponent } from 'react'
import { View,StyleSheet,Image,Text } from 'react-native'
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
  
  static navigationOptions = {
    title: 'Details'
  }

  render() {
    const details = this.props.navigation.getParam("details",null)
    // console.log(details)
    return (
      <View style={styles.mainContainer}>
        <Card style={styles.card}>

          <CardItem>
            <Image source={nameIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {details.name} </Text>
          </CardItem>

          <CardItem>
            <Image source={postIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {details.post} </Text>
          </CardItem>

          <CardItem>
            <Image source={CollIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {details.college} </Text>
          </CardItem>

          <CardItem>
            <Image source={phoneIcon} style={{height: 30,width: 30,marginRight: 10,marginLeft: 10}} resizeMode={"cover"} />
            <Text style={styles.textStyle}> {details.phone} </Text>
          </CardItem>
        </Card>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: config.backgroundColor,
    height: "100%"
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