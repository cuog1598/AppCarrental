import React, {Component} from 'react';
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
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import Icon from 'react-native-vector-icons/Ionicons';
import {BarIndicator, PacmanIndicator} from 'react-native-indicators';
var s = '';

export default class HomeScreen extends Component {
  _isMounted = false;
  _isMounted2 = true;
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
        id: props.navigation.getParam('idList'),
        idsp: props.navigation.getParam('idsp'),
        guisp: props.navigation.getParam('guisp'),
      },
      message: '',
      messageList: [],
      isloadding: true,
      seen: '',
      load: true,
    };
  }

  static navigationOptions = ({navigation, state}) => {
    return {
      title: navigation.getParam('name', null),
      headerTitleStyle: {
        paddingTop: 20,
        fontSize: 22,
        textAlign: 'center',
        flexGrow: 0.76,
        alignSelf: 'center',
      },
      headerStyle: {
        height: 90,
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
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUserInfo', {
              userId: navigation.getParam('phone', null),
            });
          }}>
          <Icon
            style={{
              paddingTop: 20,
              marginRight: 20,
              fontWeight: 'bold',
            }}
            name="ios-information-circle-outline"
            size={30}
          />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({isloadding: false});
      if (this.state.person.guisp) {
        this._senmesssageCar();
      }
    }, 1800);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );

    if (this._isMounted) {
      this._loadmess();
      this._a();
      this._updatestatus();
    }
  };

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  UNSAFE_componentWillMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    this.backHandler.remove();
  };

  _loadmess = () => {
    try {
      firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child(this.state.person.phone)
        .on('child_added', value => {
          if (
            value.val() === 'false' ||
            value.val() === 'true' ||
            value.val() === 'seen'
          ) {
          } else {
            if (this._isMounted) {
              this.setState(prevState => {
                return {
                  messageList: [...prevState.messageList, value.val()],
                };
              });
            }
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  _a = () => {
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone)
      .orderByValue()
      .limitToLast(1)
      .on('child_added', val => {
        if (val.val().from !== User.phone) {
          var tao = firebase
            .database()
            .ref('messages')
            .child(User.phone)
            .child(this.state.person.phone);
          var no = firebase
            .database()
            .ref('messages')
            .child(this.state.person.phone)
            .child(User.phone);
          tao.update({seen: 'false'});
          no.update({seen: 'false'});
        }
      });
  };
  _senmesssageCar() {
    var ping1 = firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child('key');
    var ping2 = firebase
      .database()
      .ref('messages')
      .child(this.state.person.phone)
      .child('key');
    ping1.remove();
    ping2.remove();
    let msgId = firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone)
      .push().key;
    let update = {};
    let message = {
      message:
        'Chào bạn ! \nMình đang quan tâm đến sản phẩm này bạn tư vấn thêm giùm mình nhé',
      time: firebase.database.ServerValue.TIMESTAMP,
      from: User.phone,
      name: this.state.person.idsp,
      sp: true,
    };

    update[
      'messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId
    ] = message;
    update[
      'messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId
    ] = message;

    firebase
      .database()
      .ref()
      .update(update);

    var no = firebase
      .database()
      .ref('messages')
      .child(this.state.person.phone)
      .child(User.phone);
    var tao = firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone);
    no.update({seen: 'true'});
    tao.update({seen: 'false'});

    ping1.set({pingmess: this.state.message});
    ping2.set({pingmess: this.state.message});

    this.setState({
      message: '',
      seen: 'true',
    });
    this.setState({
      message:
        'Chào bạn ! \nMình đang quan tâm đến sản phẩm này bạn tư vấn thêm giùm mình nhé',
    });
    this.CreateNewList();
    this.setState({message: ''});
  }

  _senmesssage = () => {
    if (this.state.message.length > 0) {
      var ping1 = firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child('key');
      var ping2 = firebase
        .database()
        .ref('messages')
        .child(this.state.person.phone)
        .child('key');
      ping1.remove();
      ping2.remove();
      let msgId = firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let update = {};
      let message = {
        message: this.state.message,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };

      update[
        'messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId
      ] = message;
      update[
        'messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId
      ] = message;

      firebase
        .database()
        .ref()
        .update(update);

      var no = firebase
        .database()
        .ref('messages')
        .child(this.state.person.phone)
        .child(User.phone);
      var tao = firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child(this.state.person.phone);
      no.update({seen: 'true'});
      tao.update({seen: 'false'});

      ping1.set({pingmess: this.state.message});
      ping2.set({pingmess: this.state.message});

      this.setState({
        message: '',
        seen: 'true',
      });
      this.CreateNewList();
      this.setState({message: ''});
    }
  };

  _convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDate() !== d.getDate()) {
      result = d.getDate() + '-' + (d.getMonth() + 1);
    }
    return result;
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
        last = value.val().time;
      });
    return last;
  };

  _Bindding = id => {
    let ima = '';
    fetch(HostName + 'api/getcar/' + id)
      .then(response => response.json())
      .then(resopnseJson => {
        ima = resopnseJson.hinh;
      })
      .catch(error => {
        console.error(error);
      });
    return ima;
  };
  _renderitem = ({item}) => {
    if ((item.message != '', item.key != 'status')) {
      if (item.sp) {
        return (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Details', {
                idcar: item.name,
                manguoidang:
                  item.from == User.from ? this.state.person.phone : User.phone,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                width: '68%',
                alignSelf: item.from == User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: this.state.isloadding
                  ? 'white'
                  : item.from == User.phone
                  ? '#00897b'
                  : '#7cb342',
                borderRadius: 12,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  padding: 7,
                  fontSize: 18,
                  flex: 0.96, //height (according to its parent),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 45,
                  marginLeft: 10,
                }}
                numberOfLines={60}>
                {item.message + '\n\nBấm để xem'}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  padding: 1,
                  fontSize: 11,
                  marginTop: 12,
                }}>
                {this._convertTime(item.time)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              width: '68%',
              alignSelf: item.from == User.phone ? 'flex-end' : 'flex-start',
              backgroundColor: this.state.isloadding
                ? 'white'
                : item.from == User.phone
                ? '#00897b'
                : '#7cb342',
              borderRadius: 12,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                padding: 7,
                fontSize: 18,
                flex: 0.96, //height (according to its parent),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 45,
                marginLeft: 10,
              }}
              numberOfLines={60}>
              {item.message}
            </Text>
            <Text
              style={{color: '#fff', padding: 1, fontSize: 11, marginTop: 12}}>
              {this._convertTime(item.time)}
            </Text>
          </View>
        );
      }
    }
  };
  handelchange = key => val => {
    this.setState({[key]: val});
  };

  render() {
    let {height, width} = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    if (1 == 2) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent={true}
            />
            {this.state.isloadding && (
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                  marginTop: 99,
                  position: 'relative',
                }}>
                <PacmanIndicator color="black" />
              </View>
            )}

            <FlatList
              showsVerticalScrollIndicator={false}
              style={{padding: 10, height: height * 0.8, marginBottom: 12}}
              data={this.state.messageList}
              renderItem={this._renderitem}
              ref={ref => (this.flatList = ref)}
              onContentSizeChange={() =>
                this.flatList.scrollToEnd({animated: true})
              }
              onLayout={() => this.flatList.scrollToEnd({animated: true})}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  value={this.state.message}
                  keyboardType="email-address"
                  onChangeText={this.handelchange('message')}
                />
                <View>
                  <TouchableOpacity onPress={this._senmesssage}>
                    <Icon
                      name="md-send"
                      size={30}
                      style={{
                        color: 'green',
                        margin: 10,
                        paddingLeft: 5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }

  _updatestatus = () => {
    //
    fetch(HostName + 'api/chatlist/' + this.state.person.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myUser: User.phone,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {})
      .catch(error => {
        console.error(error);
      });
  };

  CreateNewList = () => {
    //
    fetch(HostName + 'api/chatlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myUser: User.phone,
        fromUser: this.state.person.phone,
        msFrom: User.phone,
        lastMs: this.state.message,
        status: true,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {})
      .catch(error => {
        console.error(error);
      });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green',
    width: '80%',
    borderRadius: 8,
  },
  InputView: {
    justifyContent: 'flex-end',
    bottom: 0,
  },
});
