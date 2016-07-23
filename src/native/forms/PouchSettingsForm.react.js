/* @flow */

import React from 'react';
import { Field } from 'react-redux-form/lib/native';
import {
  View,
  Text,
  TextInput,
  Picker,
} from 'react-native';

import styles from './styles';

export default ({
  model,
}: {
  model: string,
}) => (
  <View>
    <Text>Mode</Text>
    <Field model={`${model}.isLocal`}>
      <Picker>
        <Picker.Item label="Local" value={true} />
        <Picker.Item label="Remote" value={false} />
      </Picker>
    </Field>

    <View>
      <Text>Local Database</Text>
      <Field model={`${model}.local.dbname`}>
        <TextInput style={styles.textInput} />
      </Field>


      <Text>Synced with remote</Text>
      <Field model={`${model}.local.isSynced`}>
        <Picker>
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>
      </Field>
    </View>

    <View>
      <Text>Remote host name</Text>
      <Field model={`${model}.remote.hostname`}>
        <TextInput style={styles.textInput} />
      </Field>

      <Text>Database</Text>
      <Field model={`${model}.remote.dbname`}>
        <TextInput style={styles.textInput} />
      </Field>
    </View>
  </View>
);
