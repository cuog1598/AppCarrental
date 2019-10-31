import React, { Component } from 'react';
import {StyleSheet,BackHandler, Image, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView,ToastAndroid} from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Right ,Thumbnail,Body} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';  
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';

export default class ListItemSelectedExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      Username :'',
      Pasword :'' ,
      Id : null,
    }
}
async componentDidMount()
{
  
  this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
      this._User();
    }
  );
}

componentWillUnmount() {
  this.willFocusSubscription.remove();
}
_User = async () => {
  const value = await AsyncStorage.getItem('@MyApp2_key');
  fetch('http://10.0.2.2:45455/api/Users/'+value)
    .then((response) => response.json())
    .then((resopnseJson) => {
     
        this.setState ({
          Username: resopnseJson.hoTen,
        })
    })
    .catch((error) => {
        console.error(error);
    });
}

  _EditUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyApp2_key');
      this.setState({
        Username : "Cường Nguyễn",
        Id: value,
      })
      alert(value )
    } catch(e) {
      alert("Không lưu data");
    }
  }

  _onpress= () => {
    alert(this.props.Username)
  }

  _LogOut = async () => {
    try {
      await AsyncStorage.setItem('@MyApp2_key', "")
      await AsyncStorage.setItem('@MyApp2_key_id', "");
      this.props.navigation.navigate('AuthLoading')
    } catch(e) {
      alert('erro :'  +e)
    }
    console.log('Done.')
  }
   render() {
    const {navigate} = this.props.navigation;   
    return (
      <Container>
        <ScrollView>
         <View style={styles.Thumbnail}>
            <View style={{
              flexDirection: 'row',
                paddingLeft: 10,
              paddingTop:40,
              justifyContent:'center'
                  }}>
              <View style={{flex: 0.4}}>
                  <Image style={styles.images} source={{uri: 'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/12717447_625469907606498_721627668975832331_n.jpg?_nc_cat=102&_nc_oc=AQmPHA-WM_fXvvOPcV78gnWxlnIieWeUg0fZoJLwYnHVLwIb90Hb9qa_QUq8mxdmy9E&_nc_ht=scontent.fsgn8-1.fna&oh=55dc51a389ade4abbb521ccd07ca8db9&oe=5E1A6618'}}>
                  </Image>
              </View>
              <View style={{flex: 0.6, paddingTop:8}}>
               <Text style= {{fontSize:22, paddingTop:25}}>{this.state.Username}</Text>
               <View style={{flexDirection:'row', justifyContent:'center'}}>
                 <View style={{flex:0.8}}>
                 <TouchableOpacity onPress={() => {
                        navigate("UserDetails");
                    }}>
                     <Text style={{fontSize:16, color:'#228b22'}}>Chỉnh sửa tài khoản </Text>

                   </TouchableOpacity>
                 </View>
                 <View style={{flex:0.2}}>
                   <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>  
                 </View>

               </View>
              </View>
            </View>
        </View>
          <View style={{marginTop:10}}>
            <Content>
            <List style= {{marginLeft:5}}>
              <ListItem selected >
                <Left>
                  <Text style={styles.TextCardItem}>Ưu đãi</Text>
                </Left>
                <Right>
                  <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>
                </Right>
              </ListItem >
              <ListItem style={styles.ListItem} selected onPress={() => {
                              this.props.navigation.navigate("MainSeller")
                          }}>
              <Left>
                  <Text style={styles.TextCardItem}>Quản lý xe</Text>
                </Left>
                <Right>
                 <Icon style={{paddingTop:2}}  name='ios-arrow-forward'  size={20} />
                </Right>
              </ListItem>
              <ListItem style={styles.ListItem} selected onPress= {()=> {
                this.props.navigation.navigate('Te')
              }}>
                <Left>
                  <Text style={styles.TextCardItem}>Cài đặt</Text>
                </Left>
                <Right>
                <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>  
                 </Right>
              </ListItem>
              <ListItem style={styles.ListItem} selected>
                <Left>
                  <Text style={styles.TextCardItem}>Liên hệ</Text>
                </Left>
                <Right>
                <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>  
                 </Right>
              </ListItem>
              <ListItem style={styles.ListItem} selected>
                <Left>
                  <Text style={styles.TextCardItem}>Thông tin</Text>
                </Left>
                <Right>
                <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>  
                 </Right>
              </ListItem>
              <ListItem style={styles.ListItem} selected onPress={this._LogOut}>
                <Left>
                  <Text style={styles.TextCardItem}>Đăng xuất</Text>
                </Left>
                <Right>
                <Icon style={{paddingTop:2}} name='ios-arrow-forward'  size={20}/>  
                 </Right>
              </ListItem>
              <ListItem style={styles.ListItem} selected>
              </ListItem>
            </List>
          </Content>
          </View>
      </ScrollView>
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
        height:180,
        left: 0,
        right: 0,
    },
    TextHeader : {
      paddingTop:1,
      fontWeight:'bold',
      fontSize:18,
      fontFamily:'time new roman',
      },
      TextCardItem : {
        fontSize :17,
        marginTop:2
      },
      images: {
        height:100,
        width: 100,
        borderRadius:100/2
      },
      ListItem : {
        marginTop:10,
      }
})