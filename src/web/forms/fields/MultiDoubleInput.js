/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

type Props = {
  label: string,
  type: ?string,
  values: Array<{ freeCategory: string, freeMedicine: string }>,
  onChange: (index: number, value: { freeCategory: string, freeMedicine: string }) => void,
  onAddItemRequested: (value: { freeCategory: string, freeMedicine: string }) => void,
  onRemoveItemRequested: (index: number) => void,
};

export class MultiDoubleInputComponent extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      freeCategory: '',
      freeMedicine: '',
    };
  }

  state: {
    freeCategory: string,
    freeMedicine: string,
  };

  props: Props;

  _addItem() {
    if (this.state.freeCategory && this.state.freeMedicine) {
      this.props.onAddItemRequested(this.state);
      this.setState({ freeCategory: '', freeMedicine: '' });
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
          <div key={i} className="columns">
            <div className="column">
              <input
                type={type}
                className="input"
                value={value.freeCategory}
                placeholder="category"
                onChange={e => {
                  onChange(i, { freeCategory: e.target.value, freeMedicine: value.freeMedicine });
                }}
              />
            </div>
            <div className="column">
              <input
                type={type}
                className="input"
                value={value.freeMedicine}
                placeholder="medicine"
                onChange={e => {
                  onChange(i, { freeCategory: value.freeCategory, freeMedicine: e.target.value });
                }}
              />
            </div>
            <div className="column is-narrow">
              <a
                className="button is-danger"
                onClick={e => {
                  e.preventDefault();
                  onRemoveItemRequested(i);
                }}
              ><i className="fa fa-times" /></a>
            </div>
          </div>
        )}
        <div className="columns">
          <div className="column">
            <input
              type={type}
              className="input"
              value={this.state.freeCategory || ''}
              placeholder="category"
              onChange={e => {
                this.setState({
                  freeCategory: e.target.value,
                });
              }}
            />
          </div>
          <div className="column">
            <input
              type={type}
              className="input"
              value={this.state.freeMedicine || ''}
              placeholder="medicine"
              onChange={e => {
                this.setState({
                  freeMedicine: e.target.value,
                });
              }}
            />
          </div>
          <div className="column is-narrow">
            <a
              className={
                (this.state.freeCategory && this.state.freeMedicine) ?
                  'button is-primary' : 'button is-primary is-disabled'
              }
              onClick={e => {
                e.preventDefault();
                this._addItem();
              }}
            ><i className="fa fa-plus" /></a>
          </div>
        </div>
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

export const MultiDoubleInput = connect(
  mapStateToProps, mapDispatchToProps
)(MultiDoubleInputComponent);
