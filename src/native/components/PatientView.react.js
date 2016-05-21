import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatientData(this.props.patientId)
  },

  render() {
    const {
      patientData,
    } = this.props

    return (
      <View>
        <Text>{ patientData.name }</Text>
      </View>
    )
  }
})
