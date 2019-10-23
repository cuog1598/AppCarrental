import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Fab,
  Card,
} from 'native-base';
import {
  StyleSheet,
  Image,
  BackHandler,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TenXe: '',
      Gia: '',
      DiaChi: '',
      MaXe: '',
      MaNguoiDang: '',
      id: '',
      obj: [],
      IsData: false,
      IsLoadding: true,
      visible: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );

    this._GetAllcart();
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  handleButtonPress = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.hideToast();
      },
    );
  };
  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  _GetAllcart = async () => {
    const value = await AsyncStorage.getItem('@MyApp2_key');
    fetch('http://10.0.2.2:45455/api/CartPerUser/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
          IsLoadding: false,
        });
        if (this.state.obj.length === 0) {
          this.setState({
            IsData: true,
          });
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _renderitem = ({item}) => {
    return (
      <Content>
        <ListItem
          thumbnail
          style={{marginTop: 10, height: 120}}
          onPress={() =>
            this.props.navigation.navigate('Details', {
              idcar: item.maxe,
              manguoidang: item.manguoidang,
              key: this.props.navigation.key,
            })
          }>
          <Left>
            <Thumbnail
              square
              source={{uri: 'http://10.0.2.2:45457' + item.images}}
              style={{height: 80, width: 80}}
            />
          </Left>
          <Body>
            <Text style={styles.TextHeader}>{item.tenxe}</Text>
            <Text note numberOfLines={1} style={styles.TextCardItem}>
              {item.diaChi}
            </Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.Delete(item.id)}>
              <Icon
                style={{fontWeight: 'bold', color: 'blue'}}
                name="ios-trash"
                size={30}
              />
            </TouchableOpacity>
          </Right>
        </ListItem>
      </Content>
    );
  };

  Delete = Values => {
    this.setState({
      lazyLoad: true,
    });
    fetch('http://10.0.2.2:45455/api/Carts/' + Values, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.title == 'Not Found') {
          alert('không thành công');
        } else {
          this._GetAllcart();
          this.setState(
            {
              visible: true,
            },
            () => {
              this.hideToast();
            },
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {navigation} = this.props;
    if (this.state.IsLoadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } else if (this.state.IsData) {
      return (
        <Container>
          <Toast visible={this.state.visible} message="Xoá thành công" />

          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.container}>
            <View style={styles.Thumbnail}>
              <ImageBackground
                style={styles.Thumbnail}
                source={require('../images/backgroud/white.jpg')}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingTop: 20,
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 0.1}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <Icon
                        style={{
                          paddingLeft: 20,
                          paddingTop: 20,
                          fontWeight: 'bold',
                        }}
                        name="ios-arrow-back"
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text
                      style={{fontSize: 20, paddingTop: 20, paddingLeft: 40}}>
                      Danh sách ưa thích
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={{height: 0.8, backgroundColor: 'gray'}}></View>
            </View>
            <View>
              <Image
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  width: width,
                  height: 200,
                  marginTop: 150,
                  backgroundColor: 'transparent',
                }}
                source={require('../images/backgroud/poro.png')}></Image>
              <Text
                style={{
                  marginTop: 400,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'gray',
                }}>
                Opp!{'\n'} Không tìm thấy kết quả nào{' '}
              </Text>
            </View>
          </View>
        </Container>
      );
    }
    return (
      <Container>
        <Toast visible={this.state.visible} message="Xoá thành công" />

        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.container}>
          <View style={styles.Thumbnail}>
            <ImageBackground
              style={styles.Thumbnail}
              source={require('../images/backgroud/white.jpg')}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  paddingTop: 20,
                  justifyContent: 'center',
                }}>
                <View style={{flex: 0.1}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      style={{
                        paddingLeft: 20,
                        paddingTop: 20,
                        fontWeight: 'bold',
                      }}
                      name="ios-arrow-back"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.9}}>
                  <Text style={{fontSize: 20, paddingTop: 20, paddingLeft: 40}}>
                    Danh sách ưa thích
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <View style={{height: 0.8, backgroundColor: 'gray'}}></View>
          </View>
          <Content style={{paddingTop: 10}}>
            <List>
              <FlatList
                data={this.state.obj}
                renderItem={this._renderitem}
                showsVerticalScrollIndicator={false}
                keyExtractor={() =>
                  Math.random()
                    .toString(36)
                    .substr(2, 9)
                }></FlatList>
            </List>
          </Content>
        </View>
      </Container>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Thumbnail: {
    height: 100,
    left: 0,
    right: 0,
    width: width,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  TextHeader: {
    paddingTop: 1,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'time new roman',
  },
  TextCardItem: {
    fontSize: 18,
    marginTop: 2,
  },
});
