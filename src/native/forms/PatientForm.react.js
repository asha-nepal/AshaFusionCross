/* @flow */

import React from 'react';
import {
  View,
} from 'react-native';
import {
  TextInput,
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
