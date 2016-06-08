import React from 'react'

import {
  Link,
} from 'react-router'

import PatientForm from '../forms/PatientForm.react'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.params.patientId)
  },

  render() {
    const {
      patient,
      records,
      putPatient,
    } = this.props

    return (
      <div>
        <h2>{ patient.name }</h2>

        <PatientForm onSubmit={patient => putPatient(patient)} initialValues={patient}/>

        <Link to='/'>Top</Link>
      </div>
    )
  }
})
