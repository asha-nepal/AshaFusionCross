/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

const CheckboxComponent = ({
  label,
  value = false,
  readonly = false,
  onChange,
}: {
  label: string,
  value: boolean,
  readonly: boolean,
  onChange: (newValue: boolean) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <p className="form-static">
        {value ? <span className="icon"><i className="fa fa-check" /></span> : '---'}
      </p>
    ) : (
      <p className="control">
        <a
          className={value ? 'button is-primary' : 'button'}
          style={{ width: 32 }}
          onClick={e => {
            e.preventDefault();
            onChange(!value);
          }}
        >
          {value && <i className="fa fa-check" />}
        </a>
      </p>
    )}
  </div>
);

export const Checkbox = connect(
  mapStateToProps, mapDispatchToProps
)(CheckboxComponent);
