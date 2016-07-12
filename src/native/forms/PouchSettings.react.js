/* @flow */

import React from 'react';
import { reduxForm } from 'redux-form';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import {
  SelectButtonGroup,
} from './fields';

import styles from './styles';

export default reduxForm({
  form: 'pouch-settings',
  fields: [
    'isLocal',
    'local.dbname',
    'local.isSynced',
    'remote.hostname',
    'remote.dbname',
  ],
})(({ fields, handleSubmit }) => (
  <View>
    <Text>Mode</Text>
    <SelectButtonGroup
      {...fields.isLocal}
      options={[
        { id: true, label: 'Local' },
        { id: false, label: 'Remote' },
      ]}
    />

    {fields.isLocal.value ? (
      <View>
        <Text>Local Database</Text>
        <TextInput
          {...fields.local.dbname}
          style={styles.textInput}
        />

        <Text>Synced with remote({fields.remote.hostname.value}/{fields.remote.dbname.value})</Text>
        <SelectButtonGroup
          {...fields.local.isSynced}
          options={[
            { id: true, label: 'Yes' },
            { id: false, label: 'No' },
          ]}
        />
      </View>
    ) : (
      <View>
        <Text>Host name</Text>
        <TextInput
          {...fields.remote.hostname}
          style={styles.textInput}
        />

        <Text>Database</Text>
        <TextInput
          {...fields.remote.dbname}
          style={styles.textInput}
        />
      </View>
    )}

    <Button
      onPress={handleSubmit}
    >Set</Button>
  </View>
));
