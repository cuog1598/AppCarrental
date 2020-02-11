import React, {Component} from 'react';

import {
  ListView,
  StatusBar,
  BackHandler,
  StyleSheet,
  Text,
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
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import RNFetchBlob from 'rn-fetch-blob';
import { Image } from 'react-native-elements';
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
  Label,
} from 'native-base';

import ImagePicker from 'react-native-image-picker';

import {FlatList} from 'react-native-gesture-handler';

import Moment from 'moment';

import Event from '../Envent';

const {width: screenWidth} = Dimensions.get('window');
const options = {
  title: 'Tải hình ảnh',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

import Icon from 'react-native-vector-icons/Ionicons';

export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      isloadding: true,
      obj: [],
      car: [],
      phone: '',
      email: '',
      ngaynhap: '',
      t: '',
      image: [],
      imageleght: '',
      isModalVisible: false,
      avatarSource: '',
      data: '',
      imgchosen: '',
      isModalEditImage: false,
      idimage: '',
      sohinh: '',
      saveLoad : false,
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
          isloadding: true,
        });
        this._fetchData();
        this._fetchNguoiDang();
        this._Bindding();
        this._LoadHinh();
      },
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

  _Show() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        alert('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          data: response.data,
        });
      }
    });
  }
  //this.props.navigation.state.params.manguoidang

  _fetchNguoiDang = () => {
    fetch(
      HostName + 'api/Users/' + this.props.navigation.state.params.manguoidang,
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
        alert(error);
      });
  };

  _Bindding = () => {
    fetch(HostName + 'api/getcar/' + this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          car: resopnseJson,
          ngayNhap: resopnseJson.ngayNhap,
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  _fetchData = () => {
    fetch(
      HostName + 'api/DetailsCar/' + this.props.navigation.state.params.idcar,
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
        alert(error);
      });
  };

  _LoadHinh = () => {
    const i = 0;
    fetch(HostName + 'api/Images/' + this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          image: resopnseJson,
          isloadding: false,
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

  toggleModal = () => {
    if (this.state.sohinh >= 4) {
      alert('Số lượng hình tối đa');
    } else {
      this.setState({isModalVisible: !this.state.isModalVisible});
    }
  };

  //when click on image
  _onpressIma = (value, id) => {
    this.setState({
      imgchosen: value,
      idimage: id,
      isModalEditImage: !this.state.isModalEditImage,
    });
  };
  //this._onpressIma(WebHost + item.src, item.id)
  //header images
  _renderitem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          this._onpressIma(WebHost + item.src, item.id);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginLeft: 7,
          }}>
        <Image
          source={{ uri: WebHost + item.src }}
          style={styles.imageThumbnail}
          PlaceholderContent={<ActivityIndicator size="large" />
          }
          placeholderStyle={{backgroundColor:'white'}}
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
      return (
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
                <Icon
                  name={'ios-add-circle-outline'}
                  size={30}
                  style={{color: 'green', marginLeft: 10}}
                  onPress={this.toggleModal}>
                  {' '}
                </Icon>
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
                onPress={this.CancelCar}>

                {this.state.car.moban && (
                  <Icon name="ios-lock" size={25} style={{color: 'red'}} />
                )}
                {!this.state.car.moban && (
                  <Icon name="ios-unlock" size={25} style={{color: 'yellow'}} />
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
                  this.props.navigation.navigate('SellerEditInfo', {
                    idcar: this.props.navigation.state.params.idcar,
                  });
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
        <Modal
          isVisible={this.state.isModalEditImage}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.3,
                borderWidth: 0.4,
                borderColor: 'gray',
                borderRadius: 8,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderBottomColor: 'gray',
                  height: 70,
                }}>
                <Text style={{fontSize: 22, fontWeight: '900'}}>
                  Edit image
                </Text>
              </View>
              <View style={{margin: 10}}>
                {this.state.avatarSource == '' && (
                  <Image
                    source={{uri: this.state.imgchosen}}
                    style={{height: 300, width: null}}
                    PlaceholderContent= {<ActivityIndicator size="large" /> }
                  />
                )}
               
                {this.state.avatarSource != '' && (
                  <Image
                    source={this.state.avatarSource}
                    style={{height: 300, width: null}}
                  />
                )}
              </View>

              <View
                style={{
                  paddingTop: 10,
                  borderTopColor: 'gray',
                  borderTopWidth: 0.4,
                }}>
                {this.state.avatarSource != '' && this.state.saveLoad== false && (
                    <TouchableOpacity onPress={this._UploadImage2}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 22,
                          textAlign: 'center',
                          color: '#ffa500',
                        }}>
                        Lưu
                      </Text>
                    </TouchableOpacity>
                ) }
                {this.state.avatarSource != '' , this.state.saveLoad && (
                    <ActivityIndicator size = 'large' />
                ) }

                {this.state.avatarSource == '' && (
                  <TouchableOpacity onPress={this.Delete}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 22,
                        textAlign: 'center',
                        color: '#ffa500',
                      }}>
                      Xoá
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={this._Show.bind(this)}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 22,
                      textAlign: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    Chọn ảnh
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.Cancel}>
                  <Text style={styles.TextModel}>Huỷ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isModalVisible}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 14) ,
                borderWidth: 0.4,
                borderColor: 'gray',
                borderRadius: 8,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderBottomColor: 'gray',
                  height: 70,
                }}>
                <Text style={{fontSize: 22, fontWeight: '900'}}>
                  Thêm hình ảnh
                </Text>
              </View>
              <View style={{margin: 10}}>
                {this.state.avatarSource == '' && (
                  <Image
                    source={require('../images/backgroud/addimg.png')}
                    style={{height: 300, width: null}}
                  />
                )}
                {this.state.avatarSource != '' && (
                  <Image
                    source={this.state.avatarSource}
                    style={{height: 300, width: null}}
                  />
                )}
              </View>

              <View
                style={{
                  paddingTop: 10,
                  borderTopColor: 'gray',
                  borderTopWidth: 0.4,
                }}>
                <TouchableOpacity
                  onPress={this._UploadImage}
                  >
                  {this.state.avatarSource != '', this.state.saveLoad === false && (
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 22,
                        textAlign: 'center',
                        color: '#ffa500',
                      }}>
                      Lưu
                    </Text>
                  )}
                  {this.state.avatarSource != '', this.state.saveLoad && (
                    <ActivityIndicator size = 'large'/>
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={this._Show.bind(this)}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 22,
                      textAlign: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    Chọn ảnh
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.Cancel}>
                  <Text style={styles.TextModel}>Huỷ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }

  CancelCar = () => {
  
      fetch(HostName + 'api/GetXe/' + this.props.navigation.state.params.idcar, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.title == 'Not Found') {
            alert('Không tìm thấy xe');
          } else {
            this.setState({
              isloadding:true,
            })
            this._Bindding();
            if(this.state.car.length == 0 )
            {
              alert("Không load được data")
              
            }            
            else
            {
              this.setState({
                isloadding:false,
              })
            }
          }
        })
        .catch(error => {
          alert(error);
        });
  };
  Delete = () => {
    if (this.state.idimage == 0 || this.state.idimage == '0') {
      alert('Không thể xoá hình này');
    } else {
      fetch(WebHost + 'api/ImagesCar/' + this.state.idimage, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.title == 'Not Found') {
            alert('không tìm thấy hình ảnh');
          } else {
            this.setState({
              isloadding:true,
              isModalEditImage: !this.state.isModalEditImage,
            });
            this._LoadHinh();
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  _UploadImage = async () => {
    this.setState({saveLoad : !this.state.saveLoad})
    RNFetchBlob.fetch(
      'POST',
      WebHost + 'api/ImageManager/' + this.props.navigation.state.params.idcar,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: this.props.navigation.state.params.idcar + '.png ',
          type: 'image/png',
          data: this.state.data,
        },
        // part file from storage
      ],
    )
      .then(resp => {
        this.setState({
          isloadding: true,
          avatarSource: '',
          saveLoad : !this.state.saveLoad,
          isModalVisible: !this.state.isModalVisible,
        });
        this._LoadHinh();
      })
      .catch(err => {
        this.setState({saveLoad : !this.state.saveLoad})
        alert('error' + err);
      });
  };

  _UploadImage2 = async () => {
    this.setState({saveLoad : true})
    RNFetchBlob.fetch(
      'PUT',
      WebHost + 'api/ImageManager/' + this.state.idimage,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: this.props.navigation.state.params.idcar + '.png ',
          type: 'image/png',
          data: this.state.data,
        },
        // part file from storage
      ],
    )
      .then(response => {
          this.setState({
            isloadding: true,
            avatarSource: '',
            saveLoad : !this.state.saveLoad,
            isModalEditImage: !this.state.isModalEditImage,
          });
          this._LoadHinh();
      })
      .catch(err =>  {
        this.setState({saveLoad : !this.state.saveLoad})
        alert('error' + err);
      });
  };

  Cancel = () => {
    if (this.state.isModalEditImage) {
      this.setState({
        isModalEditImage: !this.state.isModalEditImage,
        avatarSource: '',
        data: '',
      });
    } else {
      this.setState({
        isModalVisible: !this.state.isModalVisible,
        avatarSource: '',
        data: '',
      });
    }
  };
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
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    padding: 20,
    marginLeft: 12,
    marginRight: 12,
    // backgroundColor: 'red'
  },
  ButtonModel: {
    right: 0,
    borderRadius: 6,
    width: width * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextModel: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
