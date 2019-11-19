import React, { Component } from 'react';
import {
    Text, View,Image, BackHandler,
    TouchableOpacity
} from 'react-native';

export default class Tab2 extends Component {   
  
  _subStr = (str) => {
    let chuoi = str.toString();
    let s = chuoi.length %3;
    let result = '';
    if(s!=0)
    {
      result += chuoi.substr(0,s)
    }
    else
    {}
    let cat = s;
    let dem= 3;
    while(cat<chuoi.length) 
    {
      if(cat == 0)
      {
        result += chuoi.substr(cat,dem);
        cat+=3;
      }
      else
      {
        result += ','+chuoi.substr(cat,dem);
        cat+=3;
      }
    }
    return result
  }
    render() {   
      return(
        <View style={{height:130, width:130, marginLeft:20, borderWidth: 0.5, borderColor: '#dddddd',justifyContent:'center'}}>
            <TouchableOpacity onPress={ () => {
              this._subStr(123456789)
            }}>
            <Text>{this._subStr(1234567890)}</Text>
            </TouchableOpacity>

      </View>
      );
    }
}