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
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Modal from "react-native-modal";
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import {WebView} from 'react-native-webview';

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
  FooterTab,
  Right,
  Item,
  Input,
} from 'native-base';

import {FlatList} from 'react-native-gesture-handler';

import Moment from 'moment';

import Event from '../Envent';

const {width: screenWidth} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Ionicons';

export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      isloadding: true,
      obj: [],
      car : [],
      phone: '',
      email: '',
      ngaynhap: '',
      t: '',
      image: [],
      imageleght: '',
      isModalVisible: false
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Car Details',
    headerTitleStyle: {
      paddingTop: 20,
      fontSize: 22,
      textAlign: 'center',
      flexGrow: 0.76,
      alignSelf: 'center',
      color: 'black',
    },
    headerStyle: {
      backgroundColor: 'white',
      height: 90,
      borderBottomWidth: 0,
      borderBottomColor: 'white',
    },
    headerLeft: (
      <Icon
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          fontWeight: 'bold',
          color: 'black',
        }}
        name="ios-arrow-back"
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });
  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({
          isloadding:true,
        })
        this._fetchData();
        this._fetchNguoiDang();
        this._Bindding();
        this._LoadHinh();
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.willFocusSubscription.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  //this.props.navigation.state.params.manguoidang
  _fetchNguoiDang = () => {
    fetch('http://10.0.2.2:45455/api/Users/' + this.props.navigation.state.params.manguoidang)
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
    fetch('http://10.0.2.2:45455/api/getcar/' + this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          car : resopnseJson,
          ngayNhap: resopnseJson.ngayNhap,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _fetchData = () => {
    fetch('http://10.0.2.2:45455/api/DetailsCar/' + this.props.navigation.state.params.idcar)
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

  _LoadHinh = () => {
    fetch(HostName + 'api/Images/' + this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          image: resopnseJson,
          isloadding: false,
        });

        if (this.state.image.length == 0) {
          alert('cant load image');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _AddImage = () => {
    const imageleght= this.state;
    if (this.state.image.length  >= 3) {
      alert('Số lượng hình tối đa là 4'+this.state.image.length);
    } else {
    }
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  //header images
  _renderitem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('SellerEditImages', {
            ImageId: item.id, idcar :this.props.navigation.state.params.idcar
          });
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginLeft: 7,
          }}>
          <Image
            style={styles.imageThumbnail}
            source={{uri: WebHost + item.src}}
          />
        </View>
      </TouchableHighlight>
    );
  };

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
                <TouchableOpacity >
                  <Icon
                    style={{
                      paddingRight: 8,
                      color: 'green',
                    }}
                    name="ios-eye"
                    size={50}
                    onPress={()=>{
                      this.props.navigation.navigate("SellerEditInfo", {idcar : this.props.navigation.state.params.idcar})
                    }}
                  />
                </TouchableOpacity>
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
      </View>
    );
  };

  render() {
    const {navigation} = this.props;

    if (this.state.isloadding) {
      return(
        <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
      </View>
      );
    }
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card transparent>
            <CardItem>
              <FlatList
                data={this.state.image}
                renderItem={this._renderitem}
                keyExtractor={() =>
                  Math.random()
                    .toString(36)
                    .substr(2, 9)
                }
                numColumns={2}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Icon name={'ios-add-circle-outline'} size = {30} style = {{color:'green', marginLeft:10}} onPress={this._AddImage}>  </Icon>
              </Left>
              <Right>
                <Text style={styles.TextHeader}>Bấm vào hình để chỉnh sửa</Text>
              </Right>
            </CardItem>
          </Card>
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
                onPress={this._onPressButton}>
                {!this.state.car.moban && (
                <Icon name="ios-lock" size= {25} style={{color:'red'}} />

              )}
              {this.state.car.moban && (
                <Icon name="ios-unlock" size= {25} style={{color:'yellow'}} />
              )}
                {this.state.car.moban && (
                <Text>Khoá xe</Text>

              )}
              {!this.state.car.moban && (
                <Text>Mở xe</Text>
              )}
              </Button>
              <Button
                bordered
                primary
                style={styles.Button}
                icon
                onPress={() => {
                  this.props.navigation.navigate("SellerEditInfo", {idcar : this.props.navigation.state.params.idcar});
                }}>
                <Icon name="ios-settings" size={25} />
                <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                  {' '}
                  Chỉnh sửa{' '}
                </Text>
              </Button>
            </ScrollView>
          </FooterTab>
        </Footer>
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
    flexDirection: 'column',
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
    width: screenWidth / 2 - 20,
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
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 2 - 40,
    width: width / 2 - 30,
    borderRadius: 5,
    marginTop: 5,
  },
  TextHeader: {
    fontSize: 16,
    color: 'green',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    padding: 20,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: 'red'
  },
});
