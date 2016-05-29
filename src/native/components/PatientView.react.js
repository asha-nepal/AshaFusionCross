import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.patientId)
  },

  render() {
    const {
      patient,
    } = this.props

    return (
      <View>
        <Text>{ patient.name }</Text>
      </View>
    )
  }
})
