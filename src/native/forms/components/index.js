/* @flow */

import {
  StyleSheet,
} from 'react-native';

import {
  MKTextField,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
});

export const TextField = MKTextField.textfield()
  .withStyle(styles.textfield)
  .withUnderlineColorAndroid('transparent')
  .build();

export const TextFieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withUnderlineColorAndroid('transparent')
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();
