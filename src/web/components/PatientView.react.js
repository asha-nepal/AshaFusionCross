import React from 'react'

import {
  Link,
} from 'react-router'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

export default React.createClass({
  componentWillMount() {
    const patientId = this.props.params.patientId

    if (patientId) {
      this.props.fetchPatient(patientId)
    } else {
      this.props.initPatient()
    }

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
