/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

const ReadOnly = ({
  value,
  options,
}: {
  value: ?Array<string>,
  options: Array<{id: string, label: string}>,
}) => (
  <div className="form-static">
    {options.map(option => {
      if (value && value.indexOf(option.id) > -1) {
        return (
          <p key={option.id}>
            <span className="icon">
              <i className="fa fa-check" />
            </span>
            {option.label}
          </p>);
      }

      return null;
    })}
  </div>
);

export const CheckGroupComponent = ({
  label,
  value,
  options,
  readonly = false,
  onChange,
}: {
  label: string,
  value: ?Array<string>,
  options: Array<{id: string, label: string}>,
  readonly: boolean,
  onChange: (newValue: Array<string>) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly value={value} options={options} />
    ) : (
      <div className="checkgroup">
        {options.map(option => {
          const isChecked = value && value.indexOf(option.id) > -1;
          return (
            <a
              key={option.id}
              className={isChecked ? 'control button is-primary' : 'control button'}
              onClick={e => {
                e.preventDefault();
                onChange(
                  isChecked
                    ? (value || []).filter(v => v !== option.id)
                    : (value || []).concat(option.id)
                );
              }}
            >
              <span className="icon is-small">
                <i className={isChecked ? 'fa fa-check-square' : 'fa fa-square-o'} />
              </span>
              <span>{option.label}</span>
            </a>
          );
        })}
      </div>
    )}
  </div>
);

export const CheckGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckGroupComponent);
