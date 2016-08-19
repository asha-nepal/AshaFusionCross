/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

export const CheckGroupComponent = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string,
  value: Array<string>,
  options: Array<{id: string, label: string}>,
  onChange: (newValue: Array<string>) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <div className="tabs is-toggle">
      <ul>
      {options.map(option => {
        const isChecked = value && value.indexOf(option.id) > -1;
        return (
          <li
            key={option.id}
            className={isChecked && 'is-active'}
          >
            <a
              onClick={e => {
                e.preventDefault();
                onChange(
                  isChecked
                    ? value.filter(v => v !== option.id)
                    : (value || []).concat(option.id)
                );
              }}
            >
              <span className="icon is-small">
                <i className={isChecked ? 'fa fa-check-square' : 'fa fa-square-o'} />
              </span>
              <span>{option.label}</span>
            </a>
          </li>
        );
      })}
      </ul>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const CheckGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckGroupComponent);
