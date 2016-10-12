/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import math from 'mathjs';

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
  label: ?string,
  units: Array<string>,
  value: ValueUnitType,
  style: ?Object,
  precision: ?number,
  forceFixed: ?boolean,
  placeholder: ?string,
  readonly: boolean,
  onChange: (value: ?ValueUnitType) => void,
}

export class TextUnitInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      unit: props.value && props.value.unit ? props.value.unit : props.units[0],
      inputValue: props.value && props.value.value ? props.value.value.toString() : '',
    };
  }

  state: {
    unit: string,
    inputValue: string,
  };

  props: Props

  render() {
    const {
      label,
      units,
      value,
      style,
      precision,
      forceFixed = false,
      placeholder,
      readonly = false,
      onChange,
    } = this.props;

    const converted = convert(value, this.state.unit, precision);

    const inputValue = !converted || parseFloat(this.state.inputValue) === converted
      ? this.state.inputValue  // 小数点を入力中('5.'など)のときへの対応．state.inputValueを使う
      : converted.toString();

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        <p className={readonly ? 'control' : 'control has-addons'}>
          {readonly ? (
            <span className="form-static">
              {inputValue}
            </span>
          ) : (
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

                if (v.trim() === '') {
                  onChange(null);
                } else {
                  onChange({ value: asFloat, unit: this.state.unit });
                }

                return true;
              }}
            />
          )}
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
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: v => dispatch(actions.change(ownProps.model, v)),
});

export const TextUnitInput = connect(
  mapStateToProps, mapDispatchToProps
)(TextUnitInputComponent);
