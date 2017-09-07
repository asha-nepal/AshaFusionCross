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
