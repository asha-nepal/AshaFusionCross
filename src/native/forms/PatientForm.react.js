import React from 'react';
import { reduxForm } from 'redux-form';

import {
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  SelectButtonGroup,
} from './fields';
import Button from 'react-native-button';

import styles from './styles';

export default reduxForm({
  form: 'patient',
  fields: ['_id', '_rev', 'type', 'name', 'age', 'sex', 'address'],
})(({ fields, handleSubmit }) => (
  <View>
    <Text>Name</Text>
    <TextInput {...fields.name} style={styles.textInput} />

    <Text>Age</Text>
    <TextInput {...fields.age} style={styles.textInput} keyboardType="numeric" />

    <Text>Sex</Text>
    <SelectButtonGroup
      {...fields.sex}
      options={[
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
      ]}
    />

    <Text>Address</Text>
    <TextInput {...fields.address} style={styles.textInput} />

    <Button
      onPress={handleSubmit}
    >Submit</Button>
  </View>
));
