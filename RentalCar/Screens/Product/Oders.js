import React,{Component} from 'react';

import {StatusBar, NumberFormat, FormattedNumber, ListView, TouchableOpacity, StyleSheet,Text,Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView, ImageBackground, ActivityIndicator} from 'react-native';


import { Container, Header, Content, Card, CardItem, Body, Icon, Left ,Button,Footer, FooterTab} from "native-base";
import { gray } from 'ansi-colors';


const { width: screenWidth } = Dimensions.get('window')

const a= '../images/backgroud/white.jpg'

export default class Seemore extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            obj: [],
            car : [],
            phone: '',
            email: '',
            diachi:'',
            title:'Xe dream 200'
        }
    }
    componentDidMount() {
        this._fetchNguoiDang();
        this._Bindding();
    }


    _fetchNguoiDang = () => {
        fetch('http://10.0.2.2:45455/api/Users/1')
          .then((response) => response.json())
          .then((resopnseJson) => {
           
              this.setState ({
                obj: resopnseJson,
                phone:resopnseJson.phone,
                email:resopnseJson.tenNguoiDang
              })
  
              if(this.state.obj.length ==0)
                {
                  alert('cant load users from server')
                }
              
          })
          .catch((error) => {
              console.error(error);
          });
    
    }
    _Bindding = () => {
        fetch('http://10.0.2.2:45455/api/getcar/1')
          .then((response) => response.json())
          .then((resopnseJson) => {
              this.setState ({
                  car : resopnseJson,
                 diachi: resopnseJson.diachi
              })
          })
          .catch((error) => {
              console.error(error);
          });
    
    }

    render() {
      const {navigation}=this.props; 
      return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>

              <View style={styles.Thumbnail}>
              <ImageBackground style={styles.Thumbnail} source={require(a)}>
              <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
                  <TouchableOpacity onPress={() => {
                              navigation.goBack()
                          }}>
                    <Icon style={{paddingLeft:20, paddingTop:20}} name='arrow-back' />
                  </TouchableOpacity>
                  <Text style= {{fontSize:20, textAlign:"center", paddingTop:15, paddingLeft:30}}>{this.state.title}</Text>
                </ScrollView>
                <Text style= {{fontSize:14,  paddingBottom:20, paddingLeft:70}}>{this.state.title}</Text>

              </View>
              </ImageBackground>
              </View>
              <ScrollView>
                <Content style={{height:60,backgroundColor:'#f5f5f5', shadowColor:'gray'}}>
                    <Text style={styles.Header}>Thông tin chủ xe</Text>
                </Content>
                <Content>
                          
                </Content>

                <Content >
                <Card transparent>
                    <CardItem>
                        <Text>
                        {this.state.diachi}
                        </Text>
                    </CardItem>
                </Card>
                </Content>

                <Content style={{height:60,backgroundColor:'#f5f5f5', shadowColor:'gray'}}>
                    <Text style={styles.Header}>Yêu cầu</Text>
                </Content>
              </ScrollView>
            </View>
            
          <View style={styles.footer}>
              <ScrollView style={{flex:1}} horizontal={true}>
                  <Text style= {{fontSize:20, fontWeight:'100', paddingLeft:20}}>Tổng cộng</Text>
                  <Text style= {{fontSize:22, fontWeight:'100', paddingLeft:width/2-48, textAlign:'right', paddingRight:20}}>2.500.000đ</Text>
              </ScrollView>
              <View style={{position:'absolute',justifyContent:'flex-end',paddingTop:25}}>
              <Button block success style={styles.Button}>
                 <Text style={{fontSize:22,fontWeight:'bold',color:'white', fontWeight:'600'}}>Gửi yêu cầu</Text>
             </Button>
              </View>
               
          </View>
        </Container>

      );
  }
}


const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex:1
      },
    Thumbnail:{
        height:100,
        left: 0,
        right: 0,
        width: width,
        borderBottomColor:'gray',
        borderBottomWidth:0.4   
        
    },
        TextHeader : {
        paddingTop:1,
        fontWeight:'bold',
        fontSize:30,
        fontFamily:'time new roman',
        },
        textdefault:{
        paddingTop:5,
        fontSize:14,
        color:'gray'
        },
        footer: {
            height:120,
            backgroundColor:'white',
            borderTopColor:'gray',
            borderTopWidth:0.4,
            justifyContent:'center'
        },
        Button:{
            borderRadius:6,
            width:width-40,
            marginLeft:20,
            alignItems:'center',
            marginRight:20,
            textAlign:'center',
            height:60
        },
        content :{
            height:40,
            justifyContent:'center',
            flex:1
        },
        Header: {
            fontSize:20,
            color:'gray',
            paddingLeft:20,
            paddingTop:15,
            borderTopColor:'gray',
            borderTopWidth:0.4,
            fontWeight:'bold'
        }
})