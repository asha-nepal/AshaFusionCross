import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.patientId)
  },

  render() {
    const {
      isFetching,
      patient,
      records,
      putPatient,
      putRecord,
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

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={record => putRecord(record)}
          />
        )}
      </View>
    )
  }
})
