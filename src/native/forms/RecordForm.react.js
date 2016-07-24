/* @flow */

import React from 'react';
import { Field } from 'react-redux-form/lib/native';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

import styles from './styles';

export default({
  model,
}: {
  model: string,
}) => (
  <View>
    <Text>Height</Text>
    <Field model={`${model}.height`}>
      <TextInput style={styles.textInput} />
    </Field>

    <Text>Weight</Text>
    <Field model={`${model}.weight`}>
      <TextInput style={styles.textInput} />
    </Field>
  </View>
);
