/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import _get from 'lodash.get';

const AutoCalcComponent = ({
  label,
  value,
  style,
}: {
  label: string,
  value: string,
  style: ?Object,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <span className="form-static" style={style}>{value}</span>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const args = ownProps.inputs.map(inmodel =>
    _get(state, `${ownProps.rootModel}.${inmodel}`, undefined)
  );

  return {
    value: args.some(arg => typeof arg === 'undefined')
      ? null
      : ownProps.calc.apply({}, args),
  };
};
const mapDispatchToProps = null;

export const AutoCalc = connect(
  mapStateToProps, mapDispatchToProps
)(AutoCalcComponent);
