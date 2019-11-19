import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  HeaderButtons,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Container,
  Fab,
  Tab,
  Tabs,
  TabHeading,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  ScrollableTab,
  Picker,
  Form,
  Label,
} from 'native-base';
import Head from '../Components/BigHeader';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import Modal from 'react-native-modal';
export const CustomNavButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="ios-arrow-back" size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      Nodata: false,
      isLoadding: true,
      Mail: 1,
      obj1: [],
      Caractive: [],
      CarNotactive: [],
      XeDangThue: [],
      isModalVisible: false,
      selected: '0',
      selected2: '',
      obj2: [],
      obj:[],
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Xe của tôi',
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
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowColor: 'white',
      shadowRadius: 0,
      elevation: 0,
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

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this._GetCar();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({
          isLoadding: true,
          selected: '0',
          selected2: '',
          
      isModalVisible: false,
        });
        this._GetCar();
        this._GetCarActive();
        this._GetCarNotActive();
        this._ChuaDuyet();
      },
    );
  }

   componentWillUnmount() {
    this.willFocusSubscription.remove();
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  onValueChange(value) {
    this.setState({
      check: false,
      selected: value,
    });

    fetch(HostName + 'api/HangXes/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj2: resopnseJson,
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
  _GetCar = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(
      HostName +
        'api/SellerCar/' +
        value +
        '?Loai=' +
        this.props.navigation.state.params.LoaiXe,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
        });
        if (this.state.obj.length === 0) {
          this.setState({
            Nodata: true,
          });
        } else {
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  _GetCarActive = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(
      HostName +
        'api/SellerCar/' +
        value +
        '?Loai=' +
        this.props.navigation.state.params.LoaiXe +
        '&type=' +
        'active',
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          Caractive: resopnseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  _GetCarNotActive = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(
      HostName +
        'api/SellerCar/' +
        value +
        '?Loai=' +
        this.props.navigation.state.params.LoaiXe +
        '&type=' +
        'Notactive',
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          CarNotactive: resopnseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  _ChuaDuyet = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(
      HostName +
        'api/SellerCar/' +
        value +
        '?Loai=' +
        this.props.navigation.state.params.LoaiXe +
        '&type=' +
        'chuaduyet',
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          XeDangThue: resopnseJson,
          isLoadding: false,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  _renderitem = ({item}) => {
    const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SellerCarDetails', {
              idcar: item.id,
            });
          }}>
          <Image
            style={styles.imageThumbnail}
            source={{uri: WebHost + item.hinh}}
          />
          <Text style={styles.Carname}>{item.tenxe}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    if (this.state.isLoadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1, margin: 5}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } else if (this.state.Nodata) {
      return (
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={{flex: 1}}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: '#5067FF',
                height: 80,
                width: 80,
                marginBottom: 30,
                borderRadius: 40,
              }}
              position="bottomRight"
              onPress={this.toggleModal }>
              <Icon name="ios-add" size={40} />
            </Fab>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-timer" size={200} style={{color: 'gray'}} />
              <Text style={{fontSize: 16}}>
                bạn Chưa đăng kí bất kì sản phẩm nào!
              </Text>
            </View>
          </View>
          <Modal
            isVisible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({
                isModalVisible: !this.state.isModalVisible,
              });
            }}
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
                    height: 80,
                  }}>
                  <Text style={{fontSize: 22, fontWeight: '900'}}>
                    Create new car
                  </Text>
                  <Text style={{fontSize: 17, color: 'gray'}}>
                    Chọn loại xe
                  </Text>
                </View>
                <View style={{margin: 10}}>
                  <Form>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{width: undefined}}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}>
                      <Picker.Item label="Chọn loại xe" value="0" />
                      <Picker.Item label="Xe máy" value="1" />
                      <Picker.Item label="ô Tô" value="2" />
                    </Picker>
                  </Form>
                  <Form style={{paddingTop: 10}}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{width: undefined}}
                      selectedValue={this.state.selected2}
                      onValueChange={this.onValueChange2.bind(this)}>
                      <Picker.Item label="Chọn hãng dưới đây" value="0" />
                      {this.state.obj2.map(item => {
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
                </View>

                <View
                  style={{
                    paddingTop: 10,
                    borderTopColor: 'gray',
                    borderTopWidth: 0.4,
                  }}>
                  <TouchableOpacity
                    onPress={
                    this.Tieptuc
                    }
                    >
                    {this.state.selected2 > 0 && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 22,
                          textAlign: 'center',
                          marginTop: 10,
                          marginBottom: 20,
                        }}>
                        Tiếp tục
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._cancel}>
                    <Text style={styles.TextModel}>Huỷ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      );
    } else {
      return (
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.container}>
            {this.state.obj.length>0 && (
              <Tabs
              tabBarUnderlineStyle={{
                borderBottomWidth: 2.5,
                borderBottomColor: 'green',
                borderTopWidth: 0,
              }}
              style={{borderTopColor: 'white', borderTopWidth: 0}}>
              <Tab
                heading="Tất Cả"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.obj}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Hoạt động"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.Caractive}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Đang khoá"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.CarNotactive}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Chưa duyệt"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.XeDangThue}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
            </Tabs>
            )}

            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: '#008000',
                height: 65,
                width: 65,
                marginBottom: 30,
                borderRadius: 40,
              }}
              position="bottomRight"
              onPress={this.toggleModal}>
              <Icon name="ios-add" size={60} />
            </Fab>
          </View>

          <Modal
            isVisible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({
                isModalVisible: !this.state.isModalVisible,
              });
            }}
            coverScreen={true}
            style={{justifyContent: 'center'}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginTop: (height / 4) * 0.7,
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
                    height: 80,
                  }}>
                  <Text style={{fontSize: 22, fontWeight: '900'}}>
                    Create new car
                  </Text>
                  <Text style={{fontSize: 17, color: 'gray'}}>
                    Chọn loại xe
                  </Text>
                </View>
                <View style={{margin: 10}}>
                  <Form>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{width: undefined}}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}>
                      <Picker.Item label="Chọn loại xe" value="0" />
                      <Picker.Item label="Xe máy" value="1" />
                      <Picker.Item label="ô Tô" value="2" />
                    </Picker>
                  </Form>
                  <Form style={{paddingTop: 10}}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{width: undefined}}
                      selectedValue={this.state.selected2}
                      onValueChange={this.onValueChange2.bind(this)}>
                      <Picker.Item label="Chọn hãng dưới đây" value="0" />
                      {this.state.obj2.map(item => {
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
                </View>

                <View
                  style={{
                    paddingTop: 10,
                    borderTopColor: 'gray',
                    borderTopWidth: 0.4,
                  }}>
                  <TouchableOpacity
                    onPress={
                    this.Tieptuc
                    }
                    >
                    {this.state.selected2 > 0 && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 22,
                          textAlign: 'center',
                          marginTop: 10,
                          marginBottom: 20,
                        }}>
                        Tiếp tục
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._cancel}>
                    <Text style={styles.TextModel}>Huỷ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      );
    }
  }
  Tieptuc = () => {
    const navigate = this.props.navigation;
    this.setState ({
      isModalVisible : !this.state.isModalVisible,
    })
    this.props.navigation.navigate('SellerCreateNewCar', {
      maloai: this.state.selected,
      mahang: this.state.selected2,
    });
    
  };
  _cancel = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      selected: '0',
      selected2: '',
    });
  };
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 2 - 50,
    width: width / 2 - 15,
    borderRadius: 5,
    marginTop: 10,
  },
  Carname: {
    fontSize: 16,
    fontWeight: '300',
    color: 'gray',
    marginLeft: width / 8.3,
  },
  TextModel: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
});
