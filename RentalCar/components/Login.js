import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, BackHandler,ActivityIndicator

} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {HostName} from '../Screens/Models.json';
import {WebHost} from '../Screens/Models.json';
import User from '../Screens/User';
import firebase from 'firebase';
export default class Login extends Component {


    constructor (props) {
        super(props)
        this.state = {
            userName:"",
            passWord: "",
            id:'',
            obj: [],
            isloadding:false
        }
     }
  

    render() {
        if(this.state.isloadding)
        {
            return (
                <View style={{justifyContent: 'center', flex: 1, margin: 5}}>
                  <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
                </View>
              );
        }
        else
        {

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
                <KeyboardAvoidingView style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/logo.png')}>
                                </Image>
                                <Text style={styles.title}>Account Information</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                    onChangeText={ (userName)=> this.setState({userName})}
                                    placeholder="Nhập tên tài khoản"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                                <TextInput style={styles.input} 
                                    onChangeText={ (passWord)=> this.setState({passWord})}
                                    placeholder="Nhập mật khẩu"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                />
                                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={this.Login}>
                                    <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

    setValue = async (id) => {
        try {
          await AsyncStorage.setItem('@MyApp2_key', this.state.userName)
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
      }
      setValuenull = async () => {
        try {
          await AsyncStorage.setItem('@MyApp2_key', "")
          await AsyncStorage.setItem('@MyApp2_key_id', "")
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
      }
      getMyValue = async () => {
        try {
          const value = await AsyncStorage.getItem('@MyApp2_key');
          alert(value +"Tài khoản hoặc mật khẩu không đúng")
        } catch(e) {
          alert("Không lưu data");
        }
      }
    Login = () =>{
        if(this.state.userName == "" || this.state.passWord == "" ) {
            alert("Chưa nhập tài khoản hoặc mật khẩu")
        }
        else
        {
            this.setState({
                isloadding:true
            })
            fetch(HostName + 'api/users', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userName":this.state.userName,
                    "passWord": this.state.passWord,
                })
                }).then((response) => response.json())
                  .then((responseJson) => {
                 if(responseJson.title =="Not Found" ) {
                  this.setValuenull();
                  this.getMyValue();  
                  this.setState({
                    isloadding:false
                })
                }
                 else {
                     this.setState({
                         isloadding: true
                     })
                    try{
                         AsyncStorage.setItem('@MyApp2_key', responseJson.id.toString());
                         AsyncStorage.setItem('@MyApp2_key_Username', this.state.userName);
                         User.name = this.state.name;
                         User.phone = responseJson.id;
                         firebase.database().ref('users/'+responseJson.id.toString()).set({name: responseJson.hoTen});
                         this.props.navigation.navigate('Home')
                         
                    }
                    catch(error)
                    {
                        alert(error);
                    }
                    
                }
                }).catch((error) => {
                  alert(error);
                });
            }
        }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 260,
        height: 40,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        paddingBottom:160,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    } ,
    logo: {
        width: 192,
        height: 30,
        marginTop:40
    },
})