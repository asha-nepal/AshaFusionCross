/* @flow */

import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import Button from 'react-native-button'

import styles from './styles'

export default reduxForm({
  form: 'pouch-settings',
  fields: ['hostname', 'port', 'dbname'],
})(React.createClass({
  render() {
    const {
      fields,
      handleSubmit,
    } = this.props

    return (
      <View>
        <Text>Host name</Text>
        <TextInput
          {...fields.hostname}
          style={styles.textInput}
        />

        <Text>Port</Text>
        <TextInput
          {...fields.port}
          style={styles.textInput}
          keyboardType='number-pad'
        />

        <Text>Database</Text>
        <TextInput
          {...fields.dbname}
          style={styles.textInput}
        />

        <Button
          onPress={handleSubmit}
        >Set</Button>
      </View>
    )
  }
}))
