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

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import Row from './Row';
import Readonly from './Readonly';
import DittoWrapper from '../common/DittoWrapper';

export const ReadonlySubformList = Readonly;

export type FormFieldDefinition = {
  field: string,
  class: string | ReactClass<any>,
  primary?: boolean,
  show?: boolean | string,
  hide?: string,
}

export const SubformListComponent = ({
  values,
  fields,
  onChange,
  onAddItemRequested,
  onRemoveItemRequested,
  readonly,
  getPreviousData,
}: {
  values: ?Array<Object | string>,
  fields: Array<FormFieldDefinition>,
  onChange: (index: ?number, newValue: Object) => void,
  onAddItemRequested: (value: Object) => void,
  onRemoveItemRequested: (index: number) => void,
  readonly?: boolean,
  getPreviousData: () => ?Array<Object | string>,
}) => {
  if (readonly) {
    return (
      <ReadonlySubformList
        values={values}
        fields={fields}
      />
    );
  }

  const _values = values || [];

  return (
    <DittoWrapper
      className="field"
      value={values}
      onChange={(newValues) => onChange(null, newValues)}
      getPreviousData={getPreviousData}
    >
      <div className="panel">
      {_values.map((value, i) =>
        <Row
          key={i}
          value={value}
          fields={fields}
          onChange={v => onChange(i, v)}
          onRemoveItemRequested={() => onRemoveItemRequested(i)}
        />
      ).concat(
        <Row
          key={_values.length}
          value={{}}
          fields={fields}
          onChange={v => onAddItemRequested(v)}
        />
      )}
      </div>
    </DittoWrapper>
  );
};


// TODO: MultiInput のconnectと共通化
const mapStateToProps = (state, ownProps) => ({
  values: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (index, value) =>
    dispatch(actions.change(
      index == null ? ownProps.model : `${ownProps.model}[${index}]`, value)),
  onAddItemRequested: (value) => dispatch(actions.push(ownProps.model, value)),
  onRemoveItemRequested: (index) => dispatch(actions.remove(ownProps.model, index)),
});

export const SubformList = connect(
  mapStateToProps, mapDispatchToProps
)(SubformListComponent);
