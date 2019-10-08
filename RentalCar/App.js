import React from 'react';
import { StyleSheet,Text, Image, View,SafeAreaView,TouchableHighlight,Dimensions,ScrollView} from 'react-native';


import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')
const {height,width2}= Dimensions.get('window')
import Horizontal from './Screens/Components/Horizontal';

export default class App extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
            {
                title:"Item 1",
                image: require('./images/backgroud/a.jpg')
            },
            {
                title:"Item 2",
                image:require('./images/backgroud/b.jpg')
            },
            {
                title:"Item 3",
                image:require('./images/backgroud/c.jpg')
            },
            {
                title:"Item 4",
                image:require('./images/backgroud/d.jpg')
            },
            {
                title:"Item 5",
                image:require('./images/backgroud/dep.jpg')
            }
        ]}
    }

    _renderItem({item,index}){
      return (
       

        <View style={styles.i}>
            <Image
                source={item.image}
                containerStyle={styles.imageContainer}
                style={styles.i}
                parallaxFactor={0.4}
            />
        </View>
       
      
        
        
    );
  }

    render() {
      return (
        <SafeAreaView>
            
        <View>
          <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth}
                data={this.state.carouselItems}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
          

          </View>
          <View style={styles.container2}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator= {false}>
          <Horizontal imageURI={require('./images/backgroud/dep.jpg')}  Name="Home"/>
          <Horizontal imageURI={require('./images/backgroud/dep.jpg')}/>
          <Horizontal imageURI={require('./images/backgroud/dep.jpg')}/>
          <Horizontal imageURI={require('./images/backgroud/dep.jpg')}/>
          </ScrollView>
        
          </View>

        </SafeAreaView>

       
          
      );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth ,
    height: 150 ,
  },
  container: {
    backgroundColor: '#F5FCFF',
    position: 'relative'
      },
      container2: {
      paddingTop:40,
    backgroundColor: '#F5FCFF',
    position: 'relative'
      },
  imageContainer: {
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  i:{
    resizeMode:'stretch',
    width: screenWidth ,
    height: 230 ,
  }
})