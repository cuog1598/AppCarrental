import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar} from 'react-native'


export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
            <Image style={styles.logo}
                                    source={require('../images/logo.png')}>
            </Image>
               
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white'
    },

    logo: {
        width: 260,
        height: 40,
    },
})