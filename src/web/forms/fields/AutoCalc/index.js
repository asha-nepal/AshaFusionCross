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
  value,
  style,
  precision,
}: {
  value: string,
  style: ?Object,
  precision: ?number,
}) => (
  <span className="form-static" style={style}>
    {(precision && typeof value === 'number') ? value.toFixed(precision) : value}
  </span>
);

type FuncInput = string | {
  const: string | number,
};

export function getArgs(inputs: Array<FuncInput>, referenceModel: Object) {
  return inputs.map((input) => {
    if (typeof input === 'string') return _get(referenceModel, input);
    if (typeof input === 'object') {
      if (input.hasOwnProperty('const')) return input.const;
    }

    return undefined;
  });
}

export function getValue(targetModel: Object, inputs: Array<FuncInput>, calc: Function) {
  if (!targetModel) return null;
  if (typeof calc !== 'function') return null;

  const args = getArgs(inputs, targetModel);

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
