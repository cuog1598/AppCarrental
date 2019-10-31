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
  ActivityIndicator

} from 'react-native';
console.ignoredYellowBox = ['Setting a timer'];
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';
 

export default class Te extends React.Component {
  state = {
    users: [],
    noname : '',
    messageList :[],
    isloadding: true,
  };


  componentDidMount = () =>
  {
    if(this.state.users == [])
    {
      this.setState({ isloadding : false})
    }
  }
  UNSAFE_componentWillMount =() => { 
    this._loadList();
    setTimeout(() => {
        if(this.state.isloadding==true)
        {
            this.setState({isloadding : false})
            alert("Không óc kq")
        }
          }, 10000);
  }

  

  _loadList = async () => {
    try{
        const value =  await AsyncStorage.getItem('@MyApp2_key');
    alert(value)

    let dbref = firebase.database().ref('messages').child(value)
    dbref.on('child_added', val => {
      if(val)
      {
        this.setState({isloadding:true})
      }

      let person = val.val();
      person.phone = val.key;
      if(person.phone === User.phone)
      {
        User.phone = person.phone
      }
     
      else {
       
      firebase.database().ref('users').child(person.phone) 
      .on('child_added', (value) =>{
        if(value.val()  === null)
        {
          this.setState({isloadding:false})
        }
      this.setState(prevState => {
        return {
          isloadding:false,
          users: [...prevState.users, person],    
        };
      });
    })
    }
    });
    }
    catch {

    }
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  };

 
  _convertTime = (time) => {
    let name = "";
    firebase.database().ref('users').child(time)
    .on('child_added', (value) =>{
      name = value.val();
    })
    
    return name ;
  }
  _renderitem = ({item}) => {
    const name = this._convertTime(item.phone)
    if(name.length >0 )
    {
      return (
        <TouchableOpacity style= {{maring:10, borderBottomColor:'gray', borderBottomWidth:1, height:40, justifyContent:'center'}}
        onPress = {() =>{
          this.props.navigation.navigate('ChatScreens',{phone : item.phone, name : this._convertTime(item.phone)})
        }}
        >
          <Text style ={{fontSize:20}}>{name}</Text> 
        </TouchableOpacity>
      )
    }
      
  }
 
  render() {
    const {navigate} = this.props.navigation;

    if(this.state.isloadding)
    {
      return (
       <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
         <ActivityIndicator/>
       </View>
      )
    }
    else
    {
      return (
        <SafeAreaView>
          <FlatList
            data ={this.state.users}
            renderItem = {this._renderitem}
            keyExtractor ={(item) =>item.phone}
          />
  
          <TouchableOpacity onPress={this._signOutAsync} style={{justifyContent:'flex-end', marginTop:200}}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
    
  }
}
