import React from 'react'

import {
  Link,
} from 'react-router'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.params.patientId)

    const change = this.props.subscribeChange()
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
      records,
      putPatient,
      putRecord,
    } = this.props

    return (
      <div>
        <h2>{ patient.name }</h2>

        <PatientForm
          initialValues={patient}
          onSubmit={patient => putPatient(patient)}
        />

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={record => putRecord(record)}
          />
        )}

        <Link to='/'>Top</Link>
      </div>
    )
  }
})
