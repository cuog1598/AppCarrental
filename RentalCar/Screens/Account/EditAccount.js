import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Item,
  Input,
  Icon,
} from 'native-base';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Nguyễn cường',
      Phone: '',
      email: '',
      id: '',
      diachi: '',
      obj: [],
      IsLoadding: true,
      LazyLoad: false,
      enable: false,
    };
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this._getUser();
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  componentWillUnmount = () => {
    this.backHandler.remove();
  };
  _getUser = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(HostName + 'api/Users/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          userName: resopnseJson.hoTen,
          email: resopnseJson.email,
          Phone: resopnseJson.phone,
          IsLoadding: false,
        });
        if (this.state.obj.length === 0) {
          this.setState({
            IsData: true,
          });
        } else {
        }
      })
      .catch(error => {
        Alert.alert('Thông báo', 'error' + error)(error);
      });
  };
  render() {
    if(this.state.IsLoadding)
    {
        return(
          <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
        )
    }
    else
    {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View>
            <ImageBackground
              style={styles.Thumbnail}
              source={require('../images/backgroud/moto.jpg')}>
              <Image
                style={styles.logo}
                source={require('../images/logo.png')}></Image>
              <Text style={styles.title}>{this.state.title2}</Text>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 10,
                paddingTop: 20,
                justifyContent: 'center',
                borderRadius: 160 / 2,
              }}>
              <View style={{flex: 0.4}}></View>
              <View style={{flex: 0.3, marginTop: 100}}>
                <Card style={{borderRadius: (width * 0.3) / 2}}>
                  <CardItem cardBody style={{borderRadius: (width * 0.3) / 2}}>
                    <Image
                      style={{
                        height: width * 0.3,
                        width: width * 0.3,
                        borderRadius: (width * 0.3) / 2,
                      }}
                      source={{
                        uri:
                          'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/12717447_625469907606498_721627668975832331_n.jpg?_nc_cat=102&_nc_oc=AQmPHA-WM_fXvvOPcV78gnWxlnIieWeUg0fZoJLwYnHVLwIb90Hb9qa_QUq8mxdmy9E&_nc_ht=scontent.fsgn8-1.fna&oh=55dc51a389ade4abbb521ccd07ca8db9&oe=5E1A6618',
                      }}></Image>
                  </CardItem>
                </Card>
              </View>
  
              <View style={{flex: 0.4}}></View>
            </View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                color: 'gray',
                textAlign: 'center',
              }}>
              Thành viên đăng nhập bằng Facebook
            </Text>
          </View>
          <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback
              style={styles.container}
              onPress={Keyboard.dismiss}>
              <View style={styles.logoContainer}>
                <View style={styles.infoContainer}>
                  <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                    Tên
                  </Text>
                  <Item>
                    <Input
                      disabled={this.state.enable}
                      onChangeText={userName => this.setState({userName})}
                      value={this.state.userName}
                      keyboardType="email-address"
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
                  <Item></Item>
                  <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                    Điện thoại
                  </Text>
                  <Item>
                    <Icon active name="home" />
                    <Input
                      disabled={this.state.enable}
                      onChangeText={Phone => this.setState({Phone})}
                      value={this.state.Phone}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      autoCorrect={false}
                      ref={'txtPassword'}
                    />
                  </Item>
                  <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                    Email
                  </Text>
  
                  <Item>
                    <Input
                      disabled={this.state.enable}
                      onChangeText={email => this.setState({email})}
                      value={this.state.email}
                      placeholderTextColor="black"
                      returnKeyType="go"
                      autoCorrect={false}
                      ref={'txtPassword2'}
                    />
                  </Item>
  
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.Login}>
                    {this.state.LazyLoad && (
                      <View
                        style={{justifyContent: 'center', flex: 1, margin: 5}}>
                        <ActivityIndicator
                          hidesWhenStopped={true}
                          size="large"
                          color="#00ff00"
                          paddingTop={80}
                        />
                      </View>
                    )}
                    {!this.state.LazyLoad && (
                      <Text style={styles.buttonText}>Lưu</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
  Login = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    const {email, Phone, userName} = this.state;
    this.setState({
      LazyLoad: true,
      enable: true,
    });
    if (email == '') {
      alert('Không được để trống email');
    } else if (Phone.length > 11) {
      alert('số điện thoại không đúng');
    } else if (userName == '') {
      alert('Họ tên không được để trống');
    } else {
      fetch(HostName + 'api/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: value,
          userName: this.state.obj.userName,
          passWord: this.state.obj.userName,
          hoTen: this.state.userName,
          ngaySinh: this.state.obj.ngaySinh,
          ngayNhap: this.state.obj.ngayNhap,
          diaChi: this.state.obj.diaChi,
          gioitinh: this.state.obj.gioitinh,
          status: this.state.obj.status,
          groudId: this.state.obj.groudId,
          email: this.state.email,
          phone: this.state.Phone,
          xacthuc: this.state.obj.xacthuc,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.title == 'Not Found') {
            alert('Không lưu được');
            this.setState({
              LazyLoad: false,
              enable: false,
            });
          } else {
            this.props.navigation.goBack();
          }
        })
        .catch(error => {
          Alert.alert('Thông báo', 'error' + error)(error);
        });
    }
  };
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 192,
    height: 30,
    marginTop: 40,
  },
  title: {
    color: '#f7c744',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
    paddingBottom: 160,
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
  input: {
    height: 45,
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 15,
    justifyContent: 'flex-end',
    marginTop: 20,
    height: 55,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 18,
  },
  Thumbnail: {
    position: 'absolute',
    alignItems: 'center',
    height: 180,
    left: 0,
    right: 0,
    width: width,
  },
});
