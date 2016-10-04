/* @flow */

import {
  StyleSheet,
} from 'react-native';

import {
  MKTextField,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
  textinput: {
    height: 32,
    marginBottom: 8,
  },
});

export const TextField = MKTextField.textfield()
  .withStyle(styles.textinput)
  .withUnderlineColorAndroid('transparent')
  .build();
