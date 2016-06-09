import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import PatientForm from '../forms/PatientForm.react'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.patientId)
  },

  render() {
    const {
      isFetching,
      patient,
      putPatient,
      isPuttingPatient,
      isPuttingRecord,
    } = this.props

    if (isFetching) {
      return <Text>Fetching...</Text>
    }

    return (
      <View>
        <Text>{ patient.name }</Text>
        <PatientForm onSubmit={patient => putPatient(patient)} initialValues={patient}/>
      </View>
    )
  }
})
