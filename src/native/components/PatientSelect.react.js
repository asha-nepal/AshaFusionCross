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
  StyleSheet,
  View,
  TouchableHighlight,
//  RecyclerViewBackedScrollView,
  ListView,
  Text,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const MK = require('react-native-material-kit');
const {
  MKButton,
} = MK;
import Icon from 'react-native-vector-icons/MaterialIcons';

import PatientListFilter from '../containers/PatientListFilter.react';

import appStyles from './styles';

const styles = {
  ...appStyles,
  ...StyleSheet.create({
    fixedFab: {
      flex: 1,
      position: 'absolute',
      width: 56,
      height: 56,
      bottom: 16,
      right: 16,
    },
    scrollView: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      height: 48,
      backgroundColor: '#F6F6F6',
    },
    separator: {
      height: 1,
      backgroundColor: '#DDDDDD',
    },
    text: {
      fontSize: 16,
      flex: 1,
    },
  }),
};

const FixedAccentColoredFab = MKButton.accentColoredFab()
  .withStyle(styles.fixedFab)
  .build();

export default class PatientSelect extends Component {
  constructor(props: Object) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      ds: ds.cloneWithRows(this.props.patientList || []),
    };

    this._onAddPress = this._onAddPress.bind(this);
    this._onPatientSelect = this._onPatientSelect.bind(this);
    this._renderRow = this._renderRow.bind(this);
  }

  state: {
    ds: ListView.DataSource;
  };

  componentWillMount() {
    this.props.fetchPatientList();
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.patientList !== this.props.patientList) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.patientList || []),
      });
    }
  }

  props: {
    isFetching: boolean,
    fetchPatientList: () => void,
    patientList: Array<PatientObject>,
  };

  _onAddPress: Function;
  _onPatientSelect: Function;
  _renderRow: Function;

  _onAddPress() {
    Actions.patientView({ patientId: null });
  }

  _onPatientSelect(patientId: string) {
    Actions.patientView({ patientId });
  }

  _renderRow(
    rowData: Object,
    sectionID: number,
    rowID: number,
    highlightRow: (sectionID: number, rowID: number) => void
  ) {
    return (
      <TouchableHighlight
        onPress={() => {
          this._onPatientSelect(rowData._id);
          highlightRow(sectionID, rowID);
        }}
      >
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      isFetching,
    } = this.props;

    if (isFetching) {
      return <Text>Fetching patient list...</Text>;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <PatientListFilter />
          <ListView
            dataSource={this.state.ds}
            renderRow={this._renderRow}
            // TODO: RecyclerViewBackedScrollViewは
            // androidでbetter performanceらしいがheight=0になって表示されない（バグ？）
            // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={styles.separator} />
            }
            enableEmptySections
          />
        </ScrollView>
        <FixedAccentColoredFab
          onPress={this._onAddPress}
        ><Icon name="add" size={24} color="#FFFFFF" /></FixedAccentColoredFab>
      </View>
    );
  }
}
