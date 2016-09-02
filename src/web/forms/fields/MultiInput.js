/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { mapStateToProps } from './utils';

type Props = {
  label: string,
  type: ?string,
  value: ?Array<string>,
  readonly: boolean,
  onChange: (index: number, value: string) => void,
  onAddItemRequested: (value: string) => void,
  onRemoveItemRequested: (index: number) => void,
};

const ReadOnly = ({
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

  _addItem() {
    if (this.state.text) {
      this.props.onAddItemRequested(this.state.text);
      this.setState({ text: '' });
    }
  }

  render() {
    const {
      label,
      type = 'text',
      value,
      readonly = false,
      onChange,
      onRemoveItemRequested,
    } = this.props;

    if (readonly) {
      return <ReadOnly label={label} values={value} />;
    }

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        {value && value.map && value.map((v, i) =>
          <p key={i} className="control has-addons">
            <input
              type={type}
              className="input is-expanded"
              value={v}
              onChange={e => onChange(i, e.target.value)}
            />
            <a
              className="button is-danger"
              onClick={e => {
                e.preventDefault();
                onRemoveItemRequested(i);
              }}
            >
              <i className="fa fa-times" />
            </a>
          </p>
        )}
        <p className="control has-addons">
          <input
            type={type}
            className="input is-expanded"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
            onKeyPress={e => {
              if (e.which === 13) {
                this._addItem();
              }
            }}
          />
          <a
            className={this.state.text ? 'button is-primary' : 'button is-primary is-disabled'}
            onClick={e => {
              e.preventDefault();
              this._addItem();
            }}
          ><i className="fa fa-plus" /></a>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const model = `${ownProps.modelReducer}.${ownProps.model}`;

  return {
    onChange: (index, value) => dispatch(actions.change(`${model}[${index}]`, value)),
    onAddItemRequested: (value) => dispatch(actions.push(model, value)),
    onRemoveItemRequested: (index) => dispatch(actions.remove(model, index)),
  };
};

export const MultiInput = connect(
  mapStateToProps, mapDispatchToProps
)(MultiInputComponent);
