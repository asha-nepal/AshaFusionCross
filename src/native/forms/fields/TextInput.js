/* @flow */

import React from 'react';

import {
  TextFieldWithFloatingLabel,
} from '../components';

const keyboardTypes = {
  number: 'numeric',
  email: 'email-address',
};

export const TextInputComponent = ({
  label,
  value,
  onChange,
  type,
}: {
  label? : string,
  value: ?string,
  onChange: (newValue: string) => void,
  type?: string,
}) => <TextFieldWithFloatingLabel
  placeholder={label}
  value={value || ''}
  onChangeText={onChange}
  keyboardType={type && keyboardTypes[type] || 'default'}
/>;


import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
