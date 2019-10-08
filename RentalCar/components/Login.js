import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {


    constructor (props) {
        super(props)
        this.state = {
            userName:"",
            passWord: "",
            id:'',
            obj: [],
        }
     }
  

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
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
    setValue = async () => {
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
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
      }
      getMyValue = async () => {
        try {
          const value = await AsyncStorage.getItem('@MyApp2_key');
          alert(value)
        } catch(e) {
          alert("khÃ´ng Ä‘á»c Ä‘Æ°á»£c");
        }
      }
    Login= () =>{
        fetch('http://192.168.1.14:45455/api/users', {
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

                } else {
                    try{
                        this.setValue();
                        this.getMyValue();
                    }
                    catch(error)
                    {
                        alert(error);
                    }
                    
                }
                }).catch((error) => {
                  console.error(error);
                });
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
    }
})