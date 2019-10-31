import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
console.ignoredYellowBox = ['Setting a timer'];
import Headered from '../Screens/Components/BigHeader';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../Screens/User';
import Icon from 'react-native-vector-icons/Ionicons';
const {height, width} = Dimensions.get('window');
export default class Mail extends React.Component {
  state = {
    users: [],
    noname: '',
    messageList: [],
    isloadding: true,
    nodata: false,
    src: [],
    Seen: [],
  };

  _isMounted = true;
  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({
          isloadding: true,
        });
        this._LoadListChat();
      },
    );
  }

  componentWillMount = () => {
    this._loadList();
  };

  _loadList = async () => {
    try {
      this.setState({isloadding:true})
      User.phone = await AsyncStorage.getItem('@MyApp2_key');
      let dbref = firebase
        .database()
        .ref('messages')
        .child(User.phone);
      dbref.on('child_added', val => {
        this._LoadListChat();

        if (val) {
          this.setState({isloadding: true});
        }

        let person = val.val();
        person.phone = val.key;
        if (person.phone === User.phone) {
          User.phone = person.phone;
        } else {
          firebase
            .database()
            .ref('users')
            .child(person.phone)
            .on('child_added', value => {
              if (value.val() === null) {
                this.setState({isloadding: false});
              }
              this.setState(prevState => {
                return {
                  isloadding: false,
                  users: [...prevState.users, person],
                  nodata: false,
                };
              });
            });
        }
      });
    } catch (error) {
      this.setState({isloadding: false});
      alert('err' + error);
    }
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  };

  _convertTime = time => {
    let name = '';
    firebase
      .database()
      .ref('users')
      .child(time)
      .on('child_added', value => {
        name = value.val();
      });

    return name;
  };

  _Seen = phone => {
    let r = '';
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(phone)
      .orderByValue()
      .limitToFirst(1)

      .on('child_added', val => {
        r = val.val();
      });
      _isMounted =false;
    if (r == 'true') {
      return true;
    }
    return false;
  };

  _getLastmess = phone => {
    this._isMounted= true;
    let last = '';
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(phone)
      .orderByValue()
      .limitToLast(1)
      .on('child_added', value => {
        last = value.val().message;
      });
    return last;
  };
  _getlastfrom = phone => {
    let last = '';
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(phone)
      .orderByValue()
      .limitToLast(1)
      .on('child_added', value => {
        last = value.val().from;
      });
    return last;
  };
  _getLastime = phone => {
    let last = '';
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(phone)
      .orderByValue()
      .limitToLast(1)
      .on('child_added', value => {
        last = value.val().time;
      });
    let d = new Date(last);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDate() !== d.getDate()) {
      result = d.getDate() + '-' + (d.getMonth() + 1);
    }
    return result;
  };

  _renderitem = ({item}) => {
   if(this.state.src.length > 0)
   {
    if (item.myUser.toString() == User.phone) {
      const lastme = this._getLastmess(item.fromUser);
      const lasttime = this._getLastime(item.fromUser);
      const lastfrom = this._getlastfrom(item.fromUser);
      const seen = this._Seen(item.fromUser);
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChatScreens', {
              phone: item.fromUser.toString(),
              name: this._convertTime(item.fromUser),
            });
          }}>
          <View style={{margin: 5, marginTop: 20, flexDirection: 'row'}}>
            <View style={{width: '16%'}}>
              <Image
                style={{
                  backgroundColor: 'yellow',
                  height: width * 0.15,
                  width: width * 0.15,
                  borderRadius: width * 0.15,
                }}
                source={require('../images/backgroud/user.png')}
              />
            </View>
            <View
              style={{justifyContent: 'center', marginLeft: 20, width: '74%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 19,
                  paddingTop: 0,
                  fontWeight: '600',
                  color: 'black',
                }}>
                {this._convertTime(item.fromUser)}
              </Text>
              {lastme.length > 10 && lastfrom != User.phone && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.65}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 13, fontWeight: seen ? 'bold' : '400'}}>
                      {lastme}
                    </Text>
                  </View>
                  <View style={{flex: 0.35}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 13, fontWeight: seen ? 'bold' : '400'}}>
                      {lasttime}
                    </Text>
                  </View>
                </View>
              )}
              {lastme.length > 10 && lastfrom == User.phone && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.65}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 13}}>
                      Bạn : {lastme}
                    </Text>
                  </View>
                  <View style={{flex: 0.35}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 13}}>
                      {lasttime}
                    </Text>
                  </View>
                </View>
              )}
              {lastme.length <= 10 && lastfrom == User.phone && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 13}}>
                  Bạn : {lastme} {'      '} {lasttime}
                </Text>
              )}
              {lastme.length <= 10 && lastfrom != User.phone && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 13, fontWeight: seen ? 'bold' : '400'}}>
                  {lastme} {'      '} {lasttime}
                </Text>
              )}
            </View>

            <View
              style={{
                justifyContent: 'center',
                width: '10%',
              }}>
              {this._Seen(item.fromUser) && (
                <Icon
                  name="ios-basketball"
                  size={20}
                  style={{color: 'blue', paddingRight: 20}}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      const lastme = this._getLastmess(item.myUser);
      const lasttime = this._getLastime(item.myUser);
      const lastfrom = this._getlastfrom(item.myUser);
      const seen = this._Seen(item.myUser);
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChatScreens', {
              phone: item.myUser.toString(),
              name: this._convertTime(item.myUser),
            });
          }}>
          <View style={{margin: 5, marginTop: 20, flexDirection: 'row'}}>
            <View style={{width: '16%'}}>
              <Image
                style={{
                  backgroundColor: 'yellow',
                  height: width * 0.15,
                  width: width * 0.15,
                  borderRadius: width * 0.15,
                }}
                source={require('../images/backgroud/user.png')}
              />
            </View>
            <View
              style={{justifyContent: 'center', marginLeft: 20, width: '74%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 19,
                  paddingTop: 0,
                  fontWeight: '600',
                  color: 'black',
                }}>
                {this._convertTime(item.fromUser)}
              </Text>
              {lastme.length > 10 && lastfrom != User.phone && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.65}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 12, fontWeight: seen ? 'bold' : '400'}}>
                      {lastme}
                    </Text>
                  </View>
                  <View style={{flex: 0.35}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 12, fontWeight: seen ? 'bold' : '400'}}>
                      {lasttime}
                    </Text>
                  </View>
                </View>
              )}
              {lastme.length > 10 && lastfrom == User.phone && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.65}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 12}}>
                      Bạn : {lastme}
                    </Text>
                  </View>
                  <View style={{flex: 0.35}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{fontSize: 12}}>
                      {lasttime}
                    </Text>
                  </View>
                </View>
              )}
              {lastme.length < 10 && lastfrom == User.phone && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 12, fontWeight: seen ? 'bold' : '400'}}>
                  Bạn : {lastme} {'      '} {lasttime}
                </Text>
              )}
              {lastme.length < 10 && lastfrom != User.phone && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 12, fontWeight: seen ? 'bold' : '400'}}>
                  {lastme} {'      '} {lasttime}
                </Text>
              )}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '16%',
              }}>
              {seen && (
                <Icon
                  name="ios-basketball"
                  size={20}
                  style={{color: 'blue', paddingRight: 20}}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
   }
  };

  render() {
    const {navigate} = this.props.navigation;

    if (this._isMounted && this.state.isloadding) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    else if(this.state.nodata){
      return(

        <View>
          <Text>Nodata</Text>
        </View>
      )
    }
    
    else {
      return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <Headered Titile="Tin Nhắn" />
          <FlatList
            data={this.state.src}
            renderItem={this._renderitem}
            keyExtractor={() =>
              Math.random()
                .toString(36)
                .substr(2, 9)
            }
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      );
    }
  }

  _LoadListChat = () => {
    this.setState({isloadding: true});
    fetch('http://10.0.2.2:45455/api/chatlist/' + User.phone)
      .then(response => response.json())
      .then(resopnseJson => {
        if(resopnseJson.title == "Not Found")
        {
          this._isMounted=false;
         
        }
        else {
          this.setState({
            src: resopnseJson,
            isloadding: false,
          });
          this._isMounted=false;
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}
