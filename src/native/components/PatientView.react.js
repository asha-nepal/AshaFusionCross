import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import PatientForm from '../forms/PatientForm.react'

export default React.createClass({
  componentWillMount() {
    const patientId = this.props.patientId

    this.props.fetchPatient(patientId)

    const change = this.props.subscribeChange(patientId)
    this.setState({change: change})
  },

  componentWillUnmount() {
    if (this.state.change) {
      this.state.change.cancel()
      this.setState({change: null})
    }
  },

  render() {
    const {
      patient,
      putPatient,
    } = this.props

    return (
      <View>
        <Text>{ patient.name }</Text>
        <PatientForm onSubmit={patient => putPatient(patient)} initialValues={patient}/>
      </View>
    )
  }
})
