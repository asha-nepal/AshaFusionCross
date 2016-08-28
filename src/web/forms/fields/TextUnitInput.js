/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import math from 'mathjs';

export const convert = (value: ?ValueUnitType, targetUnit: ?string): ?number => {
  if (!value || !value.value || !value.unit) { return null; }
  if (!targetUnit) { return null; }
  if (value.unit === targetUnit) { return parseFloat(value.value); }

  return math.unit(value.value, value.unit).toNumber(targetUnit);
};

class TextUnitInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unit: props.units[0],
    };
  }

  state: {
    unit: string,
  };

  props: {
    label: ?string,
    units: Array<string>,
    value: ValueUnitType,
    style: ?Object,
    precision: ?number,
    forceFixed: ?boolean,
    placeholder: ?string,
    onChange: (value: ValueUnitType) => void,
  };

  render() {
    const {
      label,
      units,
      value,
      style,
      precision,
      forceFixed = false,
      placeholder,
      onChange,
    } = this.props;

    const converted = convert(value, this.state.unit);
    const convertedString = converted && converted.toString() || '';
    const inputValue = forceFixed && precision
      ? convertedString.replace(new RegExp(`(\\.\\d{0,${precision}})\\d*`), '$1')
      : convertedString;

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        <p className="control has-addons">
          <input
            type="number"
            className="input"
            style={style}
            value={inputValue}
            step={precision ? Math.pow(10, -precision) : null}
            placeholder={placeholder}
            onChange={(e) => onChange({ value: e.target.value, unit: this.state.unit })}
          />
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
