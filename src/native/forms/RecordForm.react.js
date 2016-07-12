import React from 'react';
import { reduxForm } from 'redux-form';

import {
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';

import styles from './styles';

export default reduxForm({
  form: 'record',
  fields: ['_id', '_rev', 'type', 'height', 'weight'],
})(({ fields, handleSubmit }) => (
  <View>
    <Text>Height</Text>
    <TextInput {...fields.height} style={styles.textInput} />

    <Text>Weight</Text>
    <TextInput {...fields.weight} style={styles.textInput} />

    <Button
      onPress={handleSubmit}
    >Submit</Button>
  </View>
));
