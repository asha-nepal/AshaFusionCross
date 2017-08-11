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
} from 'react-native';
import {
  MKRadioButton,
} from 'react-native-material-kit';
import styles from './styles';

type Props = {
  options: Array<{id: string, label: string}>,
  label?: string,
  value: ?string,
  onChange: (newValue: string) => void,
}

export class RadioGroupComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.radioGroup = new MKRadioButton.Group();
  }

  radioGroup: MKRadioButton.Group

  props: Props

  render() {
    const {
      options,
      label,
      value,
      onChange,
    } = this.props;

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label || ''}</Text>
        <View style={styles.radioGroupRow}>
        {options.map(option =>
          <View key={option.id} style={styles.radioGroupCol}>
            <MKRadioButton
              checked={option.id === value}
              group={this.radioGroup}
              onCheckedChange={({ checked }) => {
                if (checked) {
                  onChange(option.id);
                }
              }}
            />
            <Text style={styles.legendLabel}>{option.label}</Text>
          </View>
        )}
        </View>
      </View>
    );
  }
}

import connect from '../../../common/forms/fields/RadioGroup';

export const RadioGroup = connect(RadioGroupComponent);
