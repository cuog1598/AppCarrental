import React, { Component } from 'react';

import {
    BackHandler,
    StyleSheet,
    Text,
    Image,
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const { width: screenWidth } = Dimensions.get('window');
const a = '../images/backgroud/backgroud.jpg';

import { Button } from 'native-base';
import Te from '../ChatApp/Te';
export default class Seemore extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isloadding: true,
            timer: 7,
        };

      
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackPress,
        );

        this._isMounted = true;
        if(this._isMounted)
        {
         setInterval(() => {
             if (this.state.timer > 0) {
                 this.setState({ timer: this.state.timer - 1 });
             }
         }, 1000);
        }
        setTimeout(() => {
            if (this.state.timer == 0 && this._isMounted) {
                this.props.navigation.navigate('Home')
            }
        }, 8000);
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._isMounted = false;
    }

    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
    };

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image
                        style={styles.Image}
                        source={require('../images/Ok.png')}></Image>
                </View>

                <View style={styles.ViewSt}>
                    <Text style={styles.TextHeader}>
                        Yêu cầu của bạn đã được gửi thành công
              </Text>
                    <Text style={styles.TextItem}>
                        Mã yêu cầu {'#000'} Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
              </Text>
                </View>

                <View style={styles.ViewSt}>
                    <Text style={styles.TextItem}>
                        Hệ thống sẽ tự động chuyển đến trang chủ trong :
              </Text>

                    <Text style={styles.CountTimer}>{this.state.timer}</Text>

                </View>
                <View style={styles.ViewSt}>
                    <TouchableOpacity style={styles.ButtonH} onPress={() => {
                        this._isMounted = false;
                        this.setState({timer : 0})
                        this.props.navigation.goBack();
                    }}>
                        <View style={styles.Viewh}>
                            <Text style={styles.TextButton}>Quay lại</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        height: (width * 1.75) / 3,
        width: (width * 1.75) / 3,
        borderRadius: (width * 1.75) / 3,
    },
    TextItem: {
        textAlign: 'center',
        fontSize: 14,
    },
    TextHeader: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    ViewSt: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    CountTimer: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    ButtonH: {
    },
    Viewh: {
        backgroundColor: '#7b68ee',
        height: 45,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    TextButton: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'

    }
});
