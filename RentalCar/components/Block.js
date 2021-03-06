import React, { Component } from 'react';
import {
    Text, View,Image, BackHandler, TouchableOpacity
} from 'react-native';

export default class MainComponent extends Component {   
  

    render() {   
      return(
        <View style={{height:130, width:130, marginLeft:20, borderWidth: 0.5, borderColor: '#dddddd'}}>
          
        <View style={{flex:2}}>
            <Image source={this.props.imageURI}
            style={{flex:1, width:null, height:null, resizeMode:'cover'}}
            />
        </View>
        <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
            <Text>{this.props.Name}</Text>
        </View>
        <View style={{flex:1,paddingLeft:20, paddingTop:10}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>quay lại</Text>

          </TouchableOpacity>
        </View>
      </View>
      );
    }
}