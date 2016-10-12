/* @flow */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import appStyles from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    padding: 20,
    fontSize: 16,
    backgroundColor: '#efefef',
    color: '#666',
  },
});

const Item = ({
  onPress,
  text,
}: {
  onPress: () => void,
  text: string,
}) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Text
      style={styles.item}
    >{text}</Text>
  </TouchableOpacity>
);

export default ({
  onClose,
  logout,
  disconnect,
}: {
  onClose: () => void,
  logout: () => void,
  disconnect: () => void,
}) => (
  <View style={[appStyles.container, styles.container]}>
    <Item
      onPress={() => {
        onClose();
        logout();
      }}
      text="Logout"
    />
    <Item
      onPress={() => {
        onClose();
        disconnect();
      }}
      text="Disconnect"
    />
  </View>
);
