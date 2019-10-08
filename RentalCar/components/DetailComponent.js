import React, { Component } from 'react';
import {
    Text, View,ScrollView
} from 'react-native';
import Button from 'react-native-button';
import Horizontal from '../Screens/Components/Horizontal'
import Event from '../Screens/Envent'
export default class DetailComponent extends Component {

  
    componentDidMount(){
        
   //     console.log(`this.props.navigation = ${JSON.stringify(this.props.navigation.name)}`);
     

    }
    
    render() {        
      
        paramsFromMainScreen = this.props.navigation.state.params;
        const {navigation}=this.props;    
        return (
            <ScrollView>
            <View style={{ flex: 1, 
                    backgroundColor: 'mediumseagreen',
                    alignItems: 'center', 
                    justifyContent: 'center' }}>
                <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}>
                    This is Detail Screen
                </Text>      
                <Text>Params from Main Screen: </Text>
                <Text>Movie's name :</Text>          
                <Text>release year :</Text>
                <Button
                    containerStyle={{ padding: 10, margin: 20, width: 200, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}>
                    Navigate to Third
                </Button >    
                <Button
                    containerStyle={{ padding: 10, margin: 20, width: 200, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                    style={{ fontSize: 18, color: 'white' }}
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}>
                    Navigate to Third
                </Button >    
                <Event/> 
                <Horizontal/> 
                <Horizontal/> 
                <Horizontal/> 
                <Horizontal/> 
            </View>
            </ScrollView>
        );
    }
}