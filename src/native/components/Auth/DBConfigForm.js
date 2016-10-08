/* @flow */

import React from 'react';
import {
  View,
} from 'react-native';

import {
  MKButton,
} from 'react-native-material-kit';

import {
  TextInput,
} from '../../forms/fields';

const ColoredRaisedConnectButton = MKButton.coloredButton()
  .withText('Connect')
  .build();

export default ({
  onConnect,
}: {
  onConnect: () => void,
}) => (
  <View>
    <TextInput
      model="pouchConfig.remote.hostname"
      placeholder="Host"
      autoCapitalize="none"
    />

    <TextInput
      model="pouchConfig.remote.dbname"
      placeholder="DB name"
      autoCapitalize="none"
    />

    <ColoredRaisedConnectButton
      onPress={() => onConnect()}
    />
  </View>
);
