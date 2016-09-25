/* @flow */

import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

// TODO: ../forms/stylesと共通化？
const styles = StyleSheet.create({
  textInput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    fontSize: 13,
    padding: 4,
  },
});

export default ({
  filter,
  onFilterChange,
}: {
  filter: string,
  onFilterChange: (newFilter: string) => void,
}) => (
  <TextInput
    style={styles.textInput}
    value={filter}
    onChangeText={(text) => onFilterChange(text)}
  />
);
