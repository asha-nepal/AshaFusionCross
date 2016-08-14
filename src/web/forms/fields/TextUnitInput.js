/* @flow */

import React, { Component } from 'react';
import { actions, Control } from 'react-redux-form';
import math from 'mathjs';

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
    label: string,
    units: Array<string>,
    value: ValueUnitType,
    style: Object,
    onChange: (value: ValueUnitType) => void,
  };

  render() {
    const {
      label,
      units,
      value,
      style,
      onChange,
    } = this.props;

    const inputValue = (value && value.value && value.unit && value.unit !== this.state.unit)
      ? math.unit(value.value, value.unit).toNumber(this.state.unit).toString()
      : value && value.value && value.value.toString() || '';

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        <p className="control has-addons">
          <input
            type="number"
            className="input"
            style={style}
            value={inputValue}
            onChange={(e) => onChange({ value: e.target.value, unit: this.state.unit })}
          />
          <span className="select">
            <select
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

export const TextUnitInput = ({
  model,
  label,
  units,
  style,
}: {
  model: string,
  label: string,
  units: Array<string>,
  style: Object,
}) => (
  <Control
    model={model}
    component={TextUnitInputComponent}
    controlProps={{
      label,
      units,
      style,
    }}
    mapProps={(p) => ({
      value: p.modelValue,
      onChange: v => p.dispatch(actions.change(model, v)),
    })}
  />
);
