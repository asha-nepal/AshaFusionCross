/* @flow */

import React from 'react';
import {
  View,
} from 'react-native';
import {
  TextInput,
  TextUnitInput,
} from './fields';

export default({
  model,
}: {
  model: string,
}) => (
  <View>
    <TextUnitInput
      label="Height"
      model={`${model}.height`}
      units={['ft', 'cm', 'in']}
      precision={1}
    />
    <TextUnitInput
      label="Weight"
      model={`${model}.weight`}
      units={['kg', 'lbm']}
      precision={1}
    />
    <TextInput
      label="Pulse"
      model={`${model}.pulse`}
      suffix="/min"
    />
  </View>
);
