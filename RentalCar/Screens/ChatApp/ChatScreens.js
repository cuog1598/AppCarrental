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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';

export default class HomeScreen extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },
      message: '',
      messageList: [],
      isloadding: false,
      seen : '',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
    };
  };

  componentDidMount =() => {
    this._isMounted = true;
    if (this._isMounted) {
      this._loadmess();
    }
  }

  UNSAFE_componentWillMount =() => {
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }
  _loadmess = () => {
      try{
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone)
      .on('child_added', value => {
        if (value.val()=== 'false' || value.val()=== 'true' || value.val()=== 'seen') {
        } else {
            if(this._isMounted)
            {
                this.setState(prevState => {
                    return {
                      messageList: [...prevState.messageList, value.val()],
                    };
                  });
            }
        }
      });
      this._a();
    }
    catch (e) {
        console.error(e);
      }
  };

  _a = () => {
    firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).orderByValue().limitToLast(1)
    .on('child_added', (val) => {
      
      if(val.val().from !== User.phone)
      {
        var tao= firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
        var no= firebase.database().ref('messages').child(this.state.person.phone).child(User.phone)
        tao.update({seen:'false'})
        no.update({seen:'false'})
      }
    })
   }
  _senmesssage = () => {
    if (this.state.message.length > 0) {
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
      }

      update['messages/'+User.phone+'/'+this.state.person.phone+ '/' + msgId] =message;
      update['messages/'+this.state.person.phone+'/'+User.phone+ '/' + msgId] =message;
     
      
      firebase.database().ref().update(update);

      var no= firebase.database().ref('messages').child(this.state.person.phone).child(User.phone)
      var tao= firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
      no.update({seen:'true'})
      tao.update({seen:'false'})
      this.setState({
        message:'',
        seen : 'true'
      });
      this.CreateNewList();


      this.setState({message: ''});
      this.CreateNewList();
    }
  };

  _convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDate() !== d.getDate()) {
      result = d.getDate() + '-' + (d.getMonth() + 1) + '\n'  + result;
    }
    return result;
  };
  _renderitem = ({item}) => {
    if ((item.message != '', item.key != 'status')) {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '65%',
            alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
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
              minHeight:45,
              marginLeft:10
            }}
            numberOfLines={60}>
            {item.message}
          </Text>
          <Text
            style={{color: '#eee', padding: 1, fontSize: 11, marginTop: 12}}>
            {this._convertTime(item.time)}
          </Text>
        </View>
      );
    }
  };
  handelchange = key => val => {
    this.setState({[key]: val});
  };
  render() {
    let {height, width} = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    if (this.state.isloadding) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <FlatList
            style={{padding: 10, height: height * 0.8}}
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
                  <Text
                    style={{
                      color: 'blue',
                      fontSize: 22,
                      marginTop: 40,
                      marginLeft: 5,
                    }}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
  
  CreateNewList=  () =>{
    //
  fetch(HostName+'api/chatlist', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            myUser : User.phone,
            fromUser :this.state.person.phone
          })
          }).then((response) => response.json())
            .then((responseJson) => {
           
          }).catch((error) => {
            console.error(error);
          });
      }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '78%',
    borderRadius: 12,
    marginTop: 30,
  },
});
