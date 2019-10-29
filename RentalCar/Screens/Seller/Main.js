import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  HeaderButtons,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Fab,
  Tab,
  Tabs,
  TabHeading,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
} from 'native-base';
import Head from '../Components/BigHeader';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export const CustomNavButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="ios-arrow-back" size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      Nodata: false,
      isLoadding: true,
      Mail: 0,
      Cart : []
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Seller Center',
    headerTitleStyle: {
      paddingTop: 20,
      fontSize: 22,
      textAlign: 'center',
      flexGrow: 0.76,
      alignSelf: 'center',
      color: 'white',
    },
    headerStyle: {
      backgroundColor: '#32cd32',
      height: 90,
    },
    headerLeft: (
      <Icon
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          fontWeight: 'bold',
          color: 'white',
        }}
        name="ios-arrow-back"
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
          this.setState({
              isLoadding :true,
          })
      this._GetAllcart();
      },
    );
 
  }
  componentWillUnmount() {
    this.backHandler.remove();
    this.willFocusSubscription.remove();      
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  _GetAllcart = async () => {
    const value =  await AsyncStorage.getItem('@MyApp2_key');
    fetch(HostName+'api/getNotifical/'+value)
      .then((response) => response.json())
      .then((resopnseJson) => {
          this.setState ({
            obj: resopnseJson,
            isLoadding:false
          })
      if(this.state.Cart.length=== 0)
      {
        this.setState ({
          Mail : this.state.obj.length
        })
      }
      else{}
      })
      .catch((error) => {
          alert(error);
      });
  }
  render() {
    if (this.state.isLoadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } else if (this.state.Nodata) {
      return (
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={{flex: 1}}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: '#5067FF',
                height: 80,
                width: 80,
                marginBottom: 30,
                borderRadius: 40,
              }}
              position="bottomRight"
              onPress={() => this.setState({active: !this.state.active})}>
              <Icon name="ios-add" size={40} />
            </Fab>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-timer" size={200} style={{color: 'gray'}} />
              <Text style={{fontSize: 16}}>
                bạn Chưa đăng kí bất kì sản phẩm nào!
              </Text>
            </View>
          </View>
        </Container>
      );
    } else {
      return (
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={{flex: 1}}>
            <View style={styles.BoderView}>
              <View style={styles.ItemView}>
                <View style={styles.IconView}>
                  <Icon
                    size={width * 0.2}
                    name={'md-bicycle'}
                    style={{color: '#ff6347'}}
                    onPress={() => {
                      this.props.navigation.navigate("SellerProduct", {LoaiXe : "1"});
                  }}
                  />
                </View>
                <Text style={styles.IconText}>Xe máy</Text>
              </View>

              <View style={styles.ItemView}>
                <View style={styles.IconView}>
                  <Icon
                    size={width * 0.2}
                    name={'md-car'}
                    style={{color: 'green'}}
                    onPress={() => {
                      this.props.navigation.navigate("SellerProduct", {LoaiXe : "2"});
                  }}
                  />
                </View>
                <Text style={styles.IconText}>Xe Hơi</Text>
              </View>
              <View style={styles.ItemView}>
                <View style={styles.IconView}>
                  <Icon
                    size={width * 0.2}
                    name={'md-notifications-outline'}
                    style={{color: '#daa520'}}
                    onPress= {() => {
                      this.props.navigation.navigate("SellerRequest")
                    }}
                  />
                  {this.state.Mail > 0 && (
                    <View style={styles.Badge}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {this.state.Mail}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.IconText}>Thông báo</Text>

              </View>
            </View>
            <View style={styles.BoderView}>
              <View style={styles.ItemView}>
                <View style={styles.IconView}>
                  <Icon
                    size={width * 0.2}
                    name={'md-bookmarks'}
                    style={{color: '#00ced1'}}
                  />
                </View>
                <Text style={styles.IconText}>Lịch sử</Text>
              </View>
              
              <View style={styles.ItemView}>
                <View style={styles.IconView}>
                  <Icon
                    size={width * 0.2}
                    name={'ios-calendar'}
                    style={{color: '#daa520'}}
                  />
                  {this.state.Mail > 0 && (
                    <View style={styles.Badge}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {this.state.Mail}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.IconText}>Tin nhắn</Text>

              </View>
              <View style={styles.ItemView}>
              </View>
            </View>
          </View>
        </Container>
      );
    }
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BoderView: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  ItemView: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconView: {
    height: width * 0.25,
    width: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'gray',
    borderRadius: 12,
  },
  Badge: {
    position: 'absolute',
    right: 8,
    top: 16,
    backgroundColor: 'red',
    borderRadius: 25,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconText :{
    fontSize:16,
    color:'gray'
  }
});
