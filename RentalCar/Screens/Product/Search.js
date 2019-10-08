import React, { Component } from 'react';
import {StatusBar, ImageBackground, View,StyleSheet,Dimensions,TouchableOpacity,Image,SafeAreaView,Text,ScrollView,ActivityIndicator} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content,Form,Picker,Card } from 'native-base';
import { SearchBar } from 'react-native-elements';
import backgroud from '../images/backgroud/backgroud.jpg'

const a= '../images/backgroud/white.jpg'

export default class HeaderMultipleIconExample extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      img:'../images/backgroud/backgroud.jpg',
      check:true,
      isLoadding:true,
      selected: "0",
      selected2: "0",
      title: '',
      Id: null,
      content: '',
      obj: [],
      obj2: [],
      matinh: 1
    };
  }

  componentDidMount() {
    this._fetchTinh()
    
    if(this.props.navigation.state.params.Id ===1)
    {
      this.setState({
        title : "Tìm kiếm xe Ô tô"
      })
    }
    else
    {
      this.setState({
        title : "Tìm Kiếm Xe Máy"
      })
    }
  }

  componentWillMount()
  {

  }
//lấy danh sách tỉnh
  _fetchTinh = () => {
    fetch('http://10.0.2.2:45455/api/tinhs')
      .then((response) => response.json())
      .then((resopnseJson) => {
        this.setState ({
          obj: resopnseJson,
        })
        
      })
      .catch((error) => {
          console.error(error);
      });

      this._fetchHuyen();
}
//load ds huyện đầu tiên
  _fetchHuyen = () => {
  fetch('http://10.0.2.2:45455/api/Huyens/0')
    .then((response) => response.json())
    .then((resopnseJson) => {
      this.setState ({
        obj2: resopnseJson,
        check:false,
        isLoadding:false,
      })
      
    })
    .catch((error) => {
        console.error(error);
    });
}

onValueChange(value) {

  this.setState({
    check:false,
    selected: value,
  });
  //lấy danh sách huyện bởi tỉnh
fetch('http://10.0.2.2:45455/api/Huyens/'+value)
    .then((response) => response.json())
    .then((resopnseJson) => {
      this.setState ({
        obj2: resopnseJson,
        check:false,
      })
      
    })
    .catch((error) => {
        console.error(error);
    });
}
//gọi đến hàm khi thay đổi selected
    onValueChange2(value) {
     this.setState({
        selected2: value
     });
    }

    _onPressButton() {
      alert('Bạn chưa chọn đủ thông tin')
    }
   
  render() {
    const {navigation}=this.props; 
    const {navigate} = this.props.navigation;
    if(this.state.isLoadding)
    {
      return(
        <ActivityIndicator style={{marginTop:80}}/>
      )
    }
    return (
      
      <SafeAreaView>

      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
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
          
      </View>
      <Card style={{marginTop:20, marginLeft:8, marginRight:5,borderRadius: 12}}>

      <View >

        <Text>{this.state.content}</Text>
        <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: width }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              {
                 this.state.obj.map((item) =>{
                   return(
                   <Picker.Item  label={item.tenTinh} value={item.ma} key={item.ma}/>
                   );
                 })
               }
            </Picker>
          </Form>

      </View>
      <View style={{paddingTop:20}}>
        <Form>
      <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              {
                 this.state.obj2.map((item) =>{
                   return(
                   <Picker.Item  label={item.tenHuyen} value={item.id} key={item.id}/>
                   );
                 })
               }
            </Picker>
          </Form>
      </View>
      </Card>

      <View style={{width:width-50, justifyContent:'center',paddingLeft:50, paddingTop:20 }}>
        <Image style={{justifyContent:'center', resizeMode:'cover', borderRadius:300/2, height:300, width:width-100,paddingLeft:50}} source={require('../images/backgroud/a.jpg')}/>
      </View>
               
      <View >
    
      <Button style={{marginTop:120, height:50}} block success onPress={() => {
                        navigation.navigate("ListProduct", {key : this.state.selected2});
                    }}>
            <Text style={{color:'white'}}>Xác Nhận</Text>
      </Button>
      </View>

      </SafeAreaView>
      
    );
  }
}
const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'transparent',
    height:80,
      },
    Thumbnail:{
        height:80,
        left: 0,
        right: 0,
        width: width,
        
    },
    infoContainer: {
      width: '100%', 
      height: 50, 
      backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
     
    }}
)
