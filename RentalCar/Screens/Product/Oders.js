import React,{Component} from 'react';

import {StatusBar,BackHandler, NumberFormat, FormattedNumber, ListView, TouchableOpacity, StyleSheet,Text,Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView, ImageBackground, ActivityIndicator} from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Icon, Left ,Button,Footer,DatePicker} from "native-base";
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const { width: screenWidth } = Dimensions.get('window')

const a= '../images/backgroud/white.jpg'

export default class Seemore extends Component {
 
    constructor(props){
        super(props);
        this.setDate = this.setDate.bind(this);
        this.setDateTo = this.setDateTo.bind(this);
        this.state = {
            obj: [],
            car : [],
            phone: '',
            email: '',
            diachi:'',
            title:'Xe dream 200',
            disabled:true,
            chosenDate: new Date() ,
            chosenDateTo: new Date() ,
            date: new Date(),
            totalDay :0,
            gia :'',
            tongcong :'',
            isloadding : true,
            lazyLoad : false,
        }
    }

    setDate(newDate) {
      this.setState({ 
        chosenDate: newDate,
        disabled : false,
       });
    }

    setDateTo(newDate) {
      
      const {chosenDate} = this.state
      this.setState({
         chosenDateTo: newDate,
         totalDay : newDate-chosenDate
       });
    }

    

    componentDidMount() {
        this._fetchNguoiDang();
        this._Bindding();
         this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }
 
  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
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
        fetch('http://10.0.2.2:45455/api/getcar/'+this.props.navigation.state.params.maxe)
          .then((response) => response.json())
          .then((resopnseJson) => {
              this.setState ({
                  car : resopnseJson,
                  diachi: resopnseJson.diachi,
                  gia : resopnseJson.gia,
                  isloadding:false,
              })
          })
          .catch((error) => {
              console.error(error);
          });
    
    }

    CommaFormatted(amount) {
      var delimiter = ","; // replace comma if desired
      var a = amount.split('.',2)
      var d = a[1];
      var i = parseInt(a[0]);
      if(isNaN(i)) { return ''; }
      var minus = '';
      if(i < 0) { minus = '-'; }
      i = Math.abs(i);
      var n = new String(i);
      var a = [];
      while(n.length > 3) {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
      }
      if(n.length > 0) { a.unshift(n); }
      n = a.join(delimiter);
      if(d.length < 1) { amount = n; }
      else { amount = n + '.' + d; }
      amount = minus + amount;
      return amount;
    }

    render() {
      const {navigation}=this.props; 
      var today = new Date();
      var tomorrow = new Date();
      var dateto = new Date();
      tomorrow.setDate(today.getDate()+1);
      dateto.setDate(this.state.chosenDate.getDate()+1);
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
                    <Icon style={{paddingLeft:20, paddingTop:20}} name='arrow-back' />
                  </TouchableOpacity>
                  <Text style= {{fontSize:20, textAlign:"center", paddingTop:15, paddingLeft:30}}>{this.state.title}</Text>
                </ScrollView>
                <Text style= {{fontSize:14,  paddingBottom:20, paddingLeft:70}}>{this.state.title}</Text>

              </View>
              </ImageBackground>
              <View style={{height:0.8, backgroundColor:'gray'}}>
              </View>
              </View>
              
              <ScrollView style={{paddingTop:10}}>
                <Content>
                  <Card style={styles.Cards}>
                    <CardItem Header style={styles.Header} >
                      <Text style={styles.TextHeader}>Nhập thông tin</Text>
                    </CardItem>
                      <Body>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 10
                        }}>
                        <View style={{flex: 0.5}} >
                          <Content>
                            <DatePicker
                              defaultDate={tomorrow}
                              minimumDate={tomorrow}
                              maximumDate={new Date(2020, 12, 31)}
                              locale={"en"}
                              timeZoneOffsetInMinutes={undefined}
                              modalTransparent={false}
                              animationType={"Slide"}
                              androidMode={"default"}
                              placeHolderText="Ngày nhận"
                              placeHolderTextStyle= {{fontSize:18, fontWeight:'400', color:'green'}}
                              textStyle={{ color: "black" , fontSize:18}}
                              onDateChange={this.setDate}
                              disabled={false}
                              />
                          </Content>
                          
                        </View>
                        <View style={{flex: 0.5}} >
                        <Content>
                            <DatePicker
                              defaultDate={dateto}
                              minimumDate={dateto}
                              maximumDate={new Date(2020, 12, 31)}
                              locale={"en"}
                              timeZoneOffsetInMinutes={undefined}
                              modalTransparent={false}
                              animationType={"Slide"}
                              androidMode={"default"}
                              placeHolderText="Ngày trả"
                              textStyle={{ color: "black" , fontSize:18}}
                              placeHolderTextStyle= {{fontSize:18, fontWeight:'400', color:'green'}}
                              onDateChange={this.setDateTo}
                              disabled={this.state.disabled}
                              />
                          </Content>
                         
                        </View>
                      </View>
                      </Body>
                    <CardItem footer>
                    </CardItem>
                  </Card>
                </Content>

                <CarDetails/>

                <Content>
                  <View>
                    <Card style={styles.Cards}>
                      <CardItem Header style={styles.Header} >
                        <Text style={styles.TextHeader}>Thông tin yêu cầu</Text>
                      </CardItem>
                        <Body>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingLeft: 10
                          }}>
                          <View style={{flex: 0.4}} >
                            <Text style={styles.TextCardItem}>Số ngày</Text>
                            <Text style={styles.TextCardItem}>Giá thuê</Text>
                            <Text style={styles.TextCardItem}>Tiền cọc</Text>
                          </View>
                          <View style={{flex: 0.6}} >
                            <Text style={styles.TextCardItem}>{this.state.totalDay/(1000 * 60 * 60 * 24)}</Text>
                            <Text style={styles.TextCardItem}>{this.state.gia} ngày</Text>
                            <Text style={styles.TextCardItem}>2.500.000 đ</Text>
                          </View>
                        </View>
                        </Body>
                      <CardItem footer>
                      </CardItem>
                    </Card>
                  </View>
                  
                </Content>
               
              </ScrollView>
            </View>
            
          <View style={styles.footer}>
              <ScrollView style={{flex:1}} horizontal={true}>
                  <Text style= {{fontSize:20, fontWeight:'100', paddingLeft:20}}>Tổng cộng</Text>
                  <Text style= {{fontSize:22, fontWeight:'100', paddingLeft:width/2-48, textAlign:'right', paddingRight:20}}>
                  {this.state.gia * (this.state.totalDay/(1000 * 60 * 60 * 24)) + 2500000} đ
                  </Text>
              </ScrollView>
              <View style={{position:'absolute',justifyContent:'flex-end',paddingTop:25}}>
              <Button block success style={styles.Button}
               onPress={this.Oders}
              >
                 <Text style={{fontSize:22,fontWeight:'bold',color:'white', fontWeight:'600'}}>Gửi yêu cầu</Text>
             </Button>
              </View>
          </View>
        </Container>

      );
    }

  }
  Oders= async () =>{
    const value =  await AsyncStorage.getItem('@MyApp2_key');
     const {chosenDate, chosenDateTo,disabled} = this.state;
     if(disabled === true)
     {
       alert ('Bạn chưa chưa chọn ngày')
     }
     else
     {
      this.setState({ 
        lazyLoad:true
       });
      fetch('http://10.0.2.2:45455/api/Oders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "maXe": this.props.navigation.state.params.maxe,
          "maUs": value,
          "ngayLap": this.state.date,
          "tuNgay": this.state.chosenDate.toString().substr(0,10),
          "denNgay": this.state.chosenDateTo.toString().substr(0,10),
          "tinhTrangThanhToan": null,
          "status": false,
          "songay": this.state.totalDay/(1000 * 60 * 60 * 24),
          "tongTien": this.state.gia * (this.state.totalDay/(1000 * 60 * 60 * 24)) + 2500000,
          "giamgia": null,
          "huy": false,
          "xacnhan": null,
          "TenXe" : this.state.car.tenxe,
          "DiaCHi" : this.state.diachi,
          "Readed" :false,
        })
        }).then((response) => response.json())
          .then((responseJson) => {
         if(responseJson.title =="Not Found" ) {
          alert('không thành công')
        } else {
           this.props.navigation.navigate("Home");
        }
        }).catch((error) => {
          alert(error);
        });
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
      fetch('http://10.0.2.2:45455/api/getcar/1')
        .then((response) => response.json())
        .then((resopnseJson) => {
            this.setState ({
              car : resopnseJson,
              diachi: resopnseJson.diachi,
              tenLoai :resopnseJson.tenLoai,
              namsx : resopnseJson.doi
            })
        })
        .catch((error) => {
            console.error(error);
        });
  }


  render() {
    return (
      <Content>
        <Card style={styles.Cards}>
            <CardItem Header style={styles.Header} >
              <Text style={styles.TextHeader}>Thông tin xe</Text>
                </CardItem>
                  <Body>
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
    flex:1
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