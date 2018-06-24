/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    >
      {text}
    </Text>
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
