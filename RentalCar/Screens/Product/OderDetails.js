import React,{Component} from 'react';

import {StatusBar, NumberFormat, FormattedNumber, ListView, TouchableOpacity, StyleSheet,Text,Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView, ImageBackground, ActivityIndicator} from 'react-native';


import { Container, Header, Content, Card, CardItem, Body, Left ,Button,Footer,DatePicker,Thumbnail} from "native-base";
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width: screenWidth } = Dimensions.get('window')

const a= '../images/backgroud/white.jpg'

export default class Seemore extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            NgayLap: '',
            title:'',
            obj: [],
            IsLoadding: true,
            diachi:'',
            car:[],
            tinhtrang:''
        }
    }
    
    componentDidMount() {
      this._GetAllcart();
      this._Bindding();
      this._Bindding2();
    }

    _GetAllcart = () => {
      fetch('http://10.0.2.2:45455/api/Oders/14')
        .then((response) => response.json())
        .then((resopnseJson) => {
            this.setState ({
              obj: resopnseJson,
              IsLoadding:false,
              title : resopnseJson.maUs,
            })
        if(this.state.obj.length=== 0)
        {
          this.setState ({
            IsData:true
          })
        }
        else{}
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
               car:resopnseJson
              })
          })
          .catch((error) => {
              console.error(error);
          });
    }

    _Bindding2 = () => {
      fetch('http://10.0.2.2:45455/api/Oderstatus/14')
        .then((response) => response.json())
        .then((resopnseJson) => {
          this.setState ({
            tinhtrang:resopnseJson.tinhTrang
           })
           
        })
        .catch((error) => {
            console.error(error);
        });
  }

    
    render() {
      const {navigation}=this.props; 
      if(this.state.isloadding)
      {
        return(
          <View style={{justifyContent:"center", flex:1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop= {80}/>

          </View>
        );
      }
      else
      if(this.state.lazyLoad)
      {
        return (
          <View style={{justifyContent:"center", flex:1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop= {80}/>
          </View>
        )
      }
      else
      {
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
                    <Icon style={{paddingLeft:20, paddingTop:20, fontWeight:'bold'}} name='ios-arrow-back' size={30}/>
                  </TouchableOpacity>
                  <Text style= {{fontSize:20, textAlign:"center", paddingTop:15, paddingLeft:30}}>{this.state.obj.ngayLap}</Text>
                </ScrollView>

              </View>
              </ImageBackground>
                <View style={{height:0.8, backgroundColor:'gray'}}>
                </View>
              </View>
              <ScrollView style={{paddingTop:10}}>
                <View style={{flexDirection: 'row',paddingLeft: 10}}>
                 <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.8}}>
                    <Text style={{color:'gray'}}>Mã yêu cầu</Text>
                  </View>

                  <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.2}}>
                    <Text style={{color:'gray'}}>PHD 000</Text>
                  </View>
                </View>
                <View>
                <Card transparent>
                  <CardItem>
                    <Body>
                    <View style={{flexDirection: 'row',paddingLeft: 10}}>
                      <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.2}}>
                      <Thumbnail style={{backgroundColor:'yellow'}} source={require('../images/backgroud/motoDraw.png')} />
                      </View>
                      <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.8}}>
                        <Text>{this.state.car.tenxe}</Text>
                        <Text>{this.state.tinhtrang}</Text>
                      </View>
                    </View>
                    </Body>
                  </CardItem>
                </Card>

                <Card transparent>
                  <CardItem>
                    <Body>
                    <View style={{flexDirection: 'row',paddingLeft: 10}}>
                      <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.2}}>
                        <Icon style={{fontWeight:'bold',color:'blue'}} name='ios-locate' size={30}/>
                      </View>
                      <View style={{paddingTop:10, marginLeft:5, marginRight:5, flex:0.8}}>
                        <Text>{this.state.car.diachi}</Text>
                      </View>
                    </View>
                    </Body>
                  </CardItem>
                </Card>

                </View>
                  
              </ScrollView>
            </View>
        </Container>

      );
    }

  }
}

class CarDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
        obj: [],
        car : [],
        phone: '',
        email: '',
        diachi:'',
        title:'Xe dream 200',
        tenLoai :'',
        namsx :''
    }
}

  componentDidMount() {
      this._Bindding();
  }


  _Bindding = () => {
      fetch('http://10.0.2.2:45455/api/Oders/14')
        .then((response) => response.json())
        .then((resopnseJson) => {
            this.setState ({
              car : resopnseJson,
              diachi: resopnseJson.diachi,
              tenLoai :resopnseJson.tenLoai,
              namsx : resopnseJson.tuNgay
            })
        })
        .catch((error) => {
            console.error(error);
        });
  }


  render() {
    return (
      <Content style={{backgroundColor:'white', marginTop:5}}>
        <Card transparent style={styles.Cards}>
            <CardItem transparent Header style={styles.Header} >
              <Text style={styles.TextHeader}>Thông tin xe</Text>
                </CardItem>
                  <Body >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 20,
                        }}>
                    <View style={{flex: 0.4}} >
                      <Text style= {styles.TextCardItem}>Địa chỉ  </Text>
                      <Text style= {styles.TextCardItem}>Loại xe  </Text>
                      <Text style= {styles.TextCardItem}>Năm sản xuất  </Text>
                      <Text style= {styles.TextCardItem}>Biển số  </Text>


                    </View>
                    <View style={{flex: 0.6}} >
                      <Text style= {styles.TextCardItem}  >{this.state.diachi}</Text>
                      <Text style= {styles.TextCardItem}>{this.state.tenLoai} </Text>
                      <Text style= {styles.TextCardItem}>{this.state.namsx} </Text>
                    </View>
                  </View>
                </Body>
                <CardItem footer>
              </CardItem>
          </Card>
        </Content>
    );
  }

  
}


const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f8f8ff'
      },
    Thumbnail:{
        height:100,
        left: 0,
        right: 0,
        width: width,
        borderBottomColor:'gray',
        borderBottomWidth:0.4,
        
    },
        TextHeader : {
        paddingTop:1,
        fontWeight:'bold',
        fontSize:20,
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
            fontWeight:'bold'
        },
        Cards:{
          marginTop:10, 
          marginLeft:8, 
          marginRight:5,
        },
        TextCardItem : {
          fontSize :18,
          marginTop:2
        }
})