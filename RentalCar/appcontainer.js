
import MainComponent from './components/MainComponent';
import DetailComponent from './components/DetailComponent';
import ThirdComponent from './components/ThirdComponent';
import Login from './components/Login';
import Home from './Screens/Home';
import Search from './Screens/Product/Search';
import ListProduct from './Screens/Product/ListProduct';
import Details from './Screens/Product/Details';
import SeeMore from './Screens/Product/Seemore';
import Oders from './Screens/Product/Oders'
//Screen names

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  

import Icon from 'react-native-vector-icons/Ionicons';  
import Block from './components/Block';

import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  




const customTextButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998">
      <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
        Login with Facebook
      </Text>
    </Icon.Button>
  );
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
});  
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: Home,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Profile: { screen: MainComponent,  
            navigationOptions:{  
                tabBarLabel:'Profile',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                    </View>),  
                
            }  
        },  
        Image: { screen: DetailComponent,  
            navigationOptions:{  
                tabBarLabel:'History',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
                    </View>),  
               
            }  
        },  
        Cart: {  
            screen: ThirdComponent,  
            navigationOptions:{  
                tabBarLabel:'Cart',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
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
       // Login:{screen:Login,
      //      navigationOptions:{
     //         header:null,
     //       }
    //    },
            
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
        block: {screen: Block},
    },
    {
    },

  );

export default createAppContainer(Appnavigator2)