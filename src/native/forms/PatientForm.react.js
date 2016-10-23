/* @flow */

import React from 'react';
import {
  View,
} from 'react-native';
import {
  TextInput,
  TextUnitInput,
  RadioGroup,
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

    <RadioGroup
      label="Sex"
      model={`${model}.sex`}
      options={[
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
      ]}
    />

    <TextUnitInput
      model={`${model}.age`}
      label="Age"
      units={['years', 'months']}
      precision={0}
    />

    <TextInput
      model={`${model}.address`}
      label="Address"
    />
  </View>
);
