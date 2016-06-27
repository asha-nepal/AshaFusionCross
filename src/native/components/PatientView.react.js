/* @flow */

import React, { PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native'
import Button from 'react-native-button'

import PatientForm from '../forms/PatientForm.react'
import RecordForm from '../forms/RecordForm.react'

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
})

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

    this.setState({
      unsubscribeChange: this.props.subscribeChange()
    })
  },

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange()
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
      return <Text>Fetching...</Text>
    }

    return (
      <ScrollView style={styles.container}>
        <Text>{ patient && patient.name }</Text>
        <PatientForm onSubmit={patient => putPatient(patient)} initialValues={patient}/>

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={record => putRecord(record)}
          />
        )}

        <Button
          onPress={addNewActiveRecord}
        >Add record</Button>
      </ScrollView>
    )
  }
})
