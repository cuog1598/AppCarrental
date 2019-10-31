import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Fab ,Card} from 'native-base';
import {StyleSheet,BackHandler, Image, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
export default class BigHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
        IsData:false,
        IsLoadding: true,
      

    }
}
componentDidMount()
{
}
  render() {
    return (
        <View>
            <View style={styles.Thumbnail}>
            <ImageBackground style={styles.Thumbnail} source={require('../images/backgroud/white.jpg')}>
                <View style={{
                justifyContent:'center'
                    }}>
                <Text style= {{fontSize:30, paddingTop:45,color:'#228b22'}}>{this.props.Titile}</Text>
                </View>
                </ImageBackground>
            </View>
            <View style={{height:0.8, backgroundColor:'gray'}}>
              </View>
        </View>
        
    );
  }
}
const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex:1
      },
    Thumbnail:{
        height:100,
        left: 0,
        right: 0,
        width: width,
        borderBottomColor:'gray',
        borderBottomWidth:0.4,
        alignItems:'center',
    },
    TextHeader : {
      paddingTop:1,
      fontWeight:'bold',
      fontSize:18,
      fontFamily:'time new roman',
      },
      TextCardItem : {
        fontSize :18,
        marginTop:2
      }
})