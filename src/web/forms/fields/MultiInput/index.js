/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import RowComponent from './RowComponent';
import Readonly from './Readonly';
import { asArray } from '../common/as-array';

export const ReadonlyMultiInput = Readonly;

type Props = {
  type?: string,
  values: ?Array<string>,
  readonly?: boolean,
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

  render() {
    const {
      type = 'text',
      values,
      readonly = false,
      onChange,
      onAddItemRequested,
      onRemoveItemRequested,
    } = this.props;

    if (readonly) {
      return <Readonly values={values} />;
    }

    const _values = asArray(values);
    const inputNodes = [];

    return (
      <div className="field"> {/* TODO: Remove outer div.field after upgrading React to v16*/}
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
