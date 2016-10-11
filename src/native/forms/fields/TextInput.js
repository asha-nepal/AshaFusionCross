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
  .withStyle([styles.textfield, styles.column])
  .withUnderlineColorAndroid('transparent')
  .build();

export const TextInputComponent = ({
  label,
  value,
  onChange,
  type,
  prefix,
  suffix,
  ...rest,
}: {
  label? : string,
  value: ?string,
  onChange: (newValue: string) => void,
  type?: string,
  prefix?: string,
  suffix?: string,
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.columns}>
      {prefix && <Text style={styles.textfieldPrefix}>{prefix}</Text>}
      <TextField
        value={value || ''}
        onChangeText={onChange}
        keyboardType={type && keyboardTypes[type] || 'default'}
        {...rest}
      />
      {suffix && <Text style={styles.textfieldPrefix}>{suffix}</Text>}
    </View>
  </View>
);

import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
