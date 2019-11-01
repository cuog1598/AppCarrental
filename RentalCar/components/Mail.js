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
      if(User.phone !== "")
      {
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
        if (val.val() ==false || val.val() == true) {
          
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
                  nodata: false,
                };
              });
            });
        }
      });
      }
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
    let c = new Date();
    let reult = '';
    const mouth = phone.toString().substr(5,2);
    const year = phone.toString().substr(0,4);
    const day = phone.toString().substr(8,2);
    let cMounth = c.getMonth() +1;
    let cYear = c.getFullYear()

    if(mouth== cMounth && day== c.getDate() && year == cYear)
    {
      reult= phone.toString().substr(11,5)
    }
   
    else
    if(year == cYear && mouth== cMounth && day !=c.getDate())
    {
      reult =  day+' thg '+mouth
    }
    else
    if(cMounth==13 && mouth==12 && year== cYear && day== c.getDate())
    {
      reult= phone.toString().substr(11,5)
    }
    else 
    if(cMounth==13 && mouth==12 && year== cYear && day!= c.getDate())
    {
      reult =  day+' thg '+mouth
    }
    else
    {
      reult= year.toString().substr(2,2)+ day+' thg '+mouth
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
      if(item.status == true && item.msFrom != User.phone)
      { 
        ismyms= true;
      }
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ChatScreens', {
              phone: item.myUser== User.phone ? item.fromUser : item.myUser,
              name: item.name,
              ismyms : item.status == true && item.msFrom != User.phone ? true: false,
              idList : item.id,
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
                {item.name}
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
              {item.lastMs > 10 && item.fromUser != User.phone && item.status== true && (
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
              {item.msFrom != User.phone && item.status== true&& (
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
