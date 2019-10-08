import React,{Component} from 'react';

import { ListView,StatusBar, StyleSheet,Text,Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView, ImageBackground,TouchableOpacity, ActivityIndicator} from 'react-native';

import { WebView } from 'react-native-webview';

import { Container, Header, Content, Card, CardItem, Body, Icon, Left ,Button,Footer, FooterTab} from "native-base";

import Carousel from 'react-native-snap-carousel';

import { FlatList } from 'react-native-gesture-handler';

import Moment from 'moment';

import Event from '../Envent'

const { width: screenWidth } = Dimensions.get('window')

export default class Details extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            carouselItems: [],
            isloadding:true,
            obj:[],
            phone:'',
            email:'',
            ngaynhap:'',
            t: '',
        }
    }
    componentDidMount() {
      const {navigation} = this.props;
      this._fetchData();
      this._fetchNguoiDang();
      this._Bindding();
    }



    _fetchNguoiDang = () => {
      fetch('http://10.0.2.2:45455/api/Users/'+this.props.navigation.state.params.manguoidang)
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
    fetch('http://10.0.2.2:45455/api/getcar/'+this.props.navigation.state.params.idcar)
      .then((response) => response.json())
      .then((resopnseJson) => {
          this.setState ({
            ngayNhap: resopnseJson.ngayNhap
          })
          
      })
      .catch((error) => {
          console.error(error);
      });

}



    _fetchData = () => {
      fetch('http://10.0.2.2:45455/api/DetailsCar/'+this.props.navigation.state.params.idcar)
        .then((response) => response.json())
        .then((resopnseJson) => {
            this.setState ({
              carouselItems: resopnseJson,
             
              isloadding:false,

            })

            if(this.state.carouselItems.length ==0)
              {
                alert('cant load data')
              }
            
        })
        .catch((error) => {
            console.error(error);
        });
  
  }

  _goback () {
    const {navigation} = this.props;
    navigation.goBack();
  }
  _Save=() =>  {
    alert('You tapped the button!')
  }

//header images
    _renderItem({item}){

      return (
        
        <View style={styles.container}>

        <View style={styles.Thumbnail}>
          
            <ImageBackground
                source={{uri: 'http://10.0.2.2:45457'+item.hinh}}
                containerStyle={styles.imageContainer}
                style={styles.i}
                parallaxFactor={0.4}
            >
              <ScrollView horizontal={true}>
                <Icon style={{paddingLeft:20, paddingTop:20}} name='arrow-back'  onPress={() => {
                        this._goback()
                    }} />
              
              </ScrollView>
               
            </ImageBackground>
        </View>
        </View>
    );
  }
//main list
  _render= ({item}) => {
    let newDate = Moment().format(''+this.state.ngaynhap+'DD-MM-YYYY');

      return (
        <View>
          <Card transparent >
          <CardItem transparent style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
              <Body>
              <Button transparent>
                <Icon active name="thumbs-up" style={{color:'#228b22'}} />
                <Text style={styles.titile}>
                   {' '}Đã kiểm chứng
                </Text>
                <TouchableOpacity>
                  <Icon style={{height:30,width:30,paddingRight:8,color:'black'}} name='heart' size={50} onPress={this._Save} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("SeeMore",{key:this.props.navigation.state.params.idcar});
                    }}>
                <Image source={require('../images/backgroud/icon.jpg')} style={{height:25, width:25}}></Image>

                </TouchableOpacity>
                </Button>
                <Button transparent>
                <Text style={styles.TenXe}>
                  {item.tenxe}
                </Text>
                <Text style={styles.NameHeader}>
                  {item.gia} VNĐ
                </Text>
                  </Button>
                
                <Button transparent disabled={true} style={{paddingTop:-5}}>
                <Text style={styles.Text} >
                  Địa chỉ 
                </Text>
                <Text style={styles.Text}>
                 {item.diachi}
                </Text>
                </Button>

                <Button transparent disabled={true}>
                <Text style={styles.Text}>
                Tiền cọc    
                </Text>
                <Text style={styles.Text}>
                 2.500.000 VNĐ
                </Text>
                </Button>

                <Button transparent disabled={true}>
                <Text>
                  Người đăng 
                </Text>
                <Text style={styles.Text}>
                {item.tenNguoiDang}
                </Text>
                </Button>

                <Button transparent disabled={true}>
                <Text>
                  Điện thoại/ Email
                </Text>
                <Text style={styles.Text}>
                  {this.state.phone}
                </Text>
                </Button>
                
              </Body>
            </CardItem>
          </Card>

           <Card transparent>
           <CardItem transparent style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
              <Text style={styles.Text}>Ngày Đăng</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={styles.Text}>{newDate}</Text>
              </Body>
            </CardItem>
           
         </Card>

         <Card transparent> 
         <CardItem transparent style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
              <Text style={styles.Text}>Địa chỉ</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={styles.Text}>{item.diachi}</Text>
              </Body>
            </CardItem>
           
         </Card>
      

        <Card transparent style={{ borderRadius: 12 }}>
        <CardItem transparent style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
              <Text style={styles.Text}>Chi tiêt</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={styles.Text}>{item.mota}</Text>
              
              </Body>
            </CardItem>
           
         </Card>
          <Card transparent style={{ borderRadius: 12 }}>
          <CardItem transparent style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <Text style={styles.Text}>Cùng tiêu chi</Text>
              </CardItem>
              <CardItem>
                <Event/>
              </CardItem>
            
          </Card>

        </View>
        

         
      )
  }

    render() {
      const {navigation}=this.props; 

      
      if(this.state.isloadding)
      {
        <ActivityIndicator style={{marginTop:80}}/>
      }
      return (
        
        <Container style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
          <ScrollView showsVerticalScrollIndicator= {false}>
        <View>
          <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth}
                data={this.state.carouselItems}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
          </View>
          <FlatList 
                data={this.state.carouselItems}
                renderItem={this._render}
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
          >
          </FlatList>
         </ScrollView>
         
          <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <ScrollView horizontal= {true}>

            <Button bordered danger icon   style={styles.Button}
              onPress={this._onPressButton}
            >
            <Icon name='chatboxes' />
            <Text>Chat</Text>
          </Button>
              <Button bordered primary style={styles.Button} icon onPress={()=> {
                this.props.navigation.navigate('Oders')
              }}>
              <Icon name='paper' />
                <Text style= {{ fontSize:16, fontFamily:'tahoma'}}> Đặt hẹn ngay </Text>
                </Button>

            </ScrollView>
          </FooterTab>
        </Footer>
        </Container>

      );
  }
}
const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  item: {
    width: screenWidth ,
    height: 150 ,
  },
  container: {
    backgroundColor:'#f5f5f5',
  },
      container2: {
      paddingTop:40,
    backgroundColor: '#F5FCFF',
    position: 'relative'
      },
  imageContainer: {
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  i:{
    resizeMode:'stretch',
    width: screenWidth ,
    height: 230 ,
    flex:1,
  },
  NameHeader: {
    fontFamily:'tahoma',
    fontSize:30,
    fontWeight:'bold',
    color:'#daa520'
  },
  titile: {
    color:'#228b22',
    fontSize:16,
    fontFamily: 'tahoma',
    paddingRight:180
  },
  TenXe : {
    fontSize:18,
    fontWeight:'200'
  }
  ,
  Text : {
    fontSize:16,
    fontFamily:'tahoma',
    paddingTop:4
  },
  footer: {
    height:80,
    backgroundColor:'white',
    borderTopColor:'gray',
    borderTopWidth:0.4,
  },
  Button:{
    borderRadius:6,
    width:120,
    marginLeft:55,
  },
  containers: {
    backgroundColor: 'transparent',
    height:230,
      },
    Thumbnail:{
        height:230,
        left: 0,
        right: 0,
        width: width,
        
    },
})