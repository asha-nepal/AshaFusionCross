/* @flow */

import React, { PropTypes } from 'react'

import {
  Link,
} from 'react-router'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

export default React.createClass({
  propTypes: {
    isFetching: PropTypes.bool,
    patient: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    records: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
    addNewActiveRecord: PropTypes.func.isRequired,
    putPatient: PropTypes.func.isRequired,
    putRecord: PropTypes.func.isRequired,
    isPuttingPatient: PropTypes.bool,
    isPuttingRecord: PropTypes.bool,
  },

  componentWillMount() {
    this.props.init()

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
      isFetching,
      patient,
      records,
      addNewActiveRecord,
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
        <h2>{ patient && patient.name }</h2>

        <PatientForm
          initialValues={patient}
          onSubmit={patient => putPatient(patient)}
          freeze={isPuttingPatient}
        />

        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            addNewActiveRecord()
          }}
        >ADD RECORD</a>

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
