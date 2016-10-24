/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

export const CheckboxComponent = ({
  label,
  value,
  readonly = false,
  onChange,
}: {
  label: string,
  value: ?boolean,
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

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model, false),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const Checkbox = connect(
  mapStateToProps, mapDispatchToProps
)(CheckboxComponent);
