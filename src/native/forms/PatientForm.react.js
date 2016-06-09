import React from 'react'
import {reduxForm} from 'redux-form'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native'
import {
  SelectButtonGroup,
} from './fields'
import Button from 'react-native-button'

import styles from './styles'

export default reduxForm({
  form: 'patient',
  fields: ['_id', '_rev', 'type', 'name', 'age', 'sex', 'address']
})(React.createClass({
  render() {
    const {
      fields,
      handleSubmit,
    } = this.props

    return (
      <View>
        <TextInput {...fields.name} style={styles.textInput} />
        <TextInput {...fields.age} style={styles.textInput} />
        <SelectButtonGroup {...fields.sex} options={[
          {id: 'male', label: 'Male'},
          {id: 'female', label: 'Female'},
        ]} />
        <TextInput {...fields.address} style={styles.textInput} />
        <Button
          onPress={handleSubmit}
        >Submit</Button>
      </View>
    )
  }
}))
