import React, {Component} from 'react';

import {
  ListView,
  StatusBar,
  BackHandler,
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import ImagePicker from 'react-native-image-picker';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Left,
  Button,
  Footer,
  FooterTab,
  Right,
} from 'native-base';

import RNFetchBlob from 'rn-fetch-blob';
import Moment from 'moment';

const {width: screenWidth} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      isloadding: true,
      image: [],
      avatarSource: '',
      data: '',
      IsSave : false,
    };
  }
  componentDidMount() {
    this._LoadHinh();
  }

  componentWillUnmount() {}

  _UploadImage = async () => {
    RNFetchBlob.fetch(
      'PUT',
      'http://10.0.2.2:45457/api/ImagesCar/' + 1,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: 'image6.png',
          type: 'image/png',
          data: this.state.data,
        },
        // part file from storage
      ],
    )
      .then(resp => {
        //toast
      })
      .catch(err => {
        alert('error'  + err)
      });
  };

  _Show() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        alert('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          data: response.data,
          IsSave: true,
        });
      }
    });
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Edit Images',
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
      borderBottomWidth: 0,
      borderBottomColor: 'white',
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
  //this.props.navigation.state.params.manguoidang

  //this.props.navigation.state.params.idcar
  _LoadHinh = () => {
    fetch(HostName + 'api/EditImages/' + 1)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          image: resopnseJson,
          isloadding: false,
        });

        if (this.state.image.length == 0) {
          alert('cant load data');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //header images
  _renderItem({item}) {
    if (this.state.avatarSource == '') {
      <Image
        style={styles.imageThumbnail}
        source={{uri: WebHost + item.src}}
      />;
    } else {
      return (
        <Image style={styles.imageThumbnail} source={this.state.avatarSource} />
      );
    }
  }

  render() {
    const {navigation} = this.props;

    if (this.state.isloadding) {
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
      </View>;
    }
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: 'white'}} />
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card transparent>
            <CardItem>
              {this.state.avatarSource != '' > 0 && (
                <Image
                  style={styles.imageThumbnail}
                  source={this.state.avatarSource}
                />
              )}
              {this.state.avatarSource == '' > 0 && (
                <Image
                  style={styles.imageThumbnail}
                  source={{uri: WebHost + this.state.image.src}}
                />
              )}
            </CardItem>
          </Card>
        </ScrollView>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <ScrollView horizontal={true}>
              <Button
                bordered
                danger
                icon
                style={styles.Button}
                onPress={this._Show.bind(this)}>
                <Icon name="chatboxes" />
                <Text>Chọn hình</Text>
              </Button>
              <Button
                bordered
                disabled={this.state.IsSave}
                primary
                style={styles.Button}
                icon
                onPress={this._UploadImage}>
                <Icon name="paper" />
                <Text style={{fontSize: 16, fontFamily: 'tahoma'}}>
                  {' '}
                  Lưu thay đổi{' '}
                </Text>
              </Button>
            </ScrollView>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: 150,
  },
  container: {
    backgroundColor: '#f5f5f5',
  },
  container2: {
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  NameHeader: {
    fontFamily: 'tahoma',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#daa520',
  },
  titile: {
    color: '#228b22',
    fontSize: 16,
    fontFamily: 'tahoma',
    paddingRight: 180,
  },
  TenXe: {
    fontSize: 18,
    fontWeight: '200',
  },
  Text: {
    fontSize: 16,
    fontFamily: 'tahoma',
    paddingTop: 4,
  },
  footer: {
    height: 80,
    backgroundColor: 'white',
    borderTopColor: 'gray',
    borderTopWidth: 0.4,
  },
  Button: {
    borderRadius: 6,
    width: 120,
    marginLeft: 55,
  },
  containers: {
    backgroundColor: 'transparent',
    height: 230,
  },
  Thumbnail: {
    height: 230,
    left: 0,
    right: 0,
    width: width,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (width * 3) / 4,
    width: width - 40,
    borderRadius: 5,
    marginTop: 5,
  },
  TextHeader: {
    fontSize: 18,
    color: 'green',
  },
});
