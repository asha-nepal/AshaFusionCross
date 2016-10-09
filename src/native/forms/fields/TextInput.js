/* @flow */

import React from 'react';

import {
  View,
  Text,
} from 'react-native';
import {
  MKTextField,
} from 'react-native-material-kit';
import styles from './styles';

const keyboardTypes = {
  number: 'numeric',
  email: 'email-address',
};

const TextField = MKTextField.textfield()
  .withStyle(styles.textfield)
  .withUnderlineColorAndroid('transparent')
  .build();

export const TextInputComponent = ({
  label,
  value,
  onChange,
  type,
  ...rest,
}: {
  label? : string,
  value: ?string,
  onChange: (newValue: string) => void,
  type?: string,
}) => (
  <View>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextField
      value={value || ''}
      onChangeText={onChange}
      keyboardType={type && keyboardTypes[type] || 'default'}
      {...rest}
    />
  </View>
);

import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
