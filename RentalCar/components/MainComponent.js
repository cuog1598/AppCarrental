import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Fab ,Card} from 'native-base';
import {StyleSheet,BackHandler, Image, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Headered from '../Screens/Components/BigHeader'
import {HostName} from '../Screens/Models.json'
export default class ListAvatarExample extends Component {
  constructor(props){
    super(props);
    this.state = {
        IsData:false,
        IsLoadding: true,
        visible: false,
        thang : '',
    }
}
componentDidMount()
{
    this._GetAllcart();
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
    const thang = this.state;
    const day =new Date();
    let newDate = Moment().format(''+item.ngayLap+'DD-MM-YYYY');
    const dem= day.toString().substr(4,3);
   
        return (
            <View>
                <ListItem avatar style={{paddingTop:20, height:100}} 
                onPress={() => this.props.navigation.navigate('OderDetails',{maxe: item.maXe, mahd: item.id})}>
                
                <Left>
                    <Thumbnail style={{backgroundColor:'yellow'}} source={require('../Screens/images/backgroud/motoDraw.png')} />
                        </Left>
                        <Body>
                        <Text style={styles.TextHeader}>{item.tenXe}</Text>
                        <Text note>{item.diaChi}</Text>
                        </Body>
                        <Right style={{justifyContent:'flex-end', marginBottom:7}}>
                        <Text note style={{paddingTop:10}}>{item.ngayLap.toString().substr(0, 10)+', '+item.ngayLap.toString().substr(11,5)}</Text>
                    </Right>
                </ListItem>
            </View>
        );
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
            <Headered Titile='Hoạt động gần đây'/>
        </View>
      </Container>
      )
    }
    return (
      <Container>

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>
            <Headered Titile='Hoạt động gần đây'/>
              <Content style={{paddingTop:10, marginBottom:20}}>
              <List>
            <Text style={{paddingLeft:10, fontSize:18}}>Tháng này</Text>

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
      fontWeight:'bold',
      fontSize:18,
      fontFamily:'time new roman',
      },
      TextCardItem : {
        fontSize :18,
        marginTop:2
      }
})