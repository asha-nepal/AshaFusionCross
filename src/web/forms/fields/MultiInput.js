/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

type Props = {
  label: string,
  type: ?string,
  values: Array<string>,
  onChange: (index: number, value: string) => void,
  onAddItemRequested: (value: string) => void,
  onRemoveItemRequested: (index: number) => void,
};

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
      values,
      onChange,
      onRemoveItemRequested,
    } = this.props;

    return (
      <div className="control">
        {label && <label className="label">{label}</label>}
        {values && values.map && values.map((value, i) =>
          <p key={i} className="control has-addons">
            <input
              type={type}
              className="input is-expanded"
              value={value}
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
