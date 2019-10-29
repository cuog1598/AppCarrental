import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Fab ,Card} from 'native-base';
import {StyleSheet,BackHandler, Image, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Headered from '../Components/BigHeader';

import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
var date = "0"

export default class RequestList extends Component {
  constructor(props){
    super(props);
    this.state = {
        IsData:false,
        IsLoadding: true,
        visible: false,
        thang : '',
        date : '1'
    }
}
static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Quản lý yêu cầu thuê xe',
    headerTitleStyle: {
      paddingTop: 20,
      fontSize: 22,
      textAlign: 'center',
      flexGrow: 0.76,
      alignSelf: 'center',
      color: 'black',
    },
    headerStyle: {
      backgroundColor: 'white',
      height: 90,
      borderBottomWidth: 0,
      borderBottomColor: 'white',
    },
    headerLeft: (
      <Icon
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          fontWeight: 'bold',
          color: 'black',
        }}
        name="ios-arrow-back"
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    headerRight: (
      <TouchableOpacity onPress={ async () => {
        const value =  await AsyncStorage.getItem('@MyApp2_key');
        fetch(HostName + 'api/Oderstatus/' + value, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 1,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.title == 'Not Found') {
              alert('Không có mục nào để xoá');
            } else {
              navigation.goBack();
            }
          })
          .catch(error => {
            alert(error);
          });
      }}>
 <Icon
        style={{
          paddingRight: 20,
          paddingTop: 20,
          fontWeight: 'bold',
          color: 'black',
        }}
        name="ios-trash"
        size={30}
        
      />
      </TouchableOpacity>
     
    ),
  });

componentDidMount()
{
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
        this.setState({
            IsLoadding :true,
        })
    this._GetAllcart();
    },
  );

}


componentWillUnmount() {
this.backHandler.remove()
this.willFocusSubscription.remove();      

}

handleBackPress = () => {
this.props.navigation.goBack(); // works best when the goBack is async
return true;
}

  _GetAllcart = async () => {
    const value =  await AsyncStorage.getItem('@MyApp2_key');
    fetch(HostName+'api/GetOderPerson/'+value)
      .then((response) => response.json())
      .then((resopnseJson) => {
          this.setState ({
            obj: resopnseJson,
            IsLoadding:false
          })
      if(this.state.obj.length=== 0)
      {
        this.setState ({
          IsData:true
        })
      }
      else{}
      })
      .catch((error) => {
          console.error(error);
      });
  }


  _renderitem= ({item}) => {
    if(date != item.ngayLap.toString().substr(5,2))
    {
        date = item.ngayLap.toString().substr(5,2);
        return(
            <View>
                <Text style={{paddingLeft:10, fontSize:18}}>Tháng {date}</Text>
            <ListItem avatar style={{paddingTop:20, height:100}} 
            onPress={() => this.props.navigation.navigate('SellerRequestDetails',{maxe: item.maXe, mahd: item.id})}>
            <Left>
                
                <Thumbnail style={{backgroundColor:'yellow'}} source={require('../images/backgroud/motoDraw.png')} />
                    </Left>
                    <Body>
                    {item.readed == true && (
                    <Text style={{fontSize:18, paddingTop:1}}>{item.tenXe}</Text>
                    ) } 
                        {item.readed == false && (
                    <Text style={{fontSize:18, paddingTop:1, fontWeight:'bold'}}>{item.tenXe}</Text>
                            
                        ) } 
                    <Text note>{item.diaChi}</Text>
                    </Body>
                    <Right style={{justifyContent:'flex-end', marginBottom:7}}>
                    <Text note style={{paddingTop:10}}>{item.ngayLap.toString().substr(0, 10)+', '+item.ngayLap.toString().substr(11,5)}</Text>
                </Right>
            </ListItem>
        </View>
        )
    }
    else
    {
        return(
            <View>
            <ListItem avatar style={{paddingTop:20, height:100}} 
             onPress={() => this.props.navigation.navigate('SellerRequestDetails',{maxe: item.maXe, mahd: item.id})}>
            <Left>
                
                <Thumbnail style={{backgroundColor:'yellow'}} source={require('../images/backgroud/motoDraw.png')} />
                    </Left>
                    <Body>
                        {item.readed && (
                    <Text style={{fontSize:18, paddingTop:1}}>{item.tenXe}</Text>
                            
                        ) } 
                        {!item.readed && (
                    <Text style={{fontSize:18, paddingTop:1, fontWeight:'bold'}}>{item.tenXe}</Text>
                            
                        ) } 
                    <Text note>{item.diaChi}</Text>
                    </Body>
                    <Right style={{justifyContent:'flex-end', marginBottom:7}}>
                    <Text note style={{paddingTop:10}}>{item.ngayLap.toString().substr(0, 10)+', '+item.ngayLap.toString().substr(11,5)}</Text>
                </Right>
            </ListItem>
        </View>
        )
    }
   
}

  render() {
    const {navigation}=this.props; 
    if(this.state.IsLoadding)
    {
      return(
        <View style={{justifyContent:"center", flex:1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop= {80}/>
        </View>
      )
    }
    else
    if(this.state.IsData)
    {
      return(
        <Container>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text>
                không có yêu cầu nào gần đây
              </Text>
              </View>
              
        </View>
      </Container>
      )
    }
    return (
      <Container>

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>
              <Content style={{paddingTop:10, marginBottom:20}}>
              <List>
           

                <FlatList 
                  data={this.state.obj}
                  renderItem={this._renderitem}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={() => Math.random().toString(36).substr(2, 9)}
                >
                </FlatList>
            </List>

        </Content>
        </View>
      </Container>
    );
  }
}

const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex:1
      },
    Thumbnail:{
        height:100,
        left: 0,
        right: 0,
        width: width,
        borderBottomColor:'gray',
        borderBottomWidth:0.4,
    },
    TextHeader : {
      paddingTop:1,
      fontSize:18,
      fontFamily:'time new roman',
      },
      TextCardItem : {
        fontSize :18,
        marginTop:2
      }
})