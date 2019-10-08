import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    Text, View
} from 'react-native';

 
export default class MainComponent extends Component {    
    static navigationOptions = {
        title: 'main',
      };
    render() {   
        const {navigate} = this.props.navigation;    
        const {navigation}=this.props;    
        let dataSendToDetail = {
            name: "Star Wars",
            releaseYear: 1977
        };    
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'dodgerblue',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
          
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Main Screen
                </Text>   
                <Button
                    containerStyle={{ padding: 10, margin: 20, width: 200, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={() => {
                        navigation.navigate("DetailScreen",{name:"name",releaseYear:"2014"});
                    }}>
                    Navigate to Detail
                </Button>   
                <Button
                    containerStyle={{ padding: 10, margin: 20, width: 200, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={() => {
                        navigation.navigate("ThirdScreen");
                    }}>
                    Navigate to Third
                </Button>     

                <Button
                    containerStyle={{ padding: 10, margin: 20, width: 200, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}>
                    Home
                </Button>                         
            </View>
            
        );
    }
}