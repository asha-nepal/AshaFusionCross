/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import Button from 'react-native-button';

import PatientForm from '../forms/PatientForm.react';
import RecordForm from '../forms/RecordForm.react';

import appStyles from './styles';

const styles = {
  ...appStyles,
  ...StyleSheet.create({}),
};

export default class PatientView extends Component {
  state: {
    unsubscribeChange: () => void;
  };

  componentWillMount() {
    this.props.init();

    this.setState({
      unsubscribeChange: this.props.subscribeChange(),
    });
  }

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange();
    }
  }

  props: {
    init: () => void,
    subscribeChange: () => () => void,
    isFetching: boolean,
    patient: PatientObject,
    records: Array<RecordObject>,
    addNewActiveRecord: () => void,
    putPatient: (patient: PatientObject) => void,
    putRecord: (record: RecordObject) => void,
    isPuttingPatient: boolean,
    isPuttingRecord: boolean,
  };

  render() {
    const {
      isFetching,
      patient,
      records,
      addNewActiveRecord,
      putPatient,
      putRecord,
//      isPuttingPatient,
//      isPuttingRecord,
    } = this.props;

    if (isFetching) {
      return <Text>Fetching...</Text>;
    }

    return (
      <ScrollView style={styles.container}>
        <Text>{patient && patient.name || ''}</Text>
        <PatientForm onSubmit={params => putPatient(params)} initialValues={patient} />

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={params => putRecord(params)}
          />
        )}

        <Button
          onPress={addNewActiveRecord}
        >Add record</Button>
      </ScrollView>
    );
  }
}
