import React, { Component } from 'react';

import {TouchableOpacity,Image,ImageBackground,View,StyleSheet, Dimensions,StatusBar,SafeAreaView,TouchableHighlight,ScrollView, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';  
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,  Left, Body, Right,Title } from 'native-base';

import Envent from './Envent'



export default class MainComponent extends Component {   

      constructor(props) {
        super(props);
     
        this.state = {
          title2: 'Chúc buổi chiều vui vẻ',
          Home: true,
        };
      }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    handleBackButton = () => {
    
        BackHandler.exitApp()
        return true;
    };
    
  

     navigationOptions = {
        title: 'main',
      };

    
      onPress = () => {
        alert("thành công");
      }
    render() {   
        //send
        const {navigate} = this.props.navigation;    
        const {navigation}=this.props;    
        let dataSendToDetail = {
            name: "Star Wars",
            releaseYear: 1977
        };    
        return (
            <SafeAreaView>
          <Container>

            <View style={styles.backgroud}>
               <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent={true}/>
            <Content style={{paddingTop:0}}>
            <View>
               <ImageBackground style={styles.Thumbnail} source={require('./images/backgroud/moto.jpg')}>
                <Image style={styles.logo} source={require('./images/logo.png')}>
                </Image>
                    <Text style={styles.title}>{this.state.title2}</Text>
              </ImageBackground>
                  <Content padder style={styles.Cardtop}>
                   <Card style={{ borderRadius: 12 }}>
                    <CardItem bordered style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                       <Left style={styles.bodyleft}>
                        <Body style={styles.bodyleft}>
                            <Text style={styles.bodytext}>
                               Cho thuê xe ngay với RentalCar
                              </Text>
                            <TouchableOpacity>
                          <Text style={styles.kichhoat}>
                               Bắt đầu
                          </Text>
                           </TouchableOpacity>
                        </Body>
                        </Left>
                        <Right>
                            <Body>
                            <Thumbnail style={styles.imgtop} source={require('./images/images.jpg')}>
                            </Thumbnail>
                            </Body>
                        </Right>
                      </CardItem>
                     </Card>
                </Content>
                    </View>
                </Content>
        </View>
        </Container>

        <ScrollView>
       
        </ScrollView>
        </SafeAreaView>

        );
    }
}

const {height,width}= Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'relative'
      },
      xemay:{
        resizeMode:'cover',
        width: width/2-20 ,
        height: 150 ,
        marginRight:40
      },
    backgroud:{
        height:500,
        width:width,
        borderBottomColor:'#000000',
        borderBottomEndRadius:0.5
    },
    Cardtop :{
        flex:1,
        marginTop: 130,
        marginLeft:10,
        marginRight:8
    },
    Thumbnail:{
        position: 'absolute',
        alignItems:"center",
        height:180,
        left: 0,
        right: 0,
        width: width,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 192,
        height: 30,
        marginTop:20

    },
    title: {
        color: '#00ff7f',
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
    },

    bodyleft:{
        marginTop:8,
        width:2/3*width
    },
    bodytext:{
        fontSize:18
    }
    ,
    kichhoat:{
        color:'#4169e1',
        fontSize:22,
        paddingTop:10
    },
    imgtop:{
        height:60,
        width:100,
        paddingTop:80
    },
    imagescroolview:{
        height:450, 
        borderRadius:20,
        borderWidth:1,
        width:250, 
        marginLeft:20, 
        borderColor: '#dddddd', 
        backgroundColor:"white"
    }
    ,
    imagesr:{
        flex:1,
         width:null, 
         borderRadius:20,
        height:120, 
        resizeMode:'cover'
    }

})