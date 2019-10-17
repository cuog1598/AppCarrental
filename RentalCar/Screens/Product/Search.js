import React, { Component } from 'react';
import {StatusBar,BackHandler, ImageBackground, ToastAndroid, View,StyleSheet,Dimensions,TouchableOpacity,Image,SafeAreaView,Text,ScrollView,ActivityIndicator} from 'react-native'
import { Container, Header, Left, Body, Right, Button , Title, Content,Form,Picker,Card,Footer, FooterTab } from 'native-base';
import { SearchBar } from 'react-native-elements';
import backgroud from '../images/backgroud/backgroud.jpg'
import Icon from 'react-native-vector-icons/Ionicons';  

const a= '../images/backgroud/white.jpg'


const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};
export default class HeaderMultipleIconExample extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      Home: false,
      img:'../images/backgroud/backgroud.jpg',
      check:true,
      visible: false,
      isLoadding:true,
      selected: "0",
      selected2: "0",
      title: '',
      Id: null,
      content: '',
      obj: [],
      obj2: [],
      matinh: 1,
      Ischange:false,
      LoaiTimKiem:'',
      chonhuyen: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this._fetchTinh()
    
    if(this.props.navigation.state.params.Id ===1)
    {
      this.setState({
        title : "Tìm kiếm xe Ô tô",
        LoaiTimKiem:1,
      })
    }
    else
    {
      this.setState({
        title : "Tìm Kiếm Xe Máy",
        LoaiTimKiem: 2,
      })
    }
  }


  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  handleButtonPress = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.hideToast();
      },
    );
  };
  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

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
    chonhuyen: true,
    Ischange: true,
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
        selected2: value,
        Ischange: true,
        chonhuyen: false,
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
        <View style={{justifyContent:"center", flex:1}}>
          <ActivityIndicator size="large" color="##00ff00" paddingTop= {80}/>

          </View>
      )
    }
    return (
      <SafeAreaView style= {{height:height}}>
       <Toast visible={this.state.visible} message="Bạn chưa nhập đủ thông tin" />

      <View style={{flex:1}}>
          <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.Thumbnail}>
            <ImageBackground style={styles.Thumbnail} source={require(a)}>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
                <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                  <Icon style={{paddingLeft:20, paddingTop:10}} name='ios-arrow-back' size={30} />
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
                  iosIcon={<Icon name="ios-arrow-down" />}
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
                  iosIcon={<Icon name="ios-arrow-down" />}
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
          </View>
          </View>
          <Footer style={{height:80}}>
          <FooterTab>
          <Button style={{height:80}} block success onPress={this._SEARCH}>
                <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>XÁC NHẬN</Text>
          </Button>
          </FooterTab>
        </Footer>
          

      </SafeAreaView>
      
    );
  }
  _SEARCH = () =>{
    const{selected, selected2, LoaiTimKiem, Ischange, chonhuyen}= this.state;
    if(!Ischange || selected ===0 )
    {
      this.setState(
        {
          visible: true,
        },
        () => {
          this.hideToast();
        },
      );
    }
    else
    {
      
      this.props.navigation.navigate("ListProduct", {key : selected2, LoaiTimKiem: LoaiTimKiem});
    }
  }
}
const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'transparent',
    height:100,
      },
    Thumbnail:{
        height:100,
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
