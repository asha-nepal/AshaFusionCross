/* @flow */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  MKTextField,
} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: ../forms/stylesと共通化？
const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    padding: 12,
  },
  textfield: {
    flex: 1,
    height: 28,
    marginLeft: 16,
  },
});

const TextField = MKTextField.textfield()
  .withStyle(styles.textfield)
  .withPlaceholder('Search')
  .withUnderlineColorAndroid('transparent')
  .build();

export default ({
  filter,
  onFilterChange,
}: {
  filter: string,
  onFilterChange: (newFilter: string) => void,
}) => (
  <View style={styles.searchBox}>
    <Icon name="search" size={24} color="#666666" />
    <TextField
      value={filter}
      onChangeText={(text) => onFilterChange(text)}
    />
  </View>
);
