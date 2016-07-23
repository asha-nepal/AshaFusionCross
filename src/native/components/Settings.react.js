/* @flow */

import React, { PropTypes } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import Button from 'react-native-button';

import PouchSettingsForm from '../forms/PouchSettingsForm.react';

import appStyles from './styles';

const styles = {
  ...appStyles,
  ...StyleSheet.create({}),
};

function Settings(props: {pouchConfig: PouchConfig, connectPouchDB: Function}) {
  return (
    <ScrollView style={styles.container}>
      <Text>Settings</Text>

      <PouchSettingsForm
        model="pouchConfig"
      />
      <Button
        onPress={() => props.connectPouchDB(props.pouchConfig)}
      >Submit</Button>
    </ScrollView>
  );
}

Settings.propTypes = {
  pouchConfig: PropTypes.object.isRequired,
  connectPouchDB: PropTypes.func.isRequired,
};

export default Settings;
