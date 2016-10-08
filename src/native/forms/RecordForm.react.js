/* @flow */

import React from 'react';
import {
  View,
} from 'react-native';
import {
  TextInput,
} from './fields';

export default({
  model,
}: {
  model: string,
}) => (
  <View>
    <TextInput
      label="Pulse"
      model={`${model}.pulse`}
    />
  </View>
);
