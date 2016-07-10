/* @flow */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonActive: {
    flex: 1,
    backgroundColor: '#99aaff',
  },
  buttonInactive: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  },
});

export function SelectButtonGroup(props: {
  label: string,
  onBlur: Function,
  onChange: Function,
  options: Array<{id: any, label: string}>,
  value: any,
  disabled: boolean,
}) {
  const {
  //  label,
  //  onBlur,
    onChange,
    options,
    value,
    disabled,
  } = props;

  return (
    <View style={styles.container}>
    {options.map(option => (
      <Button
        key={option.id}
        style={option.id === value ? styles.buttonActive : styles.buttonInactive}
        disabled={disabled}
        onPress={() => {
          onChange(option.id);
        }}
      >{option.label}</Button>
    ))}
    </View>
  );
}
