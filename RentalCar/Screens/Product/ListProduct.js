import React, { Component } from 'react';
import { Image ,StatusBar, ScrollView,Dimensions,StyleSheet,ImageBackground,TouchableOpacity,SafeAreaView, FlatList,ActivityIndicator} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,  Left, Body, Right, View } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';  
const a= '../images/backgroud/white.jpg'



export default class CardImageExample extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          isloadding:true,
          obj:[],
          isData:true,
        };
      }


    componentDidMount(){
        this._fetchUsers();
    }

    _fetchUsers = () => {
        fetch('http://10.0.2.2:45455/api/getxe/'+this.props.navigation.state.params.key)
          .then((response) => response.json())
          .then((resopnseJson) => {
           
              this.setState ({
                obj: resopnseJson,
                isloadding:false,
              })
            if(this.state.obj.length >0)
            {
              this.setState ({
                isData:false,
              })
            }
            else
            {
              this.setState ({
                isData:true,
              })
            }
          })
          .catch((error) => {
              console.error(error);
          });
    }
    
    thisrender(){
      <TouchableOpacity onPress={() => {
        navigation.goBack()
    }}>
        
      </TouchableOpacity>
    }

  _renderitem= ({item}) => {
    const {navigate} = this.props.navigation;
      return (
      <View style={{ height:340,marginBottom:5, borderBottomColor:'gray', borderBottomWidth:0.4}}>
        <TouchableOpacity onPress={() => navigate('Details',{idcar : item.id, manguoidang: item.maNguoiDang,key:this.props.navigation.key})}>

        <Card transparent style={{margin:5, borderBottomColor:'black'}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
              <Body>
                <Text>{item.tenxe}</Text>
                <Text note>{item.diachi}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: 'http://10.0.2.2:45457'+item.hinh}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          
        </Card>
        </TouchableOpacity>

        </View>
    

      )
  }

  render() {
    const {navigation}=this.props; 
    const {navigate} = this.props.navigation;
    if(this.state.isloadding)
    {
      return(
        <View style={{justifyContent:"center", flex:1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop= {80}/>
        </View>
      )
    }
    else
    if(this.state.isData)
    {
      return(
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.Thumbnail}>
            <ImageBackground style={styles.Thumbnail} source={require(a)}>
              <View>
          

          <View
            style={{
            flexDirection: 'row',
            paddingLeft: 10
            }}>
              <View style={{flex: 0.7}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
                  <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                    <Icon style={{paddingLeft:20, paddingTop:10,fontWeight:'bold'}} name='ios-arrow-back'  size={30}/>
                  </TouchableOpacity>
                    <Text style= {{fontSize:20, textAlign:"center", paddingTop:10, paddingLeft:30}}>Kết Quả Tìm Kiếm</Text>

                    
                </ScrollView>
              </View>
              <View style={{flex: 0.3}} horizontal={true}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
                <TouchableOpacity onPress={()=>{
                  navigate('CartL')
                }}>
                 <Icon style={{paddingLeft:10, paddingTop:10}} name='ios-heart-empty' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon style={{paddingLeft:20, paddingTop:10}} name='md-book' size={30} />
                </TouchableOpacity>
              </ScrollView>
              </View>

          </View>
          
        </View>
         </ImageBackground>
         <View style={{height:0.8, backgroundColor:'gray'}}>
          </View>
        </View>
        </View>
        <View>
         <Image style={{justifyContent:'center', position:'absolute', width:width, height:200, marginTop:150, backgroundColor:'transparent'}} 
        source={require('../images/backgroud/poro.png')}> 

         </Image>
          <Text style={{marginTop:400, fontSize:20, fontWeight:'bold', textAlign:"center",color:'gray'}}>Opp!{"\n"} Không tìm thấy kết quả nào   </Text>

        </View>
        
      </SafeAreaView>
      );
    }
    else {

    return (
      
        <SafeAreaView>

        <View style={styles.container}>
        <View style={styles.Thumbnail}>
        <ImageBackground style={styles.Thumbnail} source={require(a)}>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop:20}}>
            <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
              <Icon style={{paddingLeft:20, paddingTop:10, fontWeight:'bold'}} name='ios-arrow-back' size={30} />
            </TouchableOpacity>
            <Text style= {{fontSize:20, textAlign:"center", paddingTop:10, paddingLeft:30}}>Kết Quả Tìm Kiếm</Text>
          </ScrollView>
        
        </View>
        </ImageBackground>
        <View style={{height:0.8, backgroundColor:'gray'}}>
          </View>
        </View>
          
      </View>
        <FlatList data={this.state.obj}
          renderItem={this._renderitem}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        >
        </FlatList>
     
        </SafeAreaView>

      
    );
  }

  }
}

const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'transparent',
    height:85,
},
    Thumbnail:{
        flex:1,
        left: 0,
        right: 0,
        width: width,
    
    },
}
)