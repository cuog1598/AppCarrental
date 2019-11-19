import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar} from 'react-native'
import MainComponent from './components/MainComponent';
import DetailComponent from './components/Mail';
import ThirdComponent from './components/Account';
import Login from './components/Login';
import Home from './Screens/Home';
import Search from './Screens/Product/Search';
import ListProduct from './Screens/Product/ListProduct';
import Details from './Screens/Product/Details';
import SeeMore from './Screens/Product/Seemore';
import Oders from './Screens/Product/Oders';
import Cart from './Screens/Product/Cart';
import History from './Screens/Product/History';
import OderDetails from'./Screens/Product/OderDetails';
import Splash from './components/Splash';
import UserDetails from './Screens/Account/EditAccount';
import MainSeller from './Screens/Seller/Main';
import Editimage from './Screens/Seller/EditImages';
import SellerProduct from './Screens/Seller/SellerProduct';
import CarDetails from './Screens/Seller/CarDetails';
import SellerEditInfo from './Screens/Seller/Editinfomation';
import SellerCreateNewCar from './Screens/Seller/CreateNewCar';
import SellerRequest from './Screens/Selleradministration/Request';
import SellerDetailsRequest from './Screens/Selleradministration/DetailsRequest';
import ChatScreens from './Screens/ChatApp/ChatScreens';
import ViewUserInfo from './Screens/Account/ViewUserInfo';
import Te from './Screens/ChatApp/Te'
//Screen names

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  

import Icon from 'react-native-vector-icons/Ionicons';  
import Block from './components/Block';
import firebase from 'firebase';
import User from './Screens/User';

import AsyncStorage from '@react-native-community/async-storage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'Splash' };
       
    }
   
    componentDidMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                setTimeout(() => {
                    this._bootstrapAsync();
                      }, 500);
            }
          );
        
    }
    componentWillUnmount() {
      this.willFocusSubscription.remove();
    }
      
    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBMHWpmLrurrTM6YLZj9VjHMDz8A9Xt0Nk",
            authDomain: "rnchatapprentalcar.firebaseapp.com",
            databaseURL: "https://rnchatapprentalcar.firebaseio.com",
            projectId: "rnchatapprentalcar",
            storageBucket: "rnchatapprentalcar.appspot.com",
            messagingSenderId: "970919107663",
            appId: "1:970919107663:web:ba21a9d0f4b969c8891e3a",
            measurementId: "G-PZXBK68KCM"
          };
          // Initialize Firebase
          if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
         }
              // Initialize Firebase
    }
    render() {
        return(
            <Splash/>
        );
    }

    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        User.phone =  await AsyncStorage.getItem('@MyApp2_key');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(User.phone ? 'Home' : 'Login');
        
      };
      
    }


const  badgeCount = 3
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        
        Home: { screen: Home,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>
                    ),  
                    
            }  
        },  
        HoatDong: { screen: MainComponent,  
            navigationOptions:{  
                tabBarLabel:'Hoạt động',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-journal'}/>  
                    </View>),  
                
            }  
        },  
        Mails: { screen: DetailComponent,  
            navigationOptions:{  
                tabBarLabel:'Hộp thư',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-mail'}/>  
                        {badgeCount > 0 && (
                        <View
                            style={{
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                            </Text>
                        </View>
                        )}
                    </View>),  
               
            }  
        },  
        Account: {  
            screen: ThirdComponent,  
            navigationOptions:{  
                tabBarLabel:'Tài khoản',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                    </View>),  
            }  
        },  
     
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#008000',  
      inactiveColor: '#a9a9a9',  
      barStyle: { backgroundColor: '#ffffff' },  
    },  
);  
  


const Appnavigator2= createStackNavigator(
    {
        AuthLoading:{screen:Main, navigationOptions: {
            header:null,
            backgroundColor:"white"    
        }},
        Login:{
            screen:Login, navigationOptions: {
                header:null,
                backgroundColor:"white"    
            }
        }, 
        Home: {screen: TabNavigator,
        navigationOptions:{
          header:null,
        }
        },
        Search:{
            screen: Search, navigationOptions: {
                header:null,
                backgroundColor:"white"    
            }
        },

        ListProduct:{
            screen:ListProduct, navigationOptions:{
                header:null,
                headerTitle:"Kết Quả Tìm Kiếm",
                
            }
        },
        Details:{
            screen:Details, navigationOptions:{
                header:null,
            }
        },
        SeeMore: {screen:SeeMore, navigationOptions:{
            header:null,
        }},
        Oders: {screen:Oders, navigationOptions:{
            header:null,
        }},
        CartL: {screen:Cart, navigationOptions:{
            header:null,
        }},
        History: {screen:History, navigationOptions:{
            header:null,
        }},
        OderDetails: {screen:OderDetails, navigationOptions:{
            header:null,
        }},
        UserDetails: {screen:UserDetails, navigationOptions:{
            header:null,
        }},
        MainSeller: {screen:MainSeller, navigationOptions:{
            
        }},
        SellerProduct: {screen:SellerProduct, navigationOptions:{
            
        }},
        SellerCarDetails: {screen:CarDetails, navigationOptions:{
            
        }},
        SellerEditImages: {screen:Editimage, navigationOptions:{
            
        }},
        SellerEditInfo: {screen:SellerEditInfo, navigationOptions:{
            
        }},
        SellerCreateNewCar: {screen:SellerCreateNewCar, navigationOptions:{
            header: null,
            
        }},
        SellerRequest: {screen:SellerRequest, navigationOptions:{
            
        }},
        SellerRequestDetails: {screen:SellerDetailsRequest, navigationOptions:{
            header: null,
        }},
        ChatScreens: {screen:ChatScreens, navigationOptions:{
        }},
        ViewUserInfo: {screen:ViewUserInfo, navigationOptions:{
        }},
        Te: {screen:Te, navigationOptions:{
        }},
        block: {screen: Block},
    },
    {
        initialRouteName: 'AuthLoading',
    },

  );

 


export default createAppContainer(Appnavigator2)