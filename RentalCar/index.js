/**
 * @format
 */


import { AppRegistry } from 'react-native';
// import App from './App';
//Components
import {name as appName} from './app.json';
import appcontainer from './appcontainer';
import { YellowBox } from 'react-native';
import App from './App';
import horizontal from './Screens/Components/Horizontal';
import ListProduct from './Screens/Product/ListProduct'
import Details from './Screens/Product/Details';
import Seemore from './Screens/Product/Seemore'
import Oders from './Screens/Product/Oders'


YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

AppRegistry.registerComponent(appName, () => Oders );
