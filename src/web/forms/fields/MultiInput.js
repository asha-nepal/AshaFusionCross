/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

type Props = {
  label: string,
  type?: string,
  values: ?Array<string>,
  readonly?: boolean,
  onChange: (index: number, value: string) => void,
  onAddItemRequested: (value: string) => void,
  onRemoveItemRequested: (index: number) => void,
};

export const ReadonlyMultiInput = ({
  label,
  values,
}: {
  label: ?string,
  values: ?Array<string>,
}) => (
  <div className="control">
  {label && <label className="label">{label}</label>}
  {values &&
    <div className="form-static is-multiline">
      <ul>
        {values.map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    </div>
  }
  </div>
);

const RowComponent = ({
  type,
  value,
  onChange,
  onBlur,
  onFocusNextRequested,
  onRemoveItemRequested,
  inputRef,
}: {
  type?: string,
  value: string,
  onChange: Function,
  onBlur?: Function,
  onFocusNextRequested?: Function,
  onRemoveItemRequested?: Function,
  inputRef?: Function,
}) => (
  <p className={onRemoveItemRequested ? 'control has-addons' : 'control'}>
    <input
      className="input is-expanded"
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={e => {
        if (e.which === 13) {
          e.preventDefault();
          if (onFocusNextRequested) onFocusNextRequested();
          return false;
        }
        return true;
      }}
      ref={inputRef}
    />
    {onRemoveItemRequested &&
      <a
        className="button is-danger"
        onClick={e => {
          e.preventDefault();
          if (onRemoveItemRequested) onRemoveItemRequested();
        }}
      >
        <i className="fa fa-times" />
      </a>
    }
  </p>
);

export class MultiInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  state: {
    text: string,
  };

  props: Props;

  render() {
    const {
      label,
      type = 'text',
      values,
      readonly = false,
      onChange,
      onAddItemRequested,
      onRemoveItemRequested,
    } = this.props;

    if (readonly) {
      return <ReadonlyMultiInput label={label} values={values} />;
    }

    const _values = values || [];
    const inputNodes = [];

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        {_values.map((value, i) =>
          <RowComponent
            key={i}
            type={type}
            value={value || ''}
            onChange={e => onChange(i, e.target.value)}
            onBlur={e => {
              if (e.target.value === '') {
                onRemoveItemRequested(i);
                if (inputNodes[i]) inputNodes[i].focus();
              }
            }}
            onRemoveItemRequested={() => onRemoveItemRequested(i)}
            onFocusNextRequested={() => {
              if (inputNodes[i + 1]) inputNodes[i + 1].focus();
            }}
            inputRef={inputNode => {
              inputNodes[i] = inputNode;
            }}
          />
        ).concat(
          <RowComponent
            key={_values.length}
            type={type}
            value=""
            onChange={e => onAddItemRequested(e.target.value)}
            inputRef={inputNode => {
              inputNodes[_values.length] = inputNode;
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  values: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (index, value) => dispatch(actions.change(`${ownProps.model}[${index}]`, value)),
  onAddItemRequested: (value) => dispatch(actions.push(ownProps.model, value)),
  onRemoveItemRequested: (index) => dispatch(actions.remove(ownProps.model, index)),
});

export const MultiInput = connect(
  mapStateToProps, mapDispatchToProps
)(MultiInputComponent);
