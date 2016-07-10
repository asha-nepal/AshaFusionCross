/* @flow */

import React, { PropTypes } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import PouchSettings from '../forms/PouchSettings.react';

import appStyles from './styles';

const styles = {
  ...appStyles,
  ...StyleSheet.create({}),
};

function Settings(props: {pouchConfig: PouchConfig, connectPouchDB: Function}) {
  return (
    <ScrollView style={styles.container}>
      <Text>Settings</Text>

      <PouchSettings
        initialValues={props.pouchConfig}
        onSubmit={params => {
          props.connectPouchDB(params);
        }}
      />
    </ScrollView>
  );
}

Settings.propTypes = {
  pouchConfig: PropTypes.object.isRequired,
  connectPouchDB: PropTypes.func.isRequired,
};

export default Settings;
