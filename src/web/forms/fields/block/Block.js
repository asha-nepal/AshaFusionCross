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
import classNames from 'classnames';

import EditableFieldWrapper from '../../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../../editor/type';

export const BlockBody = ({
  children,
  layout,
  widthaligned,
}: {
  children: React$Element<any>,
  layout: ?string,
  widthaligned: boolean,
}) => (
  <div
    className={
      layout === 'horizontal'
      ? null
      : classNames('columns is-variable is-1', { 'is-multiline': !widthaligned })
    }
  >
    {children.map((child, i) =>
      <div
        key={i}
        className={classNames('column', { 'is-narrow': !widthaligned })}
      >
        {child}
      </div>
    )}
  </div>
);

export const Block = ({
  label,
  children,
  alerts,
  widthaligned = false,
  border = false,
  layout = null,
  fieldEditProps,
}: {
  label?: string,
  alerts?: Array<Object>,
  children: React$Element<any>,
  widthaligned: boolean,
  border: boolean,
  layout: ?string,
  fieldEditProps?: FieldEditPropsType,
}): React$Element<any> => (
  <EditableFieldWrapper
    className={classNames('field', { box: border })}
    fieldEditProps={fieldEditProps}
  >
    {label && <label className="label">{label}</label>}
    <BlockBody
      layout={layout}
      widthaligned={widthaligned}
    >{children}</BlockBody>
  </EditableFieldWrapper>
);

Block.fieldProps = [];
