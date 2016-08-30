/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

const ReadOnly = ({
  options,
  value,
}: {
  options: Array<{id: string, label: string}>,
  value: ?string,
}) => {
  const selectedOption = value && options.find(option => option.id === value);

  return (
    <div className="form-static">
      {selectedOption ? selectedOption.label : '---'}
    </div>
  );
};

const RadioGroupComponent = ({
  options,
  label,
  value,
  readonly,
  onChange,
}: {
  options: Array<{id: string, label: string}>,
  label: string,
  value: string,
  readonly: boolean,
  onChange: (newValue: string) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly options={options} value={value} />
    ) : (
      <div className="tabs is-toggle">
        <ul>
        {options.map(option =>
          <li
            key={option.id}
            className={option.id === value && 'is-active'}
          >
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onChange(option.id);
              }}
            >{option.label}</a>
          </li>
        )}
        </ul>
      </div>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const RadioGroup = connect(
  mapStateToProps, mapDispatchToProps
)(RadioGroupComponent);
