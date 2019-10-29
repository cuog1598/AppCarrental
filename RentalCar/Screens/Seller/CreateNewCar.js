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
  Button,
  Picker,
  Form,
  Label,
  Item,
  Input
} from 'native-base';
import Head from '../Components/BigHeader';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {HostName} from '../Models.json';
import {WebHost} from '../Models.json';
import Modal from "react-native-modal";

export default class CreateNewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      isTogleModelTinh : true,
      IsTogleModelInfo :false,
      selected : '0',
      selected2 : '',
      obj: [],
      obj2 : [],
      diachi : '',
      gia : '',
      tenxe :'',
      tiencoc :'',
      bienso : '',

    };
  }

  componentDidMount() {
  }

  async componentDidMount() {
    this._fetchTinh();

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        if(this.state.selected2 != "" )
        {
          this.props.navigation.goBack();
        }
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  _fetchTinh = () => {
    fetch(HostName+'api/tinhs')
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj: resopnseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  _GetallHangXe = () => {
    fetch(HostName+'api/HangXes')
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          DshangXe: resopnseJson,
          isloadding:false,
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  onValueChange(value) {
    this.setState({
      check: false,
      selected: value,
    });
    //lấy danh sách huyện bởi tỉnh
    fetch(HostName+'api/Huyens/' + value)
      .then(response => response.json())
      .then(resopnseJson => {
        this.setState({
          obj2: resopnseJson,
          check: false,
        });
      })
      .catch(error => {
        alert(error);
      });
  }
  //gọi đến hàm khi thay đổi selected
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
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
      borderBottomWidth: 0,
      borderBottomColor: 'white',
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowColor: 'white',
      shadowRadius: 0,
      elevation: 0,
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

 


  render() {
    if (this.state.isLoadding) {
      return (
        <View style={{justifyContent: 'center', flex: 1, margin: 5}}>
          <ActivityIndicator size="large" color="#00ff00" paddingTop={80} />
        </View>
      );
    } else {
      return (
        <Container>
            <View style={{marginTop:200}}>
            <Button onPress={() => {
                this.props.navigation.goBack()
            }}>

                <Text>Quay lại</Text>
            </Button>
            </View>
            
        <Modal
          isVisible={this.state.isTogleModelTinh}
          backdropTransitionInTiming={4000}
          backdropTransitionOutTiming = {4000}
          coverScreen={true}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.8,
                borderWidth: 0.4,
                borderColor: 'gray',
                borderRadius: 8,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderBottomColor: 'gray',
                  height: 70,
                }}>
                <Text style={{fontSize: 22, fontWeight: '900'}}>Chọn Tỉnh</Text>
              </View>
              <View style={{margin: 10}}>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}>
                    {this.state.obj.map(item => {
                      return (
                        <Picker.Item
                          label={item.tenTinh}
                          value={item.ma}
                          key={item.ma}
                        />
                      );
                    })}
                  </Picker>
                </Form>
                <Form style={{paddingTop: 10}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}>
                    <Picker.Item label="Chọn huyện dưới đây" value="0" />
                    {this.state.obj2.map(item => {
                      return (
                        <Picker.Item
                          label={item.tenHuyen}
                          value={item.id}
                          key={item.id}
                        />
                      );
                    })}
                  </Picker>
                </Form>

                <View style={{marginTop: 10}}>
                  <Item floatingLabel>
                    <Label>Địa chỉ</Label>
                    <Input
                      value={this.state.diachi}
                      onChangeText={diachi => this.setState({diachi})}
                      keyboardType="email-address"
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  borderTopColor: 'gray',
                  borderTopWidth: 0.4,
                }}>

                {this.state.selected2 >0, this.state.diachi !="" && (
                    <TouchableOpacity onPress={() =>{
                        this.setState({
                            isTogleModelTinh : false,
                            IsTogleModelInfo : true,
                        })
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 22,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      Tiếp tục
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.goBack();
                }}>
                  <Text style={styles.TextModel}>Hoàn tác</Text>
                </TouchableOpacity>
              </View>
            </View>

           
          </View>
        </Modal>
        <Modal
          isVisible={this.state.IsTogleModelInfo}
          coverScreen={true}
          backdropTransitionInTiming={4000}
          backdropTransitionOutTiming = {4000}
          style={{justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: (height / 4) * 0.3,
                borderWidth: 0.4,
                borderColor: 'gray',
                borderRadius: 8,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderBottomColor: 'gray',
                  height: 80,
                }}>
                <Text style={{fontSize: 22, fontWeight: '900'}}> Nhập thông tin xe</Text>
              </View>
              <View style={{marginTop: 10, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Tên xe</Label>
                    <Input
                    value={this.state.tenxe && String(this.state.tenxe)}
                    keyboardType= "email-address"
                      onChangeText={tenxe => this.setState({tenxe})}
                      returnKeyType="next"
                      autoCorrect={false}
                      maxLength={11}
                    />
                  </Item>
              </View>
                <View style={{marginTop: 10, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Giá</Label>
                    <Input
                    value={this.state.gia && String(this.state.gia)}
                    keyboardType= "numeric"
                      onChangeText={gia => this.setState({gia})}
                      returnKeyType="next"
                      autoCorrect={false}
                      maxLength={11}
                    />
                  </Item>
              </View>
              <View style={{marginTop: 10, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Số km</Label>
                    <Input
                    value={this.state.sokm && String(this.state.sokm)}
                    keyboardType= "numeric"
                      onChangeText={sokm => this.setState({sokm})}
                      returnKeyType="next"
                      maxLength={15}
                      autoCorrect={false}
                    />
                  </Item>
              </View>
              <View style={{marginTop: 14, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Biển sô</Label>
                    <Input
                      value={this.state.bienso}
                      onChangeText={bienso => this.setState({bienso})}
                      keyboardType= "email-address"
                      returnKeyType="next"
                      maxLength={11}
                      autoCorrect={false}
                    />
                  </Item>
              </View>
              <View style={{marginTop: 14, marginLeft:10}}>
                  <Item stackedLabel>
                    <Label>Tiền cọc</Label>
                    <Input
                      value={this.state.tiencoc }
                      onChangeText={tiencoc => this.setState({tiencoc})}
                      keyboardType= "numeric"
                      maxLength={11}
                      returnKeyType="next"
                      autoCorrect={false}
                    />
                  </Item>
              </View>
             
              <View
                style={{
                  paddingTop: 10,
                  borderTopColor: 'gray',
                  borderTopWidth: 0.4,
                }}>

                {this.state.gia != "", this.state.bienso !="", this.state.sokm !="", this.state.tenxe !="", this.state.tiencoc !=""  && (
                    <TouchableOpacity onPress={this.Createcar}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 22,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      Tiếp tục
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={()=>{
                    this.setState({
                        IsTogleModelInfo :  false,
                        gia :"",
                        tenxe : '',
                        tiencoc : '',
                        bienso : "",
                        sokm : '',
                        isTogleModelTinh :  true,

                    })
                }}>
                  <Text style={styles.TextModel}>Quay lại</Text>
                </TouchableOpacity>
              </View>
            </View>
           
         
          </View>
        </Modal>

        </Container>
      );
    }
  }

  Createcar= async () =>{
      //
    const value =  await AsyncStorage.getItem('@MyApp2_key');
    fetch('http://10.0.2.2:45455/api/Xes', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  
                    "ngayNhap": "2019-09-29T09:05:23.193",
                    "maNguoiDang": value,
                    "tinh": "Hà nội",
                    "huyen": "Quận Hoàn Kiếm",
                    "tenLoai": "Xe máy",
                    "tenNguoiDang": "cường nguyễn",
                    "doi": "2017",
                    "tenxe": this.state.tenxe,
                    "tenHang": "Suzuki",
                    "hinh": "\\Images\\a.jpg",
                    "mota": this.state.mota,
                    "gia": this.state.gia,
                    "loaiXe": "Xe máy",
                    "status": false,
                    "moban": false,
                    "maHuyen": this.state.selected2,
                    "maHangXe": this.props.navigation.state.params.mahang,
                    "maTenXe": null,
                    "diachi": this.state.diachi,
                    "diaChiNhan": null,
                    "bienSo": this.state.bienso,
                    "soKM": this.state.bienso,
                    "baoHiem": true,
                    "maHangXeNavigation": null,
                    "maHuyenNavigation": null,
                    "maNguoiDangNavigation": null,
                    "maTenXeNavigation": null,
                    "cart": [],
                    "donHang": [],
                    "images": null,
            })
            }).then((response) => response.json())
              .then((responseJson) => {
             if(responseJson.title =="Not Found" ) {
                alert("Có vấn đề gì đó ở sever")
            }
             else {
                try{
                     alert("OK");
                     
                     this.props.navigation.navigate("SellerCarDetails",{idcar : responseJson.id})
                     this.setState({
                       IsTogleModelInfo : false,
                       isloadding :true,
                     })
                }
                catch(error)
                {
                    alert(error);
                }
                
            }
            }).catch((error) => {
              console.error(error);
            });
        }



  Tieptuc = () => {
    const navigate= this.props.navigation;
  }
  _cancel=() => {
    this.setState ({
      isTogleModelTinh : !this.state.isTogleModelTinh,
    })
    this.props.navigation.goBack();
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
  TextModel: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    paddingTop:10,
    marginBottom:10
  },
});
