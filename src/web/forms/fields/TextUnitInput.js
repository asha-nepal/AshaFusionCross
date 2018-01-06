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
import classNames from 'classnames';
import math from 'lib/mathjs';

export const convert = (
  value: ?ValueUnitType,
  targetUnit: ?string,
  precision: ?number
): ?number => {
  if (!value || !value.value || !value.unit) { return null; }
  if (!targetUnit) { return null; }
  if (value.unit === targetUnit) { return parseFloat(value.value); }

  const converted = math.unit(value.value, value.unit).toNumber(targetUnit);

  if (precision != null) {
    const e = Math.pow(10, precision);
    return Math.round(converted * e) / e;
  }

  return converted;
};

type Props = {
  units: Array<string>,
  value: ?(ValueUnitType | number | string),
  style?: Object,
  precision?: number,
  forceFixed?: boolean,
  placeholder?: string,
  readonly?: boolean,
  onChange?: (value: ?ValueUnitType) => void,
}

export class TextUnitInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    if (!props.value) {
      this.state = {
        unit: props.units[0],
        inputValue: '',
      };
      return;
    }

    if (typeof props.value === 'number' || typeof props.value === 'string') {
      this.state = {
        unit: props.units[0],
        inputValue: props.value.toString(),
      };
      return;
    }

    this.state = {
      unit: props.value.unit ? props.value.unit : props.units[0],
      inputValue: props.value.value ? props.value.value.toString() : '',
    };
  }

  state: {
    unit: string,
    inputValue: string,
  };

  getInputValue = (value: ?ValueUnitType): string => {
    if (!value) {
      return '';
    }

    const converted = convert(value, this.state.unit, this.props.precision);

    if (!converted || parseFloat(this.state.inputValue) === converted) {
      return this.state.inputValue;  // 小数点を入力中('5.'など)のときへの対応．state.inputValueを使う
    }

    return converted.toString();
  }

  props: Props

  render() {
    const {
      units,
      value,
      style,
      precision,
      forceFixed = false,
      placeholder,
      readonly = false,
      onChange,
    } = this.props;

    const _value = (typeof value === 'number' || typeof value === 'string')
      ? { value, unit: units[0] }
      : value;

    const inputValue = this.getInputValue(_value);

    return (
      <div
        className={classNames(
          'field',
          { [readonly ? 'is-grouped' : 'has-addons']: true }
        )}
      >
        {readonly ? (
          <span className="form-static">
            {inputValue}
          </span>
        ) : (
          <div className="control">
            <input
              type="number"
              className="input"
              style={style}
              value={inputValue}
              step={precision ? Math.pow(10, -precision) : null}
              placeholder={placeholder}
              onChange={(e) => {
                let v = e.target.value;

                if (forceFixed && precision) {
                  // 入力桁数を制限
                  v = v.replace(new RegExp(`(\\.\\d{1,${precision}})\\d*`), '$1');
                }

                const asFloat = parseFloat(v);
                if (v && isNaN(asFloat)) { return false; }

                // convert()等に通さない，inputの生の値を持っておく．小数点対策
                this.setState({ inputValue: v });

                if (!onChange) { return true; }

                if (v.trim() === '') {
                  onChange({ value: null, unit: null });
                } else {
                  onChange({ value: asFloat, unit: this.state.unit });
                }

                return true;
              }}
            />
          </div>
        )}
        <div className="control">
          <span className="select">
            <select
              tabIndex="-1"
              value={this.state.unit}
              onChange={e => this.setState({ unit: e.target.value })}
            >
            {units.map(unit =>
              <option key={unit} value={unit}>{unit}</option>
            )}
            </select>
          </span>
        </div>
      </div>
    );
  }
}

import connect from '../../../common/forms/fields/TextUnitInput';

export const TextUnitInput = connect(TextUnitInputComponent);
