import React,{Component} from 'react';

import { ListView, TouchableOpacity, StyleSheet,Text,Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView, ImageBackground, ActivityIndicator} from 'react-native';


import { Container, Header, Content, Card, CardItem, Body, Icon, Left ,Button,Footer, FooterTab} from "native-base";


const { width: screenWidth } = Dimensions.get('window')

const a= '../images/backgroud/backgroud.jpg'

export default class Seemore extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            isloadding:true,
            carouselItems:[],
            diachi:null,
            email:'',
            phone:'',
            nguoidang: '',
            idnguoidang: '',
            tenxe:'',
            loaixe:'',
            hangxe: '',
            tinh :'',
        }
    }
    componentDidMount() {
      this._fetchData();
    }
    _fetchData = () => {
      //this.props.navigation.state.params.key
      fetch('http://10.0.2.2:45455/api/getcar/'+1)
        .then((response) => response.json())
        .then((resopnseJson) => {
            this.setState ({
              carouselItems: resopnseJson,
              diachi:resopnseJson.diachi,
              nguoidang: resopnseJson.tenNguoiDang,
              idnguoidang: resopnseJson.maNguoiDang,
              tenxe: resopnseJson.tenxe,
              loaixe: resopnseJson.tenLoai,
              hangxe :resopnseJson.tenHang,
              tinh : resopnseJson.tinh,
              isloadding:false,

            })

            
            
        })
        .catch((error) => {
            console.error(error);
        });
  
  }




    render() {
      const {navigation}=this.props; 
      return (
        <SafeAreaView>
            <View style={styles.container}>

              <View style={styles.Thumbnail}>
              <ImageBackground style={styles.Thumbnail} source={require(a)}>
              <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
                  <TouchableOpacity onPress={() => {
                              navigation.goBack()
                          }}>
                    <Icon style={{paddingLeft:20, paddingTop:10}} name='arrow-back' />
                  </TouchableOpacity>
                  <Text style= {{fontSize:20, textAlign:"center", paddingTop:10, paddingLeft:30}}>{this.state.title}</Text>
                </ScrollView>

              </View>
              </ImageBackground>
              </View>
              
              <View style={{flex:1, marginTop:10, marginLeft:20}}> 
          
                <Text style= {styles.TextHeader}>{this.state.tenxe}</Text>
                <Text style={styles.textdefault}>{this.state.loaixe +' ,'+ ' '+this.state.hangxe + ' , '+this.state.tinh}</Text>
                <Button transparent>
                  <Text>Địa chỉ</Text>
                  <Text style={{paddingLeft:0,paddingRight:30, left:0}}>{this.state.diachi}</Text>
                </Button>
              </View>
             
            </View>
        </SafeAreaView>

      );
  }
}
const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height:150,
      },
    Thumbnail:{
        height:150,
        left: 0,
        right: 0,
        width: width,
        
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
}
})