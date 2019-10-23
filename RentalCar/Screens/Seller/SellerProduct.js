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
  StyleSheet,
  FlatList,
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
  ScrollableTab,
} from 'native-base';
import Head from '../Components/BigHeader';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import {navi} from 'react-navigation';

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
      Mail: 1,
      obj: [],
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Xe của tôi',
    headerTitleStyle: {
      paddingTop: 20,
      fontSize: 22,
      textAlign: 'center',
      flexGrow: 0.76,
      alignSelf: 'center',
      color: 'black',
    },
    headerStyle: {
      backgroundColor: 'white',
      height: 90,
      borderBottomWidth:0,
      borderBottomColor:'white',
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowColor :'white',
      shadowRadius: 0,
      elevation: 0
      
    },
    headerLeft: (
      <Icon
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          fontWeight: 'bold',
          color: 'black',
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
    this._GetCar();
   
  }
  _GetCar = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch(
      HostName +
        'api/SellerCar/' +
        value +
        '?Loai=' +
        this.props.navigation.state.params.LoaiXe,
    )
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          isLoadding: false,
        });
        if (this.state.obj.length === 0) {
          this.setState({
            Nodata: true,
          });
        } else {
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  _renderitem = ({item}) => {
    const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginLeft: 5,
        }}>
        <Image
          style={styles.imageThumbnail}
          source={{uri: WebHost + item.hinh}}
        />
        <Text style={styles.Carname}>{item.tenxe}</Text>
      </View>
    );
  };

  render() {
    if (this.state.isLoadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1, margin: 5}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } else if (this.state.Nodata) {
      return (
        <Container>
          <StatusBar
            barStyle="dark-content"
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
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.container}>
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={{borderBottomWidth: 2.5, borderBottomColor:'green', borderTopWidth:0}} style={{borderTopColor:'white', borderTopWidth:0}}>
            <Tab
                heading="Tất Cả"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.obj}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Hoạt động"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.obj}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Đang khoá"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.obj}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
              <Tab
                heading="Đang thuê"
                tabStyle={{backgroundColor: 'white'}}
                textStyle={{color: 'black'}}
                activeTabStyle={{backgroundColor: 'white'}}
                activeTextStyle={{color: 'green', fontWeight: 'bold'}}>
                <View style={{margin: 4, marginTop: 20}}>
                  <FlatList
                    data={this.state.obj}
                    numColumns={2}
                    renderItem={this._renderitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={() =>
                      Math.random()
                        .toString(36)
                        .substr(2, 9)
                    }></FlatList>
                </View>
              </Tab>
            </Tabs>


            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: '#008000',
                height: 65,
                width: 65,
                marginBottom: 30,
                borderRadius: 40,
              }}
              position="bottomRight"
              onPress={() => this.setState({})}>
              <Icon name="ios-add" size={60} />
            </Fab>
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
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 2 - 50,
    width: width / 2 - 15,
    borderRadius: 5,
    marginTop: 10,
  },
  Carname: {
    fontSize: 16,
    fontWeight: '300',
    color: 'gray',
    marginLeft: width / 8.3,
  },
});
