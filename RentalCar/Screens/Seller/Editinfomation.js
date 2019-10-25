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
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
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
  Picker,
  Form,
  Label,
} from 'native-base';

import {FlatList} from 'react-native-gesture-handler';

import Moment from 'moment';

import Event from '../Envent';

const {width: screenWidth} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Ionicons';
import {white} from 'ansi-colors';

export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      isloadding: true,
      obj: [],
      obj2: [],
      car: [],
      phone: '',
      email: '',
      ngaynhap: '',
      t: '',
      isModalVisible: false,
      isModalLoaiXe: false,
      isModalThongTin: false,
      selected: '0',
      selected2: '',
      selected3: '',
      tenxe: '',
      diachi: '',
      DshangXe: [],
      gia : '',
      bienso :'',
      sokm : '',
      tiencoc : '2500000'
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Chỉnh sửa thông tin xe',
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
        this._Bindding();
        this._fetchTinh();
        this._GetallHangXe();
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

  //lấy danh sách tỉnh
  _fetchTinh = () => {
    fetch('http://10.0.2.2:45455/api/tinhs')
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  _GetallHangXe = () => {
    fetch('http://10.0.2.2:45455/api/HangXes')
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          DshangXe: resopnseJson,
          isloadding:false,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  onValueChange(value) {
    this.setState({
      check: false,
      selected: value,
    });
    //lấy danh sách huyện bởi tỉnh
    fetch('http://10.0.2.2:45455/api/Huyens/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj2: resopnseJson,
          check: false,
        });
      })
      .catch(error => {
        alert(error);
      });
  }
  //gọi đến hàm khi thay đổi selected
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }
  onValueChange3(value) {
    this.setState({
      selected3: value,
    });
  }

  
  _Bindding = () => {
    fetch('http://10.0.2.2:45455/api/getcar/' +this.props.navigation.state.params.idcar)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          car: resopnseJson,
          tenxe: resopnseJson.tenxe,
          diachi: resopnseJson.diachi,
          gia: resopnseJson.gia,
          sokm : resopnseJson.soKM,
          bienso : resopnseJson.bienSo,
          ngayNhap: resopnseJson.ngayNhap,
        });
      })
      .catch(error => {
        alert(error);
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
        alert(error);
      });
  };

  //main list
  _render = ({item}) => {
    let newDate = Moment().format('' + this.state.ngaynhap + 'DD-MM-YYYY');

    return (
      <View>
        <Header />
      </View>
    );
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  TogleLoaiXe = () => {
    this.setState({isModalLoaiXe: !this.state.isModalLoaiXe});
  };
  TtogleThongTin = () => {
    this.setState({isModalThongTin: !this.state.isModalThongTin});
  };
  render() {
    const {navigation} = this.props;

    if (this.state.isloadding) {
      return(
        <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
      </View>
      )
    }
    else
    {

    return (
      <Container style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <KeyboardAvoidingView style={styles.container}>
            <Card transparent style={{marginTop: 10}}>
              <CardItem>
                <Body>
                  <Button transparent disabled={true} style={{paddingTop: -5}}>
                    <Text style={styles.Text}>Tỉnh</Text>
                    <Text style={styles.Text}>{this.state.car.tinh}</Text>
                  </Button>
                  <Button transparent disabled={true} style={{paddingTop: -5}}>
                    <Text style={styles.Text}>Huyện</Text>
                    <Text style={styles.Text}>{this.state.car.huyen}</Text>
                  </Button>
                  <Button transparent disabled={true} style={{paddingTop: -5}}>
                    <Text style={styles.Text}>Địa chỉ</Text>
                    <Text style={styles.Text}>{this.state.car.diachi}</Text>
                  </Button>
                  <TouchableOpacity
                    style={{right: 2}}
                    onPress={this.toggleModal}>
                    <Text style={styles.edit}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </Body>
              </CardItem>
            </Card>
            <Card transparent>
              <CardItem>
                <Body>
                  <Button transparent disabled={true} style={{paddingTop: -5}}>
                    <Text style={styles.Text}>Hãng xe</Text>
                    <Text style={styles.Text}>{this.state.car.tenHang}</Text>
                  </Button>
                  <Button transparent disabled={true} style={{paddingTop: -5}}>
                    <Text style={styles.Text}>Tên Xe</Text>
                    <Text style={styles.Text}>{this.state.car.tenxe}</Text>
                  </Button>
                  <TouchableOpacity
                    style={{right: 2}}
                    onPress={this.TogleLoaiXe}>
                    <Text style={styles.edit}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </Body>
              </CardItem>
            </Card>

            <Card transparent>
              <CardItem
                transparent
                style={{
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Body>
                  <Button transparent>
                    <Text style={styles.Text}>Giá thuê</Text>
                    <Text style={styles.NameHeader}>
                      {this.state.car.gia} VNĐ
                    </Text>
                  </Button>

                  <Button transparent disabled={true}>
                    <Text style={styles.Text}>Tiền cọc</Text>
                    <Text style={styles.Text}>2.500.000 VNĐ</Text>
                  </Button>
                  <Button transparent disabled={true}>
                    <Text style={styles.Text}>Biển số</Text>
                    <Text style={styles.Text}>{this.state.car.bienSo}</Text>
                  </Button>
                  <Button transparent disabled={true}>
                    <Text style={styles.Text}>Số km</Text>
                    <Text style={styles.Text}>{this.state.car.soKM}</Text>
                  </Button>
                  <TouchableOpacity
                    style={{right: 2}}
                    onPress={this.TtogleThongTin}>
                    <Text style={styles.edit}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </Body>
              </CardItem>
            </Card>
            <Card transparent>
              <CardItem
                transparent
                style={{
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Body>
                  <Text style={styles.Text}>Chi tiết</Text>
                  <Text style={styles.Text}>{this.state.car.mota}</Text>
                </Body>
              </CardItem>
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>

        <Modal
          isVisible={this.state.isModalVisible}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.8,
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
                <Text style={{fontSize: 22, fontWeight: '900'}}>Chọn Tỉnh</Text>
              </View>
              <View style={{margin: 10}}>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}>
                    {this.state.obj.map(item => {
                      return (
                        <Picker.Item
                          label={item.tenTinh}
                          value={item.ma}
                          key={item.ma}
                        />
                      );
                    })}
                  </Picker>
                </Form>
                <Form style={{paddingTop: 10}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}>
                    <Picker.Item label="Chọn huyện dưới đây" value="0" />
                    {this.state.obj2.map(item => {
                      return (
                        <Picker.Item
                          label={item.tenHuyen}
                          value={item.id}
                          key={item.id}
                        />
                      );
                    })}
                  </Picker>
                </Form>

                <View style={{marginTop: 10}}>
                  <Item floatingLabel>
                    <Label>Địa chỉ</Label>
                    <Input
                      value={this.state.diachi}
                      onChangeText={diachi => this.setState({diachi})}
                      keyboardType="email-address"
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
                </View>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.5}}>
                  <Button
                    warning
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this.Cancel}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      huỷ
                    </Text>
                  </Button>
                </View>
                <View style={{flex: 0.5, marginLeft: width * 0.244}}>
                  <Button
                    danger
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this._SaveTinh}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Lưu
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isModalLoaiXe}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.8,
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
                <Text style={{fontSize: 22, fontWeight: '900'}}>Tên Xe</Text>
              </View>
              <View style={{margin: 10}}>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected3}
                    onValueChange={this.onValueChange3.bind(this)}>
                    <Picker.Item label="Chọn hãng xe" value="0" />
                    {this.state.DshangXe.map(item => {
                      return (
                        <Picker.Item
                          label={item.tenHang}
                          value={item.id}
                          key={item.id}
                        />
                      );
                    })}
                  </Picker>
                </Form>

                <View style={{marginTop: 10}}>
                  <Item floatingLabel>
                    <Label>Tên xe</Label>
                    <Input
                      value={this.state.tenxe}
                      onChangeText={tenxe => this.setState({tenxe})}
                      keyboardType="email-address"
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
                </View>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.5}}>
                  <Button
                    warning
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this.Cancel2}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      huỷ
                    </Text>
                  </Button>
                </View>
                <View style={{flex: 0.5, marginLeft: width * 0.244}}>
                  <Button
                    danger
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this._SaveTinh}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Lưu
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      
        <Modal
          isVisible={this.state.isModalThongTin}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.6,
                borderWidth: 0.4,
                borderColor: 'gray',
                borderRadius: 8,
                paddingBottom: 20,
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
                <Text style={{fontSize: 22, fontWeight: '900'}}>Tên Xe</Text>
              </View>
                <View style={{marginTop: 10, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Giá</Label>
                    <Input
                    value={this.state.gia && String(this.state.gia)}
                    keyboardType= "numeric"
                      onChangeText={gia => this.setState({gia})}
                      returnKeyType="next"
                      autoCorrect={false}
                      maxLength={11}
                    />
                  </Item>
              </View>
              <View style={{marginTop: 10, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Số km</Label>
                    <Input
                    value={this.state.sokm && String(this.state.sokm)}
                    keyboardType= "numeric"
                      onChangeText={sokm => this.setState({sokm})}
                      returnKeyType="next"
                      maxLength={15}
                      autoCorrect={false}
                    />
                  </Item>
              </View>
             
              <View style={{marginTop: 14, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Tiền cọc</Label>
                    <Input
                      value={this.state.tiencoc }
                      onChangeText={tiencoc => this.setState({tiencoc})}
                      keyboardType= "numeric"
                      maxLength={11}
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
              </View>
              <View style={{marginTop: 14, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Biển sô</Label>
                    <Input
                      value={this.state.bienso}
                      onChangeText={bienso => this.setState({bienso})}
                      keyboardType= "email-address"
                      returnKeyType="next"
                      maxLength={11}
                      autoCorrect={false}
                    />
                  </Item>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.5}}>
                  <Button
                    warning
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this.Cancel2}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      huỷ
                    </Text>
                  </Button>
                </View>
                <View style={{flex: 0.5, marginLeft: width * 0.244}}>
                  <Button
                    danger
                    style={styles.ButtonModel}
                    title="Hide modal"
                    onPress={this._SaveTinh}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Lưu
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }

  }

  _SaveTinh = () => {
    // ma huyện
    const {selected, selected2} = this.props;
    if (selected == 0 || selected2 == 0 || selected == '' || selected2 == '') {
      alert('chưa nhập thông tin');
    } else {
      fetch('http://10.0.2.2:45455/api/Xes', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.props.navigation.state.params.idcar,
          maHuyen: this.state.selected2,
          tenxe: this.state.tenxe,
          maHangXe: this.state.selected3,
          bienSo : this.state.bienso,
          soKM : this.state.sokm,
          gia : this.state.gia,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.title == 'Not Found') {
            alert('Không lưu được');
          } else {

            if (this.state.isModalVisible === true) 
            {
              this.setState({
                isloadding:true,
                isModalVisible: !this.state.isModalVisible,
                selected: '',
                selected2: '',
              });
              this._fetchData();
              this._Bindding();
              this._fetchTinh();
              this._GetallHangXe();
            } else 
            if(this.state.isModalLoaiXe == true){
              this.setState({
                isloadding:true,
                isModalLoaiXe: !this.state.isModalLoaiXe,
                selected3: '',
                
              });
              this._fetchData();
              this._Bindding();
              this._fetchTinh();
              this._GetallHangXe();
            }
            else
            if(this.state.isModalThongTin)
            {
              this.setState ( {
                isModalThongTin : !this.state.isModalThongTin,
                isloadding:true
                
              })
              this._fetchData();
              this._Bindding();
              this._fetchTinh();
              this._GetallHangXe();
            }
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  Cancel = () => {
    this.setState({
      diachi: this.state.car.diachi,
      selected: '0',
      selected2: '0',
      isModalVisible: !this.state.isModalVisible,
    });
  };

  Cancel2 = () => {
    if(this.state.isModalLoaiXe == true)
    {
      this.setState({
        isModalLoaiXe: !this.state.isModalLoaiXe,

        tenxe: this.state.car.tenxe,
        selected3: '',
      });
    }
    else 
    {
      this.setState({
        isModalThongTin: false,
        gia: this.state.car.gia,
        sokm : this.state.car.soKM,
        bienso : this.state.car.bienSo,
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

  NameHeader: {
    fontFamily: 'tahoma',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#daa520',
  },
  TenXe: {
    fontSize: 18,
    fontWeight: '200',
    marginTop: 10,
    marginLeft: 10,
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
    bottom: 0,
  },
  Button: {
    borderRadius: 6,
    width: 120,
    marginLeft: 55,
  },
  ButtonModel: {
    right: 0,
    borderRadius: 6,
    width: width * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: 5,
    marginBottom: 10,
    // backgroundColor: 'red'
  },
  edit: {
    fontSize: 16,
    color: 'green',
    fontStyle: 'italic',
    marginTop: 5,
    right: 0,
    textAlign: 'right',
  },
});
