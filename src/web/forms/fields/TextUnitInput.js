/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
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

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: v => dispatch(actions.change(ownProps.model, v)),
});

export const TextUnitInput = connect(
  mapStateToProps, mapDispatchToProps
)(TextUnitInputComponent);
