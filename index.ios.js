import {
  AppRegistry,
} from 'react-native';
require('babel-polyfill');

import App from './src/native/components/App.react';

// Polyfill
process.nextTick = process.nextTick || setImmediate;

AppRegistry.registerComponent('AshaFusionCross', () => App);
