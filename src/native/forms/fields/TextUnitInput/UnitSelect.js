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
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  unitButton: {
    width: 96,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#00000011',
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectItemContainer: {
    alignSelf: 'stretch',
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    backgroundColor: '#ffffffee',
    borderColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
  },
  selectItem: {
    color: '#0af',
    fontSize: 18,
    textAlign: 'center',
  },
});

type Props = {
  unit: string,
  units: Array<string>,
  onValueChange: (v: string) => void,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  state: {
    open: boolean,
  }

  props: Props

  render() {
    const {
      unit,
      units,
      onValueChange,
    } = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ open: !this.state.open });
          }}
        >
          <Text
            style={styles.unitButton}
          >
            {unit}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
        >
          <View
            style={styles.selectContainer}
          >
            {units.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.selectItemContainer}
                onPress={() => {
                  onValueChange(item);
                  this.setState({ open: false });
                }}
              >
                <Text
                  style={styles.selectItem}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    );
  }
}
