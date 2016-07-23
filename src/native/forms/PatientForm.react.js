/* @flow */

import React from 'react';
import { Field } from 'react-redux-form/lib/native';
import {
  View,
  Text,
  TextInput,
  Picker,
} from 'react-native';

import styles from './styles';

export default ({
  model,
}: {
  model: string,
}) => (
  <View>
    <Text>Name</Text>
    <Field model={`${model}.name`}>
      <TextInput style={styles.textInput} />
    </Field>

    <Text>Sex</Text>
    <Field model={`${model}.sex`}>
      <Picker>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </Field>

    <Text>Age</Text>
    <Field model={`${model}.age`}>
      <TextInput style={styles.textInput} />
    </Field>

    <Text>Address</Text>
    <Field model={`${model}.address`}>
      <TextInput style={styles.textInput} />
    </Field>
  </View>
);
