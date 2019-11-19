import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Fab ,Card} from 'native-base';
import {StyleSheet,BackHandler, Image, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Headered from '../Components/Header';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
export default class ListAvatarExample extends Component {
  constructor(props){
    super(props);
    this.state = {
        IsData:false,
        IsLoadding: true,
        visible: false,

    }
}
componentDidMount()
{
    this._GetAllcart();
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

}


componentWillUnmount() {
this.backHandler.remove()
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
    let newDate = Moment().format(''+item.ngayLap+'DD-MM-YYYY');
    return (
    <ListItem avatar style={{paddingTop:20}} 
    onPress={() => this.props.navigation.navigate('OderDetails',{maxe: item.maXe, mahd: item.id})}>
      <Left>
           <Thumbnail style={{backgroundColor:'yellow'}} source={require('../images/backgroud/motoDraw.png')} />
            </Left>
            <Body>
              <Text style={styles.TextHeader}>{item.tenXe}</Text>
              <Text note>{item.diaChi}</Text>
              </Body>
            <Right style={{paddingTop:10}}>
              <Text note style={{paddingTop:10}}>{item.ngayLap.toString().substr(0, 10)+', '+item.ngayLap.toString().substr(11,5)}</Text>
           </Right>
     </ListItem>
       
    )
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
              <Headered Titile='Lịch sử hoạt động'/>
              <View>
         <Image style={{justifyContent:'center', position:'absolute', width:width, height:200, marginTop:150, backgroundColor:'transparent'}} 
        source={require('../images/backgroud/poro.png')}> 

         </Image>
          <Text style={{marginTop:400, fontSize:20, fontWeight:'bold', textAlign:"center",color:'gray'}}>Opp!{"\n"} Không tìm thấy kết quả nào   </Text>
        </View>
        </View>
      </Container>
      )
    }
    return (
      <Container>

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>
              <View style={styles.Thumbnail}>
              <ImageBackground style={styles.Thumbnail} source={require('../images/backgroud/white.jpg')}>
                <View
                  style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  paddingTop:20,
                  justifyContent:'center'
                  }}>
              <View style={{flex: 0.1}}>
              <TouchableOpacity onPress={() => {
                              navigation.goBack()
                          }}>
                    <Icon style={{paddingLeft:20, paddingTop:20, fontWeight:'bold'}} name='ios-arrow-back' size={30}/>
                  </TouchableOpacity>
              </View>
              <View style={{flex: 0.9}}>
               <Text style= {{fontSize:20, paddingTop:20, paddingLeft:40,}}>Lịch sử hoạt động</Text>
              
              </View>
          </View>
              </ImageBackground>
              <View style={{height:0.8, backgroundColor:'gray'}}>
              </View>
              </View>
              <Content style={{paddingTop:10}}>
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
      fontWeight:'bold',
      fontSize:18,
      fontFamily:'time new roman',
      },
      TextCardItem : {
        fontSize :18,
        marginTop:2
      }
})