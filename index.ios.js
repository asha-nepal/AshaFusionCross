import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/native/components/App.react'

// Polyfill
process.nextTick = setImmediate

AppRegistry.registerComponent('AshaFusionCross', () => App);
