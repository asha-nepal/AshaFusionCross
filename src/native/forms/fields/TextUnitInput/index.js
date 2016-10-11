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
  value: ValueUnitType,
  precision: ?number,
  forceFixed: ?boolean,
  placeholder: ?string,
  onChange: (value: ?ValueUnitType) => void,
}

export class TextUnitInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      unit: props.value && props.value.unit ? props.value.unit : props.units[0],
      inputValue: props.value && props.value.value ? props.value.value.toString() : '',
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

    // FIXME: web版と共通化
    const converted = convert(value, this.state.unit, precision);

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
