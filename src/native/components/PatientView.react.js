/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {
  MKButton,
} from 'react-native-material-kit';

import PatientForm from '../forms/PatientForm.react';
import RecordForm from '../forms/RecordForm.react';

import appStyles from './styles';

const ColoredRaisedSubmitButton = MKButton.coloredButton()
  .withText('Submit')
  .withStyle({
    marginBottom: 20,
  })
  .build();

const ColoredRaisedAddButton = MKButton.coloredButton()
  .withText('Add')
  .withStyle({
    marginBottom: 20,
  })
  .build();

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
      records,
      addNewActiveRecord,
      putActivePatient,
      putActiveRecord,
      isPuttingPatient,
      isPuttingRecord,
    } = this.props;

    if (isFetching) {
      return (
        <Text>
Fetching...
        </Text>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <PatientForm
          model="activePatient"
        />
        <ColoredRaisedSubmitButton
          disabled={isPuttingPatient}
          onPress={putActivePatient}
        />

        {records.map((record, i) => (
          <View key={i}>
            <RecordForm
              model={`activeRecords[${i}]`}
            />
            <ColoredRaisedSubmitButton
              disabled={isPuttingRecord}
              onPress={() => putActiveRecord(i)}
            />
          </View>
        ))}

        <ColoredRaisedAddButton
          onPress={addNewActiveRecord}
        />
      </ScrollView>
    );
  }
}
