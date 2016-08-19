/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

const CheckboxComponent = ({
  label,
  isChecked,
  onChange,
}: {
  label: string,
  isChecked: ?boolean,
  onChange: (newValue: boolean) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <p className="control">
      <a
        className={isChecked ? 'button is-primary' : 'button'}
        style={{ width: 32 }}
        onClick={e => {
          e.preventDefault();
          onChange(!isChecked);
        }}
      >
        {isChecked && <i className={'fa fa-check'} />}
      </a>
    </p>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  isChecked: _get(state, ownProps.model, false),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const Checkbox = connect(
  mapStateToProps, mapDispatchToProps
)(CheckboxComponent);
