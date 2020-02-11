import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, CardItem, Item, Input, Icon} from 'native-base';

import {Avatar, Image} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
export default class ViewUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      Phone: '',
      email: '',
      id: '',
      diachi: '',
      obj: [],
      IsLoadding: true,
      LazyLoad: false,
    };
  }

  static navigationOptions = ({navigation, state}) => {
    return {
      headerTitleStyle: {
        paddingTop: 20,
        fontSize: 22,
        textAlign: 'center',
        flexGrow: 0.76,
        alignSelf: 'center',
      },
      headerStyle: {
        height: 90,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowColor: 'white',
        shadowRadius: 0,
        elevation: 0,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              fontWeight: 'bold',
            }}
            name="ios-arrow-back"
            size={30}
          />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount = () => {
    this._getUser();
  };
  _getUser = async () => {
    const value = this.props.navigation.getParam('userId');
    fetch(HostName + 'api/Users/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          userName: resopnseJson.diaChi,
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
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{top:0, alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
            <Avatar
            size="xlarge"
              rounded
              source={{
                uri:
                  'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/12717447_625469907606498_721627668975832331_n.jpg?_nc_cat=102&_nc_oc=AQmPHA-WM_fXvvOPcV78gnWxlnIieWeUg0fZoJLwYnHVLwIb90Hb9qa_QUq8mxdmy9E&_nc_ht=scontent.fsgn8-1.fna&oh=55dc51a389ade4abbb521ccd07ca8db9&oe=5E1A6618',
              }}
            />
            <Text style= {{fontWeight:'300', fontSize:24, marginTop:5}}>{this.props.navigation.getParam('name')}</Text>
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
            <View style={styles.logoContainer}>
              <View style={styles.infoContainer}>
                <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                  Địa chỉ
                </Text>
                <Item>
                  <Input
                    onChangeText={userName => this.setState({userName})}
                    value={this.state.userName}
                    keyboardType="email-address"
                    returnKeyType="next"
                    disabled={true}
                    autoCorrect={false}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                </Item>
                <Item></Item>
                <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                  Điện thoại
                </Text>
                <Item>
                  <Icon active name="home" />
                  <Input
                    onChangeText={Phone => this.setState({Phone})}
                    value={this.state.Phone}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCorrect={false}
                    disabled={true}
                    ref={'txtPassword'}
                    onSubmitEditing={() => this.refs.txtPassword2.focus()}
                  />
                </Item>
                <Text style={{marginLeft: 4, fontSize: 17, color: 'gray'}}>
                  Email
                </Text>

                <Item>
                  <Input
                    disabled={true}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    placeholderTextColor="black"
                    returnKeyType="go"
                    autoCorrect={false}
                    ref={'txtPassword2'}
                  />
                </Item>
              <Text style={{fontSize:21, fontWeight:'300'}}>Sản phẩm</Text>

              </View>
            </View>
      </View>
    );
  }
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
