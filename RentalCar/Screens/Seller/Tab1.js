import React, { Component } from 'react';
import {
    Text, View,Image, BackHandler, TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';

export default class Tab1 extends Component {   
  

    render() {   
      return(
        <View style={{paddingTop:200,height:130, width:130, marginLeft:20, borderWidth: 0.5, borderColor: '#dddddd'}}>
            <Text>Tab1</Text>

            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack();
            }}>
              <Text>ádsad</Text>
            </TouchableOpacity>
      </View>
      );
    }
}