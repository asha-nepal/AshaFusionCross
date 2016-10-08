/* @flow */

import React from 'react';
import { Field } from 'react-redux-form/lib/native';
import {
  View,
  Text,
  Picker,
} from 'react-native';
import {
  TextInput,
} from './fields';

export default ({
  model,
}: {
  model: string,
}) => (
  <View>
    <TextInput
      model={`${model}.name`}
      label="Name"
    />

    <Text>Sex</Text>
    <Field model={`${model}.sex`}>
      <Picker>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </Field>

    <TextInput
      model={`${model}.age`}
      label="Age"
    />

    <TextInput
      model={`${model}.address`}
      label="Address"
    />
  </View>
);
