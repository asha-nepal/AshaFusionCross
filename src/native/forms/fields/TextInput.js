/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

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

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const TextInput = connect(
  mapStateToProps, mapDispatchToProps
)(TextInputComponent);
