import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Fab ,Card} from 'native-base';
import {StyleSheet, StatusBar, View, Text, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,ImageBackground,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';  
const a= '../images/backgroud/white.jpg'

export default class ListThumbnailExample extends Component {
  constructor(props){
    super(props);
    this.state = {
        TenXe : '',
        Gia: '',
        DiaChi: '',
        MaXe: '',
        MaNguoiDang: '',
        id:'',
        obj:[],
        IsData:false,
        IsLoadding: true,
    }
}

componentDidMount(){
  this._GetAllcart();
}

_GetAllcart = () => {
  fetch('http://10.0.2.2:45455/api/CartPerUser/1')
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
    return (
      <Content>
          <ListItem thumbnail style={{marginTop:10, height:120}} onPress={() => {
                        this.props.navigation.navigate('Cartdetails')
                    }}>
              <Left>
                <Thumbnail square source={{ uri:'http://10.0.2.2:45457'+item.images  }} style={{height:80, width:80}} />
              </Left>
              <Body>
                <Text>{item.tenxe}</Text>
                <Text note numberOfLines={1}>{item.diaChi}</Text>
              </Body>
            <Right>
            <TouchableOpacity onPress={() => {
                        alert('trash')
                    }}>
                <Icon style={{fontWeight:'bold', color:'#7cfc00'}} name='ios-trash' size={30}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
      </Content>
       
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
        <View>
          <Text>Không có kết quả trả về</Text>
        </View>
      )
    }
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>

              <View style={styles.Thumbnail}>
              <ImageBackground style={styles.Thumbnail} source={require(a)}>
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
               <Text style= {{fontSize:20, paddingTop:20, paddingLeft:40,}}>Danh sách ưa thích</Text>
              
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
  
})