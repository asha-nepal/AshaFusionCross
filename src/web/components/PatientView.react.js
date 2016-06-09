import React from 'react'

import {
  Link,
} from 'react-router'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.params.patientId)
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
      return <div>Fetching...</div>
    }

    return (
      <div>
        <h2>{ patient.name }</h2>

        <PatientForm
          initialValues={patient}
          onSubmit={patient => putPatient(patient)}
          freeze={isPuttingPatient}
        />

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={record => putRecord(record)}
            freeze={isPuttingRecord}
          />
        )}

        <Link to='/'>Top</Link>
      </div>
    )
  }
})
