import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
} from 'react-native';

import App from './src/native/components/App.react'

// Polyfill
process.nextTick = setImmediate

// Override hardware back button
import { Actions } from 'react-native-router-flux'
BackAndroid.addEventListener('hardwareBackPress', () => {
  return Actions.pop()
})

AppRegistry.registerComponent('AshaFusionCross', () => App);
