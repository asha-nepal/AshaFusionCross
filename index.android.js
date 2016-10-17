import {
  AppRegistry,
  BackAndroid,
} from 'react-native';
require('blob-polyfill');

import App from './src/native/components/App.react';

// Polyfill
process.nextTick = process.nextTick || setImmediate;

// Override hardware back button
import { Actions } from 'react-native-router-flux';
BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

AppRegistry.registerComponent('AshaFusionCross', () => App);
