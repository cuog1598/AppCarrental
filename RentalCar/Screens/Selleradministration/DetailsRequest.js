import React, {Component} from 'react';

import {
  StatusBar,
  BackHandler,
  NumberFormat,
  FormattedNumber,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

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
  DatePicker,
  Thumbnail,
  FooterTab,
} from 'native-base';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';

const {width: screenWidth} = Dimensions.get('window');

const a = '../images/backgroud/white.jpg';

export default class Seemore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NgayLap: '',
      title: '',
      obj: [],
      IsLoadding: true,
      diachi: '',
      car: [],
      tinhtrang: '',
      tungay: '',
      denNgay: '',
    };
  }

  componentDidMount() {
    this._GetAllcart();
    this._Bindding();
    this.senrequest();
    this._Bindding2();

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };
  //+this.props.navigation.state.params.mahd
  _GetAllcart = () => {
    fetch(
      HostName+'api/Oders/' +
        this.props.navigation.state.params.mahd,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          title: resopnseJson.ngayLap,
          tungay: resopnseJson.tuNgay,
          denNgay: resopnseJson.denNgay,
        });
        if (this.state.obj.length === 0) {
          this.setState({
            IsData: true,
          });
        } else {
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  //
  senrequest = () => {
    fetch(
      HostName+'api/SellerOder/' +
        this.props.navigation.state.params.mahd,
    )
      .then(response => response.json())
      .then(resopnseJson => {})
      .catch(error => {
        alert(error);
      });
  };
  _Bindding = () => {
    fetch(
      HostName+'api/getcar/' +
        this.props.navigation.state.params.maxe,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          car: resopnseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  //this.props.navigation.state.params.mahd
  _Bindding2 = () => {
    fetch(
      HostName +'api/Oderstatus/' +
        this.props.navigation.state.params.mahd,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          tinhtrang: resopnseJson.tinhTrang,
          isloadding: false,
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    const {navigation} = this.props;
    const tungay = this.state.tungay.toString().substr(0, 10);
    const denNgay = this.state.denNgay.toString().substr(0, 10);
    if (this.state.isloadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } 
    else {
      const ngay = this.state.title.toString().substr(8, 2);
      const thang = this.state.title.toString().substr(5, 2);
      const nam = this.state.title.toString().substr(0, 4);
      const time = this.state.title.toString().substr(11, 5);
      const title2 = ngay + ' THG ' + thang + ', ' + nam + ' ' + time;
      return (
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.container}>
            <View style={styles.Thumbnail}>
              <ImageBackground style={styles.Thumbnail} source={require(a)}>
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{paddingTop: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <Icon
                        style={{
                          paddingLeft: 27,
                          paddingTop: 20,
                          fontWeight: 'bold',
                        }}
                        name="ios-arrow-back"
                        size={30}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        paddingTop: 20,
                        paddingLeft: 30,
                      }}>
                      {title2}
                    </Text>
                    <TouchableOpacity onPress = {this.Delete}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        paddingTop: 20,
                        paddingLeft: 30,
                        color:'red'
                      }}>
                      Xoá
                    </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </ImageBackground>
              <View style={{height: 0.8, backgroundColor: 'gray'}}></View>
            </View>
            <ScrollView
              style={{paddingTop: 10}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  height: 20,
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <View
                  style={{
                    paddingTop: 12,
                    marginLeft: 5,
                    marginRight: 5,
                    flex: 0.7,
                  }}>
                  <Text style={{color: 'gray'}}>Mã yêu cầu</Text>
                </View>

                <View
                  style={{
                    paddingTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    flex: 0.3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    PHD 00Ơ{this.state.obj.id}
                  </Text>
                </View>
              </View>
              <View>
                <Card transparent>
                  <CardItem>
                    <Body>
                      <View style={{flexDirection: 'row', paddingLeft: 10}}>
                        <View
                          style={{
                            paddingTop: 10,
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 0.2,
                          }}>
                          <Thumbnail
                            style={{backgroundColor: 'yellow'}}
                            source={require('../images/backgroud/motoDraw.png')}
                          />
                        </View>
                        <View
                          style={{
                            paddingTop: 10,
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 0.8,
                          }}>
                          <Text style={styles.TextCardItem}>
                            {this.state.car.tenxe}
                          </Text>
                          <Text style={styles.TextItem}>
                            {this.state.tinhtrang}
                          </Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>

                <Card transparent>
                  <CardItem>
                    <Body>
                      <View style={{flexDirection: 'row', paddingLeft: 10}}>
                        <View
                          style={{
                            paddingTop: 10,
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 0.2,
                          }}>
                          <Icon
                            style={{fontWeight: 'bold', color: 'blue'}}
                            name="ios-code"
                            size={30}
                          />
                          <Icon
                            style={{fontWeight: 'bold', color: 'blue'}}
                            name="ios-more"
                            size={30}
                          />
                          <Icon
                            style={{
                              fontWeight: 'bold',
                              color: 'blue',
                              paddingLeft: 2,
                            }}
                            name="ios-checkmark"
                            size={35}
                          />
                        </View>
                        <View
                          style={{
                            paddingTop: 14,
                            marginLeft: 5,
                            marginRight: 5,
                            flex: 0.8,
                          }}>
                          <Text style={styles.TextCardItem}>{tungay}</Text>
                          <Text style={styles.TextCardItem}></Text>
                          <Text style={styles.TextCardItem}>{denNgay}</Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>

                <Card transparent>
                  <CardItem>
                    <Body>
                      <View>
                        <Text style={styles.TextHeader}>Tóm tắt yêu cầu</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 10,
                          paddingBottom: 5,
                        }}>
                        <View
                          style={{marginLeft: 5, marginRight: 5, flex: 0.3}}>
                          <Text style={styles.TextCardItem2}>Tên xe</Text>
                          <Text style={styles.TextCardItem2}>Loại xe</Text>
                          <Text style={styles.TextCardItem2}>Chủ xe</Text>
                          <Text style={styles.TextCardItem2}>Địa chỉ nhận</Text>
                        </View>
                        <View
                          style={{marginLeft: 5, marginRight: 5, flex: 0.7}}>
                          <Text style={styles.TextCardItem2}>
                            {this.state.car.tenxe}
                          </Text>
                          <Text style={styles.TextCardItem2}>
                            {this.state.car.loaiXe}
                          </Text>
                          <Text style={styles.TextCardItem2}>
                            {this.state.car.tenNguoiDang}
                          </Text>
                          <Text style={styles.TextCardItem2}
                          numberOfLines={1}
                          >
                            {this.state.car.diachi}
                          </Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Body>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 10,
                          paddingBottom: 5,
                        }}>
                        <View
                          style={{marginLeft: 5, marginRight: 5, flex: 0.3}}>
                          <Text style={styles.TextCardItem2}>Số ngày</Text>
                          <Text style={styles.TextCardItem2}>Tiền cọc</Text>
                          <Text style={styles.TextCardItem2}>Giá thuê</Text>
                        </View>
                        <View
                          style={{marginLeft: 5, marginRight: 5, flex: 0.7}}>
                          <Text style={styles.TextCardItem2}>
                            {this.state.obj.songay}
                          </Text>
                          <Text style={styles.TextCardItem2}>2.500.000 đ</Text>
                          <Text style={styles.TextCardItem2}>
                            {this.state.obj.tongTien} đ
                          </Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Body>
                      <View style={{flexDirection: 'row', paddingBottom: 5}}>
                        <View style={{marginRight: 5, flex: 0.7}}>
                          <Text style={styles.TextHeader}>Tổng cộng</Text>
                        </View>
                        <View style={{marginRight: 5, flex: 0.1}}>
                          <Icon
                            style={{fontWeight: 'bold'}}
                            name="ios-aperture"
                            size={30}
                          />
                        </View>
                        <View style={{marginRight: 5, flex: 0.3}}>
                          <Text style={styles.TextHeader}>
                            {this.state.obj.tongTien} đ
                          </Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </View>
            </ScrollView>
            <Footer style={styles.footer}>
              <FooterTab style={styles.footer}>
                <ScrollView horizontal={true}>
                  <Button bordered danger icon style={styles.Button}>
                    <Icon
                      name="ios-chatboxes"
                      size={25}
                      style={{color: 'green'}}
                    />
                    <Text>Chat</Text>
                  </Button>
                  {this.state.tinhtrang == 'Yêu cầu đang xử lý' && (
                    <Button bordered primary style={styles.Button} icon onPress = { this.Xacnhan}>
                        <Icon
                          name="ios-hammer"
                          size={25}
                          style={{color: 'red'}}
                        />
                     
                        <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                          {' '}
                          Xác nhận{' '}
                        </Text>
                     
                    </Button>
                  )}
                  {this.state.tinhtrang != 'Yêu cầu đang xử lý',this.state.tinhtrang == 'Chưa tiến hành' && (
                    <Button bordered primary style={styles.Button} icon onPress = { this.Xacnhan}>
                     
                        <Icon
                          name="ios-close"
                          size={25}
                          style={{color: 'red'}}
                        />
                        <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                          {' '}
                          Huỷ xác nhận{' '}
                        </Text>
                     
                    </Button>
                  )}
                  {this.state.tinhtrang != 'Yêu cầu đang xử lý',this.state.tinhtrang!="Chưa tiến hành" && (
                    <Button bordered primary style={styles.Button} icon>
                      <Icon
                        name="ios-information-circle-outline"
                        size={25}
                        style={{color: 'red'}}
                      />

                      <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                        {this.state.tinhtrang}
                      </Text>
                    </Button>
                  )}
                  
                </ScrollView>
              </FooterTab>
            </Footer>
          </View>
        </Container>
      );
    }
  }
  Xacnhan = () => {
   
    fetch(HostName + 'api/Oderstatus/' + this.props.navigation.state.params.mahd, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.title == 'Not Found') {
          alert('không tìm thấy hình ảnh');
        } else {
          this.setState({
            isloadding:true
          })
          this._Bindding2();
        }
      })
      .catch(error => {
        alert(error);
      });
  
};
  Delete = () => {
   
      fetch(HostName + 'api/getNotifical/' + this.props.navigation.state.params.mahd, {
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
              isloadding : true,
            })
            this.props.navigation.goBack();
          }
        })
        .catch(error => {
          alert(error);
        });
    
  };
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
  },
  Thumbnail: {
    height: 100,
    left: 0,
    right: 0,
    width: width,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  TextHeader: {
    paddingTop: 1,
    fontWeight: '300',
    fontSize: 18,
    fontFamily: 'time new roman',
  },
  textdefault: {
    paddingTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    height: 120,
    backgroundColor: 'white',
    borderTopColor: 'gray',
    borderTopWidth: 0.4,
    justifyContent: 'center',
  },
  Button: {
    borderRadius: 6,
    marginLeft: 20,
    alignItems: 'center',
    marginRight: 20,
    textAlign: 'center',
    height: 60,
  },
  content: {
    height: 40,
    justifyContent: 'center',
    flex: 1,
  },
  Header: {
    fontSize: 20,
    color: 'gray',
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  Cards: {
    marginTop: 10,
    marginLeft: 8,
    marginRight: 5,
  },
  TextCardItem: {
    fontSize: 18,
    marginTop: 2,
  },
  TextItem: {
    color: '#ff794d',
    fontSize: 18,
  },
  TextCardItem2: {
    fontSize: 17,
    marginTop: 4,
    color: '#2f4f4f',
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
});
