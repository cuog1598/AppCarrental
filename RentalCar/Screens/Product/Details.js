import React, {Component} from 'react';

import {
  ListView,
  StatusBar,
  BackHandler,
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Modal from "react-native-modal";
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import Icon from 'react-native-vector-icons/Ionicons';  
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Button,
  Footer,
  FooterTab,Fab
} from 'native-base';

import Carousel from 'react-native-snap-carousel';

import Moment from 'moment';

import Event from '../Envent';

const {width: screenWidth} = Dimensions.get('window');

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      isloadding: true,
      obj: [],
      phone: '',
      email: '',
      ngaynhap: '',
      t: '',
      image : [],
      active: false
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );

    this._fetchData();
    this._fetchNguoiDang();
    this._LoadHinh();
    this._Bindding();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
 
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };
  _LoadHinh = () => {
    const i = 0;
    fetch(HostName + 'api/Images/' + this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          image: resopnseJson,
        });

        if (this.state.image.length == 0) {
          alert('cant load image');
        } else {
          this.setState({
            sohinh: this.state.image.length,
          });
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  _fetchNguoiDang = () => {
    fetch(
      HostName+'api/Users/' +
        this.props.navigation.state.params.manguoidang,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          phone: resopnseJson.phone,
          email: resopnseJson.tenNguoiDang,
        });

        if (this.state.obj.length == 0) {
          alert('cant load users from server');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _Bindding = () => {
    fetch(
      HostName+'api/getcar/' +
        this.props.navigation.state.params.idcar,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          ngayNhap: resopnseJson.ngayNhap,
          isloadding:false
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _fetchData = () => {
    fetch(
     HostName+'api/DetailsCar/' +
        this.props.navigation.state.params.idcar,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          carouselItems: resopnseJson,
        });

        if (this.state.carouselItems.length == 0) {
          alert('cant load data');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _goback() {
    const {navigation} = this.props;
    navigation.goBack();
  }
  _Save = () => {
    alert('You tapped the button!');
  };

  //header images
  _renderItem({item}) {
   const image = 4
    return (
      <View style={styles.container}>
        <View style={styles.Thumbnail}>
          <TouchableOpacity onPress={() => {alert('ok')}}>
          <ImageBackground
            source={{uri: WebHost + item.src}}
            containerStyle={styles.imageContainer}
            style={styles.i}
            parallaxFactor={0.4}
            >
             <View style={{ paddingTop:200, right:0, paddingLeft:8}}>
             <Text style={{color:'white', fontSize:20, fontWeight:'400'}}>{item.id}/{image}</Text>
             </View>
          </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  //main list
  _render = ({item}) => {
    let newDate = Moment().format('' + this.state.ngaynhap + 'DD-MM-YYYY');

    return (
      <View>
        <Card transparent>
          <CardItem
            transparent
            style={{borderBottomLeftRadius: 12, borderBottomRightRadius: 12}}>
            <Body>
              <Button transparent>
                <Icon active name="ios-link" style={{color: '#228b22'}} />
                <Text style={styles.titile}> Đã kiểm chứng</Text>
                <TouchableOpacity>
                  <Icon
                    style={{
                      height: 30,
                      width: 30,
                      paddingRight: 8,
                      color: 'black',
                    }}
                    name="ios-heart"
                    size={25}
                    onPress={this._Save}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('SeeMore', {
                      key: this.props.navigation.state.params.idcar,
                    });
                  }}>
                  <Image
                    source={require('../images/backgroud/icon.jpg')}
                    style={{height: 25, width: 25}}></Image>
                </TouchableOpacity>
              </Button>
              <Button transparent>
                <Text style={styles.TenXe}>{item.tenxe}</Text>
                <Text style={styles.NameHeader}>{item.gia} VNĐ</Text>
              </Button>

              <Button transparent disabled={true} style={{paddingTop: -5}}>
                <Text style={styles.Text}>Địa chỉ</Text>
                <Text style={styles.Text}>{item.diachi}</Text>
              </Button>

              <Button transparent disabled={true}>
                <Text style={styles.Text}>Tiền cọc</Text>
                <Text style={styles.Text}>2.500.000 VNĐ</Text>
              </Button>

              <Button transparent disabled={true}>
                <Text>Người đăng</Text>
                <Text style={styles.Text}>{item.tenNguoiDang}</Text>
              </Button>

              <Button transparent disabled={true}>
                <Text>Điện thoại/ Email</Text>
                <Text style={styles.Text}>{this.state.phone}</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>

        <Card transparent>
          <CardItem
            transparent
            style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
            <Text style={styles.Text}>Ngày Đăng</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.Text}>{newDate}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card transparent>
          <CardItem
            transparent
            style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
            <Text style={styles.Text}>Địa chỉ</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.Text}>{item.diachi}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card transparent style={{borderRadius: 12}}>
          <CardItem
            transparent
            style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
            <Text style={styles.Text}>Chi tiêt</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.Text}>{item.mota}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card transparent style={{borderRadius: 12}}>
          <CardItem
            transparent
            style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
            <Text style={styles.Text}>Cùng tiêu chi</Text>
          </CardItem>
          <CardItem>
            <Event />
          </CardItem>
        </Card>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;

    if (this.state.isloadding) {
      <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>;
    }
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth}
              data={this.state.image}
              renderItem={this._renderItem}
              hasParallaxImages={true}
              style={{flex: 1}}
              layout={'stack'}
            />
          </View>
          <FlatList
            data={this.state.carouselItems}
            renderItem={this._render}
            keyExtractor={() =>
              Math.random()
                .toString(36)
                .substr(2, 9)
            }></FlatList>
        </ScrollView>

        <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <ScrollView horizontal={true}>
              <Button
                bordered
                danger
                icon
                style={styles.Button}
                onPress= { () => {
                  this.props.navigation.navigate('ChatScreens',{
                    phone: this.props.navigation.state.params.manguoidang,
                    name: this.state.obj.hoTen,
                    idsp: this.props.navigation.state.params.idcar,
                    guisp : true,
                    img :this.state.carouselItems.hinh
                  })
                }}
               >
                <Icon name="ios-chatboxes" size={25}/>
                <Text>Chat</Text>
              </Button>
              <Button
                bordered
                primary
                style={styles.Button}
                icon
                onPress={() => {
                  this.props.navigation.navigate('Oders', {
                    maxe: this.props.navigation.state.params.idcar,
                  });
                }}>
                <Icon name="ios-clock" size={25} />
                <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                  {' '}
                  Đặt hẹn ngay{' '}
                </Text>
              </Button>
            </ScrollView>
          </FooterTab>
        </Footer>
        <Fab
            active={this.state.active}
            containerStyle={{ }}
            style={{ backgroundColor: 'gray', marginLeft:0 }}
            position="topLeft"
            onPress={() => {this.props.navigation.goBack()}}>
            <Icon name="ios-arrow-back" />
          </Fab>
      </Container>
    );
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: 150,
  },
  container: {
    backgroundColor: '#f5f5f5',
  },
  container2: {
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  imageContainer: {
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  i: {
    resizeMode: 'stretch',
    width: screenWidth,
    height: 230,
    flex: 1,
  },
  NameHeader: {
    fontFamily: 'tahoma',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#daa520',
  },
  titile: {
    color: '#228b22',
    fontSize: 16,
    fontFamily: 'tahoma',
    paddingRight: 180,
  },
  TenXe: {
    fontSize: 18,
    fontWeight: '200',
  },
  Text: {
    fontSize: 16,
    fontFamily: 'tahoma',
    paddingTop: 4,
  },
  footer: {
    height: 80,
    backgroundColor: 'white',
    borderTopColor: 'gray',
    borderTopWidth: 0.4,
  },
  Button: {
    borderRadius: 6,
    width: 120,
    marginLeft: 55,
  },
  containers: {
    backgroundColor: 'transparent',
    height: 230,
  },
  Thumbnail: {
    height: 230,
    left: 0,
    right: 0,
    width: width,
  },
});
