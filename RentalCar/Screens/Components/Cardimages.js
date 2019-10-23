import React, { Component } from 'react';
import {Card, CardItem} from 'native-base';
import { Image, View,Dimensions} from 'react-native'

export default class BigHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
}

  render() {
    return (
        <View style={{padding: 10}}>
        <Card transparent>
          <CardItem cardBody>
            <Image
              source={this.props.ImageUrl}
              style={{
                height: 200,
                width: null,
                flex: 1,
                borderRadius: 12,
              }}
            />
          </CardItem>
        </Card>
      </View>
        
    );
  }
}
const {height,width}= Dimensions.get('window')



