import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button,  Left, Body, Right,Title ,Icon} from 'native-base';
import {
    Text, View,Image,StyleSheet,ScrollView,TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class envent extends Component {    

    render() {   
      return(

          <View>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomWidth:0,borderTopColor:"white"}}>

    <Card style={styles.imagescroolview}>
                 <View style={{height:234}}>
                <Image style={styles.imagesr} source={require('./images/backgroud/a.jpg')}
                    />
                </View>
                <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
                    <Text style={{fontSize:22, fontWeight:"bold"}}>Ưu đãi cho đợt đặt đầu tiên</Text>
                    <Text></Text>
                    <Text>Chỉ trên RentalCar bạn có thể yên tâm với dịch vụ</Text>

                    <Text style={{color:"blue", marginTop:10}}>Đặt ngay</Text>
                </View>
                </Card>
                    <Card style={styles.imagescroolview}>
                    <View style={{height:234}}>
                <Image style={styles.imagesr} source={require('./images/backgroud/b.jpg')}
                    />
                </View>
                <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
                    <Text style={{fontSize:22, fontWeight:"bold"}}>Ưu đãi cho đợt đặt đầu tiên</Text>
                    <Text></Text>
                    <Text>Chỉ trên RentalCar bạn có thể yên tâm với dịch vụ</Text>

                    <Text style={{color:"blue", marginTop:10}}>Đặt ngay</Text>
                </View>
                </Card>


                <Card style={styles.imagescroolview}>
                <View style={{height:234}}>
                <Image style={styles.imagesr} source={require('./images/backgroud/c.jpg')}
                    />
                </View>
                <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
                    <Text style={{fontSize:22, fontWeight:"bold"}}>Ưu đãi cho đợt đặt đầu tiên</Text>
                    <Text></Text>
                    <Text>Chỉ trên RentalCar bạn có thể yên tâm với dịch vụ</Text>

                    <Text style={{color:"blue", marginTop:10}}>Đặt ngay</Text>
                </View>
                </Card>


                <Card style={styles.imagescroolview}>
                <View style={{height:234}}>
                <Image style={styles.imagesr} source={require('./images/backgroud/d.jpg')}
                    />
                </View>
                <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
                    <Text style={{fontSize:22, fontWeight:"bold"}}>Ưu đãi cho đợt đặt đầu tiên</Text>
                    <Text></Text>
                    <Text>Chỉ trên RentalCar bạn có thể yên tâm với dịch vụ</Text>

                    <Text style={{color:"blue", marginTop:10}}>Đặt ngay</Text>
                </View>
                </Card>

                <Card style={styles.imagescroolview}>
                  <View style={{height:234}}>
                   <Image style={styles.imagesr} source={require('./images/backgroud/dep.jpg')}
                    />
                </View>
                  <View style={{flex:1,paddingLeft:20, paddingTop:10, paddingRight:5}}>
                    <Text style={{fontSize:22, fontWeight:"bold", marginRight:5}}>Ưu đãi cho đơn hàng mới</Text>
                    <Text></Text>
                    <Text>Chỉ trên RentalCar bạn có thể yên tâm với dịch vụ</Text>
                    
                    <Text style={{color:"blue", marginTop:10}}>Đặt ngay</Text>
                </View>
                </Card>

                 <Card transparent>
            <CardItem  style={{alignContent:"center",justifyContent:"center", borderColor:"white"}}>

            <TouchableOpacity>

              <Text style={{paddingTop:150, paddingRight:5,fontSize:20, color:"blue"}}>Xem thêm</Text>
                <Icon size={40} color={"blue"} name="arrow-forward" />
            </TouchableOpacity>

             </CardItem>

           </Card>
                
        </ScrollView>

        </View>
            
            
      );
    }
}

const styles = StyleSheet.create({
    imagescroolview:{
        height:410, 
        borderRadius:20,
        borderWidth:1,
        width:260, 
        marginLeft:25, 
        borderColor: '#dddddd', 
        backgroundColor:"white"
    }
    ,
    imagesr:{
        flex:1,
        width:null, 
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        resizeMode:'cover',

    }

})