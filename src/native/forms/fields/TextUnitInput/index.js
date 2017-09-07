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
  MKTextField,
} from 'react-native-material-kit';
import styles from '../styles';
import { convert } from '../../../../web/forms/fields/TextUnitInput';  // TODO: convertの場所

import UnitSelect from './UnitSelect';

const TextField = MKTextField.textfield()
  .withStyle(styles.textfield)
  .withKeyboardType('numeric')
  .withUnderlineColorAndroid('transparent')
  .build();

type Props = {
  label: ?string,
  units: Array<string>,
  value: ?(ValueUnitType | number | string),
  precision: ?number,
  forceFixed: ?boolean,
  placeholder: ?string,
  onChange: (value: ?ValueUnitType) => void,
}

export class TextUnitInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    if (!props.value) {
      this.state = {
        unit: props.units[0],
        inputValue: '',
        modalOpen: false,
      };
      return;
    }

    if (typeof props.value === 'number' || typeof props.value === 'string') {
      this.state = {
        unit: props.units[0],
        inputValue: props.value.toString(),
        modalOpen: false,
      };
      return;
    }

    this.state = {
      unit: props.value.unit ? props.value.unit : props.units[0],
      inputValue: props.value.value ? props.value.value.toString() : '',
      modalOpen: false,
    };
  }

  state: {
    unit: string,
    inputValue: string,
    modalOpen: boolean,
  };

  props: Props;

  render() {
    const {
      label,
      units,
      value,
      precision,
      forceFixed = false,
      placeholder,
      onChange,
    } = this.props;

    // TODO: web版と共通化
    const _value = (typeof value === 'number' || typeof value === 'string')
      ? { value, unit: units[0] }
      : value;

    const converted = convert(_value, this.state.unit, precision);

    const inputValue = !converted || parseFloat(this.state.inputValue) === converted
      ? this.state.inputValue  // 小数点を入力中('5.'など)のときへの対応．state.inputValueを使う
      : converted.toString();

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.columns}>
          <TextField
            style={styles.column}
            value={inputValue}
            step={precision ? Math.pow(10, -precision) : null}
            placeholder={placeholder}
            onChangeText={(text) => {
              let v = text;

              // FIXME: web版と共通化
              if (forceFixed && precision) {
                // 入力桁数を制限
                v = v.replace(new RegExp(`(\\.\\d{1,${precision}})\\d*`), '$1');
              }

              const asFloat = parseFloat(v);
              if (v && isNaN(asFloat)) { return false; }

              // convert()等に通さない，inputの生の値を持っておく．小数点対策
              this.setState({ inputValue: v });

              if (v.trim() === '') {
                onChange(null);
              } else {
                onChange({ value: asFloat, unit: this.state.unit });
              }

              return true;
            }}
          />
          <UnitSelect
            unit={this.state.unit}
            units={units}
            onValueChange={(itemValue) => this.setState({ unit: itemValue })}
          />
        </View>
      </View>
    );
  }
}

import connect from '../../../../common/forms/fields/TextUnitInput';

export const TextUnitInput = connect(TextUnitInputComponent);
