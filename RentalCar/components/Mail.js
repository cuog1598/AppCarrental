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
//srvẻerr
import {HostName} from '../Screens/Models.json';
import {WebHost} from '../Screens/Models.json';
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

  _isMounted = false;
  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
    this._isMounted = true;
        this._LoadListChat();
      },
    );
  }

  componentWillMount = () => {
    this._loadList();
  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
    this._isMounted = false;
  }
  _loadList = async () => {
    try {
      if (User.phone !== '') {
        let dbref = firebase
          .database()
          .ref('messages')
          .child(User.phone);
        dbref.on('child_added', val => {
          this._LoadListChat();
          let person = val.val();
          person.phone = val.key;
        });
      }
    } catch (error) {
      this.setState({isloadding: false});
      alert('err' + error);
    }
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

  _getLastime = phone => {
    let c = new Date();
    let reult = '';
    const mouth = phone.toString().substr(5, 2);
    const year = phone.toString().substr(0, 4);
    const day = phone.toString().substr(8, 2);
    let cMounth = c.getMonth() + 1;
    let cYear = c.getFullYear();

    if (mouth == cMounth && day == c.getDate() && year == cYear) {
      reult = phone.toString().substr(11, 5);
    } else if (year == cYear && mouth == cMounth && day != c.getDate()) {
      reult = day + ' thg ' + mouth;
    } else if (
      cMounth == 13 &&
      mouth == 12 &&
      year == cYear &&
      day == c.getDate()
    ) {
      reult = phone.toString().substr(11, 5);
    } else if (
      cMounth == 13 &&
      mouth == 12 &&
      year == cYear &&
      day != c.getDate()
    ) {
      reult = day + ' thg ' + mouth;
    } else {
      reult = day + ' thg ' + mouth;
    }
    return reult;
  };

  _renderitem = ({item}) => {
    const lastme = item.lastMs;
    const lasttime = this._getLastime(item.date);
    const lastfrom = item.msFrom;
    const seen = item.status;
    const name = item.name;
    let ismyms = false;
    if (item.status == true && item.msFrom != User.phone) {
      ismyms = true;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ChatScreens', {
            phone: item.myUser == User.phone ? item.fromUser : item.myUser,
            name: item.name,
            ismyms:
              item.status == true && item.msFrom != User.phone ? true : false,
            idList: item.id,
            guisp : false
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
            style={{justifyContent: 'center', marginLeft: 20, width: '80%'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 19,
                paddingTop: 0,
                fontWeight: '600',
                color: 'black',
              }}>
              {item.name}
            </Text>
            {lastme.length > 13 && lastfrom != User.phone && (
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
            {item.lastMs.length > 13 &&
              lastfrom == User.phone
              && (
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
            {lastme.length <= 13 && lastfrom == User.phone && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{fontSize: 13}}>
                Bạn : {lastme} {'      '} {lasttime}
              </Text>
            )}
            {lastme.length <= 13 && lastfrom != User.phone && (
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
            {item.msFrom != User.phone && item.status == true && (
              <Icon
                name="ios-basketball"
                size={20}
                style={{color: 'blue', paddingRight: 0}}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigate} = this.props.navigation;

    if (this._isMounted && this.state.isloadding) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <Headered Titile="Tin Nhắn" />
          {this.state.src.length > 0 ? (
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
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'gray', fontSize: 22}}>
                you have no messages
              </Text>
            </View>
          )}
        </SafeAreaView>
      );
    }
  }

  _LoadListChat = () => {
    fetch(HostName + 'api/chatlist/' + User.phone)
      .then(response => response.json())
      .then(resopnseJson => {
        if (resopnseJson.title == 'Not Found') {
          this._isMounted = false;
          this.setState({
            nodata: true,
          });
        } else {
        if(this._isMounted)
        {
          this.setState({
            src: resopnseJson,
            isloadding: false,
          });
        }
        }
      })
      .catch(error => {
        Alert.alert('Thông báo từ hệ thống', 'Error' + error);
      });
  };
}
