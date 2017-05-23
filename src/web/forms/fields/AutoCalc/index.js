/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import functions from './functions';

export const AutoCalcComponent = ({
  label,
  value,
  style,
  precision,
}: {
  label: string,
  value: string,
  style: ?Object,
  precision: ?number,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <span className="form-static" style={style}>
      {(precision && typeof value === 'number') ? value.toFixed(precision) : value}
    </span>
  </div>
);

export function getValue(targetModel: Object, argKeys: Array<string>, calc: Function) {
  if (!targetModel) return null;
  if (typeof calc !== 'function') return null;

  const args = argKeys.map(argKey => _get(targetModel, argKey));

  if (args.some(arg => typeof arg === 'undefined')) return null;

  return calc.apply(null, args);
}

const mapStateToProps = (state, ownProps) => {
  const targetModel = _get(state, ownProps.rootModel);
  const calc = ownProps.calc || functions[ownProps.func];
  const value = getValue(targetModel, ownProps.inputs, calc);

  return {
    value,
  };
};
const mapDispatchToProps = null;

export const AutoCalc = connect(
  mapStateToProps, mapDispatchToProps
)(AutoCalcComponent);
