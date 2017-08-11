/**
 * Copyright 2016 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  ...rest
}: {
  label?: string,
  value: ?string,
  onChange: (newValue: string) => void,
  type?: string,
  prefix?: string,
  suffix?: string
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
