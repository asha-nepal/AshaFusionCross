/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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
    <p style={style}>{value}</p>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const args = ownProps.inputs.map(inmodel =>
    _.get(state, `${ownProps.rootModel}.${inmodel}`, undefined)
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
