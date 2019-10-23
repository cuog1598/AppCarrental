import React, { Component } from 'react';
import {
    Text, View,Image, BackHandler
} from 'react-native';

export default class Tab2 extends Component {   
  

    render() {   
      return(
        <View style={{height:130, width:130, marginLeft:20, borderWidth: 0.5, borderColor: '#dddddd'}}>
            <Text>Tab2</Text>
      </View>
      );
    }
}