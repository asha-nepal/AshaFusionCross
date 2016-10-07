/* @flow */

import React, { Component } from 'react';
import {
  View,
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
  componentWillMount() {
    this.props.init();
  }

  props: {
    init: () => void,
    isFetching: boolean,
    patient: PatientObject,
    records: Array<RecordObject>,
    addNewActiveRecord: () => void,
    putActivePatient: () => void,
    putActiveRecord: (index: number) => void,
    isPuttingPatient: boolean,
    isPuttingRecord: boolean,
  };

  render() {
    const {
      isFetching,
      patient,
      records,
      addNewActiveRecord,
      putActivePatient,
      putActiveRecord,
      isPuttingPatient,
      isPuttingRecord,
    } = this.props;

    if (isFetching) {
      return <Text>Fetching...</Text>;
    }

    return (
      <ScrollView style={styles.container}>
        <Text>{patient && patient.name || ''}</Text>
        <PatientForm
          model="activePatient"
        />
        <Button
          disabled={isPuttingPatient}
          onPress={putActivePatient}
        >Submit</Button>

        {records.map((record, i) =>
          <View key={i}>
            <RecordForm
              model={`activeRecords[${i}]`}
            />
            <Button
              disabled={isPuttingRecord}
              onPress={() => putActiveRecord(i)}
            >Submit</Button>
          </View>
        )}

        <Button
          onPress={addNewActiveRecord}
        >Add record</Button>
      </ScrollView>
    );
  }
}
